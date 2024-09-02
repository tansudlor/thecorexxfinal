import { GameElement } from "./GameElement";
import { Player } from "./Player";
import { Image } from "./Image";
import { Background } from "./Background";
import { Container } from "./Container";
import { UIContainer } from "./UIContainer";
import { Hole } from "./Hole";
import { Item } from "./Item";
import { ScoreUI } from "./ScoreUI";
import { ControlContainer } from "./ControlContainer";
import { LaunchPad } from "./LaunchPad";
import { StartArea } from "./StartArea";
import API from "./API";
import { FuelRemainUI } from "./FuelRemainUI";
import { StartDrillUI } from "./StartDrillUI";
import { DeepTextUI } from "./DeepTextUI";
import { EndGameUI } from "./EndGameUI";
import { ResourceUI } from "./ResourceUI";
import { Profile } from "./Profile";
import Cookies from "js-cookie";
import { useConnect } from "wagmi";
//import { API } from "./API";

// คลาส vector2 ใช้เก็บตำแหน่ง (x, y)
class vector2 {
  x: number;
  y: number;
}

export class GameController extends GameElement {
  public GameArea: GameElement; // องค์ประกอบหลักของเกม
  public profile: Profile; // โปรไฟล์ผู้เล่น
  public UIArea: GameElement; // พื้นที่ UI
  public bg: Background; // พื้นหลัง
  public player: Player; // ผู้เล่น
  public camera = { X: 0, Y: 0 }; // กล้องในเกม
  public hole: Hole; // วัตถุ Hole ในเกม
  public controlArea: ControlContainer; // คอนเทนเนอร์สำหรับควบคุม
  public gameName: ScoreUI; // แสดงชื่อเกมและคะแนน
  public Key: object = {}; // เก็บข้อมูลการกดคีย์
  public ScoreText; // ข้อความแสดงคะแนน
  public Title: Image; // ชื่อเกม
  private controlSpeed = 0.2; // ความเร็วในการควบคุมผู้เล่น
  public CurrentSpeed = 0; // ความเร็วปัจจุบัน
  private fullSpeed = 50; // ความเร็วเต็มที่
  private efficiency = 0.01; // ประสิทธิภาพการใช้เชื้อเพลิง
  private maxSpeed = 1; // ความเร็วสูงสุด
  public Fuel = 0; // เชื้อเพลิงที่เหลืออยู่
  private item = [
    // ไฟล์ภาพไอเท็มต่างๆ
    "./images/branch.svg",
    "./images/stone.svg",
    "./images/oil.svg",
    "./images/iron.svg",
  ];
  private itemType = ["branch", "stone", "oil", "iron"]; // ชนิดของไอเท็ม
  private spawnItem = []; // ลิสต์ของไอเท็มที่จะถูกสร้างขึ้น
  public itemList: object = {}; // ลิสต์ไอเท็มในเกม
  private angleLimit = 50; // ขอบเขตการหมุนของผู้เล่น
  private frameCount = 0; // จำนวนเฟรมที่เล่นผ่านไป
  private titleBG; // ภาพพื้นหลังของชื่อเกม
  private launchPad; // แท่นปล่อย
  private sky; // ท้องฟ้า
  private FuelRemain; // เชื้อเพลิงที่เหลืออยู่
  private startButton: HTMLElement; // ปุ่มเริ่มเกม
  public FrameTime; // เวลาต่อเฟรม
  private playerFuel = 50; // เชื้อเพลิงของผู้เล่น
  private fov = 10 / 6; // มุมมองของเกม (Field of View)
  private holeList: Array<vector2> = new Array<vector2>(); // ลิสต์ของตำแหน่งรู
  private startGame; // ปุ่มเริ่มการขุดเจาะ
  private canvas; // พื้นที่วาด
  private svgElement; // องค์ประกอบ SVG
  private startArea: StartArea; // พื้นที่เริ่มเกม
  private deepText; // ข้อความแสดงความลึก
  private upgradeButton: HTMLElement; // ปุ่มอัปเกรด
  private upgradePage: HTMLElement; // หน้าต่างอัปเกรด
  private fuelRemaibBar; // แถบแสดงเชื้อเพลิงที่เหลือ
  private endGameUI; // UI เมื่อจบเกม
  private endGameDiv; // หน้าจอจบเกม
  private endGameFar; // ระยะทางที่เดินทางได้ตอนจบเกม
  private resourceUI; // UI ทรัพยากร
  private branchQuantity; // ปริมาณ Branch ที่มีอยู่
  private stoneQuantity; // ปริมาณ Stone ที่มีอยู่
  private ironQuantity; // ปริมาณ Iron ที่มีอยู่

  constructor(id: string, src: string, parent: GameElement) {
    super(id, src, parent);
    this.start(); // เริ่มต้นการทำงานของเกม
  }

  // ฟังก์ชันที่ถูกเรียกเมื่อมีการอัปเกรดค่าในเกม
  onUpgrade() {
    // อัปเดตค่าเชื้อเพลิงของผู้เล่นจากข้อมูลอัปเกรด
    this.playerFuel =
      Profile.Data["_upgradedatabattery"][Profile.Data.upgrade.battery].Primary;

    // อัปเดตความเร็วในการควบคุมจากข้อมูลอัปเกรด
    this.controlSpeed =
      Profile.Data["_upgradedatacontrol"][Profile.Data.upgrade.control]
        .Primary * 3;

    // อัปเดตขอบเขตการหมุนจากข้อมูลอัปเกรด
    this.angleLimit =
      Profile.Data["_upgradedatacontrol"][
        Profile.Data.upgrade.control
      ].Secondary;

    // อัปเดตประสิทธิภาพและความเร็วสูงสุดจากข้อมูลอัปเกรด
    this.efficiency =
      Profile.Data["_upgradedataengine"][Profile.Data.upgrade.engine].Primary /
      2;
    this.maxSpeed =
      Profile.Data["_upgradedataengine"][Profile.Data.upgrade.engine].Secondary;
  }

  // ฟังก์ชันเริ่มต้นการทำงานของเกม
  start(): void {
    this.spawnItem.push(this.item[0], this.item[1], this.item[2]); // เริ่มต้นด้วยการเพิ่มไอเท็มที่จะเกิดขึ้นในเกม
    this.controlArea = new ControlContainer("controlArea", null, null); // สร้างพื้นที่สำหรับควบคุม
    document.body.style.backgroundColor = "#0DD6DA"; // ตั้งค่าพื้นหลังของเกม

    // สร้างพื้นที่ UI
    this.UIArea = new UIContainer("UIArea", null, null);
    this.UIArea.resource.style.position = "fixed";
    this.startArea = new StartArea("StartArea", null, null); // สร้างพื้นที่เริ่มเกม

    // กำหนดค่าให้กับปุ่มเริ่มเกม, ปุ่มอัปเกรด, และหน้าต่างอัปเกรด
    this.startButton = this.startArea.StartButton;
    this.upgradeButton = this.startArea.UpgradeButton;
    this.upgradePage = this.startArea.UpgradePage;

    // สร้างองค์ประกอบ SVG สำหรับการวาดเส้น
    this.svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.svgElement.style.width = window.innerWidth;
    this.svgElement.style.height = window.innerHeight;
    this.svgElement.style.position = "absolute";
    this.svgElement.style.zIndex = "8";
    this.svgElement.style.left = "50%";
    this.svgElement.style.top = "50%";
    this.svgElement.style.transform = "translate(-50%,-50%)";

    // สร้าง GameArea และเพิ่ม launchPad
    this.GameArea = new Container("GameArea", null, this.controlArea);
    this.launchPad = new LaunchPad(
      "launchPad",
      "./images/launchpad.svg",
      this.GameArea
    );
    this.launchPad.resource.style.left = "0%";
    this.launchPad.resource.style.top = "60%";
    this.launchPad.resource.style.zIndex = "10";

    // ตั้งค่ากล้อง, พื้นหลัง, และผู้เล่น
    this.camera = { X: 0, Y: 975 };
    this.bg = new Background("bg", "./images/123456.png", this.GameArea);

    this.player = new Player("player", "./images/Group.svg", this.GameArea);
    this.player.start();
    this.player.resource.style.zIndex = "999";
    this.GameArea.resource.appendChild(this.svgElement);

    // ตั้งค่า UI สำหรับคะแนน, ความลึก, และทรัพยากร
    this.ScoreText = new ScoreUI("Score", "Score", this.UIArea);
    this.ScoreText.X = 10;
    this.ScoreText.Y = 10;
    this.ScoreText.resource.style.whiteSpace = "pre";
    this.ScoreText.resource.textContent = "Score   " + 0;

    this.deepText = new DeepTextUI("Deep", "", this.UIArea);
    this.deepText.resource.style.whiteSpace = "pre";
    this.deepText.resource.textContent = "Deep    0";

    this.resourceUI = new ResourceUI("ResourceUI", "", this.UIArea);
    this.branchQuantity = this.resourceUI.BranchQuantity;
    this.stoneQuantity = this.resourceUI.StoneQuantity;
    this.ironQuantity = this.resourceUI.IronQuantity;

    // ตั้งค่า UI สำหรับแถบเชื้อเพลิงที่เหลือและจบเกม
    this.FuelRemain = new FuelRemainUI("FuelRemain", "FuelRemain", this.UIArea);
    this.fuelRemaibBar = this.FuelRemain.FuelRemainBar;

    this.endGameUI = new EndGameUI("EndGameUI", "", this.UIArea);
    this.endGameFar = this.endGameUI.EndGameFar;
    this.endGameDiv = this.endGameUI.EndGameDiv;
    this.endGameDiv.style.display = "none";

    // สร้างปุ่มซ้ายและขวาสำหรับควบคุมการเคลื่อนที่
    let leftImage = document.createElement("img");
    leftImage.style.bottom = "0%";
    leftImage.style.left = "0%";
    leftImage.style.width = "82px";
    leftImage.style.height = "82px";
    leftImage.style.position = "fixed";
    leftImage.src = "./images/bt_arrow_left.svg";

    leftImage.addEventListener("touchstart", (event) => {
      event.preventDefault();
      setTimeout(() => {
        leftImage.style.backgroundColor = "transparent";
      }, 1000);
      this.Key["left"] = true;
    });
    leftImage.addEventListener("touchend", (event) => {
      event.preventDefault();
      delete this.Key["left"];
    });
    this.UIArea.resource.appendChild(leftImage);

    let rightImage = document.createElement("img");
    rightImage.src = "./images/bt_arrow_right.svg";
    rightImage.style.right = "0%";
    rightImage.style.bottom = "0%";
    rightImage.style.width = "82px";
    rightImage.style.height = "82px";
    rightImage.style.position = "absolute";

    rightImage.addEventListener("touchstart", (event) => {
      event.preventDefault();
      setTimeout(() => {
        rightImage.style.backgroundColor = "transparent";
      }, 1000);
      this.Key["right"] = true;
    });
    rightImage.addEventListener("touchend", (event) => {
      event.preventDefault();
      delete this.Key["right"];
    });
    this.UIArea.resource.appendChild(rightImage);

    // สร้างปุ่มเริ่มการขุดเจาะ
    this.startGame = new StartDrillUI("StartDrill", "", this.UIArea).StartGame;
    this.Key["start"] = false;

    this.startGame.addEventListener("click", (event) => {
      event.preventDefault();
      this.Key["start"] = true;
      this.startGame.remove();
      this.onUpgrade();
    });

    // ฟังก์ชันที่ตรวจจับการกดปุ่มบนคีย์บอร์ด
    document.addEventListener("keydown", (event) => {
      this.Key[event.key] = true;
    });
    document.addEventListener("keyup", (event) => {
      delete this.Key[event.key];
    });

    // ฟังก์ชันที่ทำงานเมื่อคลิกปุ่มเริ่มเกม
    this.startButton.addEventListener("click", async (event) => {
      const data = {
        resource: Profile.Data.resource,
        upgrade: Profile.Data.upgrade,
      };

      API.SendUpgrade(data)
        .then((response) => {
          console.log("Success:", response);
          this.startArea.destroy(); // ลบพื้นที่เริ่มเกม
        })
        .catch((error) => {
          console.error("Request failed:", error);
        });
    });

    // ฟังก์ชันที่ทำงานเมื่อคลิกปุ่มอัปเกรด
    this.upgradeButton.addEventListener("click", (event) => {
      this.upgradePage.style.display = "block"; // แสดงหน้าต่างอัปเกรด
    });

    this.MoveCamera(this); // เริ่มการเคลื่อนที่ของกล้อง
  }

  // ฟังก์ชันอัปเดตสถานะของเกมในแต่ละเฟรม
  update(self: GameElement): void {
    this.playing(self); // ดำเนินการเล่นเกมในเฟรมนี้
    this.MoveCamera(self); // ปรับตำแหน่งกล้องตามตำแหน่งผู้เล่น

    // อัปเดตข้อมูลทรัพยากรที่แสดงบนหน้าจอ
    if (Profile.Ready == true) {
      let resource = ["Branch", "Iron", "Stone"];
      for (let pr in resource) {
        let r = resource[pr];
        this[r.toLowerCase() + "Quantity"].textContent =
          Profile.Data.resource[r.toLowerCase()];
      }
    }
  }

  // ฟังก์ชันที่ทำหน้าที่ปรับตำแหน่งกล้องให้ตามผู้เล่น
  MoveCamera(self: GameElement): void {
    if (this.player.Y > 1000) {
      this.camera = this.player; // ย้ายตำแหน่งกล้องให้ตามผู้เล่น
    }
    this.GameArea.X =
      (GameElement.GameElementColletion["controlArea"].Width * 1080) /
        window.innerHeight -
      this.camera.X;
    this.GameArea.Y =
      (GameElement.GameElementColletion["controlArea"].Height * 1080) /
        window.innerHeight -
      this.camera.Y;
  }

  // ฟังก์ชันที่ดำเนินการเล่นเกมในแต่ละเฟรม
  playing(self: GameElement): void {
    if (this.endGameDiv.style.display == "block") {
      return; // หยุดเกมหากเกมจบแล้ว
    }

    this.frameCount++;
    if (this.Key["start"] == true) {
      this.Fuel = this.playerFuel; // เติมเชื้อเพลิงให้เต็มเมื่อเริ่มเกม
      delete this.Key["start"];
    }

    let scaleFactor =
      GameElement.GameElementColletion["controlArea"].ScaleFactor;
    if (this.Key["ArrowLeft"] != null) {
      this.player.Angle += this.controlSpeed; // หมุนผู้เล่นไปทางซ้าย
    }
    if (this.Key["ArrowRight"] != null) {
      this.player.Angle -= this.controlSpeed; // หมุนผู้เล่นไปทางขวา
    }

    if (this.Key["left"] != null) {
      this.player.Angle += this.controlSpeed; // หมุนผู้เล่นไปทางซ้าย (ใช้ปุ่มซ้าย)
    }
    if (this.Key["right"] != null) {
      this.player.Angle -= this.controlSpeed; // หมุนผู้เล่นไปทางขวา (ใช้ปุ่มขวา)
    }

    if (this.player.Angle > this.angleLimit) {
      this.player.Angle = this.angleLimit; // จำกัดมุมหมุนของผู้เล่น
    }
    if (this.player.Angle < -this.angleLimit) {
      this.player.Angle = -this.angleLimit; // จำกัดมุมหมุนของผู้เล่น
    }

    GameElement.SetPostion(this.svgElement, this.player.X, this.player.Y);
    GameElement.ClearTransform(this.controlArea.resource);
    GameElement.TransformPivot(this.controlArea.resource, -50, -50);

    let scale = this.fov;
    if (this.player.Y > 1000) {
      this.fov += (20 / (this.CurrentSpeed + 20) - this.fov) / 64;
      scale = this.fov;
    }
    if (scale < 0.35) {
      scale = 0.35; // จำกัดการซูมขั้นต่ำ
    }

    GameElement.TransformScale(this.controlArea.resource, scale * 0.6);

    this.svgElement.style.width = "200px";
    this.svgElement.style.height = "100px";
    this.svgElement.style.transform =
      "translate(-50%,-50%) scale(" +
      (10.8 * GameElement.GameElementColletion["controlArea"].ScaleFactor) /
        (scale * 0.6) +
      ")";

    this.Key["play"] = true;
    let speedX =
      -(
        (Math.cos(((this.player.Angle - 90) * Math.PI) / 180) *
          this.CurrentSpeed *
          this.FrameTime) /
        1000 /
        1
      ) * 80;
    let speedY =
      -(
        (Math.sin(((this.player.Angle - 90) * Math.PI) / 180) *
          this.CurrentSpeed *
          this.FrameTime) /
        1000 /
        1
      ) * 80;

    let beforeY = this.player.Y;
    let beforeX = this.player.X;
    this.player.X += speedX;
    this.player.Y += speedY;

    this.svgElement.textContent = "";

    // เพิ่มตำแหน่งรูในแต่ละเฟรมหากความเร็วเกิน 1
    if (this.frameCount % 3 == 0 && this.CurrentSpeed > 1) {
      this.holeList.push({
        x: this.player.X,
        y: this.player.Y,
      });

      if (this.holeList.length > 150) {
        this.holeList.shift(); // ลบรูที่เก่าที่สุดหากมีเกิน 150
      }
    }

    let holeListTrans = [];

    this.holeList.push({
      x: this.player.X + speedX * 0.3,
      y: this.player.Y + speedY * 0.3,
    });

    // แปลงตำแหน่งรูจากตำแหน่งของผู้เล่นให้เป็นตำแหน่งใน SVG
    for (let i = 0; i < this.holeList.length; i++) {
      let currentPoint = this.holeList[i];
      let transPoint = {
        x:
          ((currentPoint.x - this.camera.X) /
            GameElement.GameElementColletion["controlArea"].Height) *
            100 *
            GameElement.GameElementColletion["controlArea"].ScaleFactor +
          100,
        y:
          ((currentPoint.y - this.camera.Y) /
            GameElement.GameElementColletion["controlArea"].Height) *
            100 *
            GameElement.GameElementColletion["controlArea"].ScaleFactor +
          50,
      };
      holeListTrans.push(transPoint);
    }

    this.holeList.pop();
    this.drawLines(
      this.svgElement,
      holeListTrans,
      15 * (scale * 0.6),
      10 * (scale * 0.6),
      "#551100",
      "#330500"
    );

    if (this.Key["start"] == false) {
      this.player.Y =
        GameElement.GameElementColletion["controlArea"].Height /
        1.65 /
        GameElement.GameElementColletion["controlArea"].ScaleFactor;
      return;
    }

    this.bg.X = this.player.X;
    this.bg.Y = this.player.Y;

    this.Fuel -= this.efficiency;
    let nowFuel = (this.Fuel / this.playerFuel) * 100;
    this.fuelRemaibBar.style.clipPath = "inset(0 " + (100 - nowFuel) + "% 0 0)";
    this.deepText.resource.textContent = `Deep    ${Math.trunc(
      this.player.Y / 10
    )}`;
    if (this.Fuel < 0) {
      this.Fuel = 0;
      this.GameOver();
      return;
    }

    this.CurrentSpeed = this.Fuel;
    if (this.CurrentSpeed < 0) {
      this.CurrentSpeed = 0;
    }

    if (this.CurrentSpeed > 20) {
      this.CurrentSpeed = 20;
    }
    this.CurrentSpeed = this.CurrentSpeed * this.maxSpeed;
    let delay = Math.round(300 / this.CurrentSpeed);

    if (delay < 1) delay = 1;

    // เพิ่มไอเท็มใหม่ในเกมเมื่อผู้เล่นเดินทางไกลพอ
    if (this.player.Y > 100000 && this.spawnItem.length <= 3) {
      console.log("push new item type");
      this.spawnItem.push(this.item[3]);
    }

    // สร้างไอเท็มใหม่ในเกมทุกๆ 5 เฟรม
    if (this.frameCount % 5 == 0 && this.Key["play"] == true) {
      let itemPath = this.RandomImage();
      let itemIndex = "item" + this.frameCount;
      let itemCreate = new Item(itemIndex, itemPath[0], this.GameArea);
      itemCreate.X = this.getRandomXNumber();
      itemCreate.Y = this.player.Y + 5000;
      itemCreate.Player = this.player;
      itemCreate.GameController = this;
      itemCreate.ItemType = this.itemType[itemPath[1]];
      itemCreate.resource.style.width = "10%";
      itemCreate.resource.style.height = "10%";
      if (itemCreate.ItemType == "oil") {
        itemCreate.resource.style.width = "15%";
        itemCreate.resource.style.height = "15%";
      }
      itemCreate.start();
    }
  }

  // ฟังก์ชันอัปเดตคะแนน
  private scoreCount = 0;
  ScoreUpdate(Score: number) {
    this.scoreCount += Score;
    this.ScoreText.resource.textContent = "Score   " + this.scoreCount;
  }

  // ฟังก์ชันที่ทำงานเมื่อเกมจบ
  GameOver() {
    this.endGameFar.textContent = Math.trunc(this.player.Y / 10) + " miles";
    this.endGameDiv.style.display = "block";
  }

  // ฟังก์ชันเลือกไอเท็มสุ่ม
  RandomImage(): [string, number] {
    let randomIndex = Math.floor(Math.random() * this.spawnItem.length);
    return [this.item[randomIndex], randomIndex];
  }

  // ฟังก์ชันสุ่มตำแหน่ง X ของไอเท็ม
  getRandomXNumber(): number {
    const number = this.player.X + Math.random() * 15000 - 7500;
    return number;
  }

  // ฟังก์ชันลบองค์ประกอบที่อยู่นอกจอ
  checkAndRemoveOffScreenElements(): void {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  }

  // ฟังก์ชันหยุดการทำงาน (ไม่ได้ใช้งาน)
  stopFunction = () => {
    //clearInterval(intervalId);
  };

  // ฟังก์ชันคำนวณระดับการซูม
  getZoomLevel() {
    const width = document.documentElement.clientWidth;
    const offsetWidth = document.documentElement.offsetWidth;
    return window.innerHeight / 1080;
  }

  // ฟังก์ชันสร้างข้อมูลเส้นทางใน SVG
  createPathData(points) {
    if (points.length === 0) return "";
    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }
    return pathData;
  }

  // ฟังก์ชันวาดเส้นใน SVG
  drawLines(
    svgElement,
    points,
    strokeWidth,
    strokeWidth2,
    strokeColor,
    strokeColor2
  ) {
    const pathData = this.createPathData(points);
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("stroke-width", strokeWidth);
    path.setAttribute("fill", "transparent");
    path.setAttribute("stroke-linecap", "round");
    svgElement.appendChild(path);

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", strokeColor2);
    path.setAttribute("stroke-width", strokeWidth2);
    path.setAttribute("fill", "transparent");
    path.setAttribute("stroke-linecap", "round");
    svgElement.appendChild(path);
  }
}
