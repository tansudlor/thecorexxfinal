import API from "./API";
import { GameElement } from "./GameElement";
import { UIContainer } from "./UIContainer";
import "../styles/global.css";
import { Profile } from "./Profile";
import { profile } from "console";
// คลาส StartArea เป็นส่วนหนึ่งของ UIContainer ซึ่งจัดการหน้าจอเริ่มต้นของเกม
export class StartArea extends UIContainer {
  // สร้างตัวแปรที่ใช้ในการควบคุม UI และข้อมูลของการอัปเกรด
  public StartButton: HTMLElement;
  public UpgradeButton: HTMLElement;
  public LeaderBoardButton;
  public UpgradePage;
  public ExitUpgradePage;
  public UpgradeBar = [];
  public UpgradeBarMock = [];
  public UpgradeData;
  public UpgradeDataExit;
  public UpgradePlus = [];

  private UpgradeDataHeader;
  private UpgradeDataImg;
  private UpgradeDataDes;
  private branchRequire;
  private ironRequire;
  private stoneRequire;
  private UpgradeResourceAmount = [];
  private UpgradeButtonResource;
  private Mountain;
  private Ray;
  private indexNow = 0;
  private UpgradeDataBackgroundDIV;
  private UpgradeDataDiv;
  private mountainLoop = 0;
  private rayLoop = 0;
  private click = 1;

  // อาร์เรย์เก็บข้อมูลภาพและชื่อของสกิลต่างๆ
  private skillImage = [
    "./images/Skill/battery.svg",
    "./images/Skill/vision.svg",
    "./images/Skill/powerhandle.svg",
    "./images/Skill/barrior.svg",
    "./images/Skill/magnet.svg",
    "./images/Skill/lucky.svg",
    "./images/Skill/energyimprove.svg",
  ];
  private skillName = [
    "Battery",
    "Vision",
    "Control",
    "Barrior",
    "Magnet",
    "Lucky",
    "Engine",
  ];
  private skillEnable = {
    Battery: true,
    Control: true,
    Engine: true,
  };
  private resourceImage = [
    "./images/Skill/branch.svg",
    "./images/Skill/iron.svg",
    "./images/Skill/stone.svg",
  ];

  private resourceName = ["Branch", "Iron", "Stone"];
  private plaseConnectWallet;

  // ฟังก์ชัน constructor ของ StartArea รับ id, src และ parent เพื่อสร้าง UIContainer และตั้งค่าเริ่มต้น
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.resource.style.top = "56%";
    this.resource.style.left = "50%";
    GameElement.TransformPivot(this.resource, -50, -50);
    this.SetStartGame();
    this.SetGameIcon();
    this.SetStartButton();
    this.SetUpgradeButton();
    this.UpgradeDIV();
    this.UpgradeDialog();
    this.SetPleaseConnectWalletFirst();
    this.UpgradeDataDiv.style.display = "none";
  }

  // ฟังก์ชัน updateStatus ใช้ในการอัปเดตสถานะของสกิลต่างๆ โดยปรับระดับของแถบ (bar) ตามค่าการอัปเกรดของผู้เล่น
  updateStatus() {
    for (let index = 0; index < this.skillImage.length; index++) {
      // ดึงระดับการอัปเกรดของสกิลแต่ละตัวจากข้อมูลใน Profile.Data
      let level = Profile.Data.upgrade[this.skillName[index].toLowerCase()];

      // อัปเดตสไตล์ของแถบแสดงระดับการอัปเกรด (progress bar) โดยใช้ clipPath
      Profile["_uiupgrade" + index].bar.style.clipPath =
        "inset(0 " + (100 - level) + "% 0 0)";
    }
  }

  // ฟังก์ชัน update ใช้ในการอัปเดตตำแหน่งและการแสดงผลขององค์ประกอบ UI บนหน้าจอ
  update(): void {
    this.mountainLoop += 3;
    this.Mountain.style.backgroundPositionX = this.mountainLoop + "px";

    // ปรับขนาดและตำแหน่งของปุ่มต่างๆ ตามสัดส่วนของหน้าจอ
    if (window.innerHeight > 1.3 * window.innerWidth) {
      this.StartButton.id = "1.3";
      this.StartButton.style.left = "50%";
      this.StartButton.style.width = "35%";
      this.StartButton.style.height = "auto";
      this.UpgradeButton.style.top = "82%";
      this.UpgradeButton.style.left = "50%";
      this.UpgradeButton.style.width = "35%";
      this.UpgradeButton.style.height = "auto";

      this.UpgradePage.style.width = "100%";
    } else if (window.innerHeight > 1.0 * window.innerWidth) {
      this.StartButton.id = "1.0";
      this.StartButton.style.width = "25%";
      this.StartButton.style.height = "auto";
      this.StartButton.style.top = "70%";
      this.StartButton.style.left = "50%";
      this.UpgradeButton.style.top = "82%";
      this.UpgradeButton.style.left = "50%";
      this.UpgradeButton.style.width = "25%";
      this.UpgradeButton.style.height = "auto";
    } else {
      this.StartButton.id = "0.x";
      this.StartButton.style.width = "15%";
      this.StartButton.style.height = "auto";
      this.StartButton.style.top = "72%";
      this.StartButton.style.left = "40%";
      this.UpgradeButton.style.width = "15%";
      this.UpgradeButton.style.height = "auto";
      this.UpgradeButton.style.top = "72%";
      this.UpgradeButton.style.left = "60%";
    }

    // ปรับขนาดของหน้าอัปเกรดตามขนาดของหน้าจอ
    this.UpgradePage.style.height = (755 / 1080) * 100 + "%";
    this.UpgradePage.style.width =
      (571 * this.UpgradePage.offsetHeight) / 755 + "px";

    if (window.innerWidth < this.UpgradePage.offsetWidth) {
      this.UpgradePage.style.width = "100%";
      this.UpgradePage.style.height = "auto";
    }

    // ปรับขนาดของหน้าข้อมูลอัปเกรด
    this.UpgradeDataBackgroundDIV.style.height = (486 / 1080) * 100 + "%";
    this.UpgradeDataBackgroundDIV.style.width =
      (460 * this.UpgradeDataBackgroundDIV.offsetHeight) / 486 + "px";

    if (window.innerWidth < this.UpgradeDataBackgroundDIV.offsetWidth) {
      this.UpgradeDataBackgroundDIV.style.width = "100%";
      this.UpgradeDataBackgroundDIV.style.height = "auto";
    }

    // ตรวจสอบสถานะการเชื่อมต่อ Wallet หากเชื่อมต่อแล้วจะแสดงปุ่มเริ่มเกมและอัปเกรด
    if (Profile.Ready == true) {
      this.plaseConnectWallet.style.display = "none";
      this.StartButton.style.display = "block";
      this.UpgradeButton.style.display = "block";
      this.updateStatus();
    } else {
      this.plaseConnectWallet.style.display = "block";
      this.StartButton.style.display = "none";
      this.UpgradeButton.style.display = "none";
    }
  }

  // ฟังก์ชัน SetStartGame ใช้ในการตั้งค่าและเพิ่มองค์ประกอบกราฟิกสำหรับหน้าจอเริ่มต้นของเกม
  SetStartGame() {
    let groundStrat = document.createElement("div");
    groundStrat.id = "groundStrat";
    groundStrat.style.zIndex = "2";
    groundStrat.style.backgroundImage = "url(./images/groundStrat.svg)";
    groundStrat.style.top = "90%";
    groundStrat.style.left = "50%";
    groundStrat.style.width = "100%";
    groundStrat.style.height = "100%";
    groundStrat.style.position = "absolute";
    GameElement.TransformPivot(groundStrat, -50, -50);
    groundStrat.style.backgroundPositionX = "center";
    groundStrat.style.backgroundPositionY = "center";
    groundStrat.style.backgroundRepeat = "repeat-x";
    groundStrat.style.backgroundSize = "auto 10%";
    this.resource.appendChild(groundStrat);

    let sky = document.createElement("div");
    sky.id = "sky";
    sky.style.zIndex = "0";
    sky.style.backgroundImage = "url(./images/skyStart.svg)";
    sky.style.top = "35%";
    sky.style.left = "50%";
    sky.style.width = "100%";
    sky.style.height = "100%";
    sky.style.position = "absolute";
    GameElement.TransformPivot(sky, -50, -50);
    sky.style.backgroundPosition = "center";
    sky.style.backgroundRepeat = "repeat-x";
    sky.style.backgroundSize = "auto 100%";
    this.resource.appendChild(sky);

    let mountain = document.createElement("div");
    mountain.id = "mountain";
    mountain.style.zIndex = "1";
    mountain.style.backgroundImage = "url(./images/MountainStart.svg)";
    mountain.style.top = "70%";
    mountain.style.left = "50%";
    mountain.style.width = "100%";
    mountain.style.height = "100%";
    mountain.style.position = "absolute";
    GameElement.TransformPivot(mountain, -50, -50);
    mountain.style.backgroundPositionX = "0%";
    mountain.style.backgroundPositionY = "center";
    mountain.style.backgroundRepeat = "repeat-x";
    mountain.style.backgroundSize = "auto 50%";
    this.Mountain = mountain;
    this.resource.appendChild(mountain);

    let ray = document.createElement("div");
    ray.id = "line";
    ray.style.zIndex = "0";
    ray.style.backgroundImage = "url(./images/ray.svg)";
    ray.style.top = "40%";
    ray.style.left = "50%";
    ray.style.width = "100%";
    ray.style.height = "100%";
    ray.style.position = "absolute";
    GameElement.TransformPivot(ray, -50, -50);
    ray.style.backgroundPosition = "center";
    ray.style.backgroundRepeat = "no-repeat";
    ray.style.backgroundSize = "cover";
    this.Ray = ray;
    this.resource.appendChild(ray);
  }

  // ฟังก์ชัน SetGameIcon ใช้ในการตั้งค่าและเพิ่มไอคอนเกมในหน้าจอเริ่มต้น
  SetGameIcon() {
    let icon = document.createElement("img");
    icon.src = "./images/thecorekeeper.svg";
    icon.style.zIndex = "2";
    icon.style.top = "35%";
    icon.style.left = "50%";
    icon.style.width = "100%";
    icon.style.height = "50%";
    icon.style.position = "absolute";
    icon.style.backgroundPosition = "center";
    icon.style.backgroundRepeat = "no-repeat";
    GameElement.TransformScale(icon, 1);
    GameElement.TransformPivot(icon, -50, -50);
    icon.style.animation = "moveUpDown1 10s ease-in-out infinite";
    this.resource.appendChild(icon);

    let icon1 = document.createElement("img");
    icon1.src = "./images/theCoreeee.svg";
    icon1.style.zIndex = "2";
    icon1.style.top = "35%";
    icon1.style.left = "50%";
    icon1.style.width = "100%";
    icon1.style.height = "50%";
    icon1.style.position = "absolute";
    icon1.style.backgroundPosition = "center";
    icon1.style.backgroundRepeat = "no-repeat";
    GameElement.TransformScale(icon1, 1);
    GameElement.TransformPivot(icon1, -50, -50);
    icon1.style.animation = "moveUpDown 3s ease-in-out infinite";
    this.resource.appendChild(icon1);
  }

  // ฟังก์ชัน SetStartButton ใช้ในการตั้งค่าและเพิ่มปุ่มเริ่มเกมในหน้าจอเริ่มต้น
  SetStartButton() {
    let icon = document.createElement("img");
    icon.src = "./images/startbutton.svg";
    icon.id = "Start";
    icon.style.zIndex = "2";
    icon.style.top = "72%";
    icon.style.left = "40%";
    if (window.innerHeight > window.innerWidth) {
      icon.style.width = "40%";
      icon.style.height = "auto";
    } else {
      icon.style.width = "15%";
      icon.style.height = "50%";
    }
    icon.style.position = "absolute";
    icon.style.backgroundPosition = "center";
    icon.style.backgroundRepeat = "no-repeat";
    GameElement.TransformScale(icon, 1);
    GameElement.TransformPivot(icon, -50, -50);
    this.StartButton = icon;
    this.resource.appendChild(icon);
  }

  // ฟังก์ชัน SetPleaseConnectWalletFirst ใช้ในการตั้งค่าข้อความแจ้งเตือนให้เชื่อมต่อ Wallet ก่อนเริ่มเกม
  SetPleaseConnectWalletFirst() {
    let span = document.createElement("span");
    span.id = "plsConnect";
    span.style.zIndex = "2";
    span.style.top = "72%";
    span.style.left = "50%";
    span.style.textAlign = "center";
    span.textContent = "Please Connect Wallet First";
    span.style.fontSize = "40px";
    span.style.position = "absolute";
    span.style.color = "#ffffcc";
    GameElement.TransformPivot(span, -50, -50);
    this.resource.appendChild(span);
    this.plaseConnectWallet = span;
  }

  // ฟังก์ชัน SetUpgradeButton ใช้ในการตั้งค่าและเพิ่มปุ่มอัปเกรดในหน้าจอเริ่มต้น
  SetUpgradeButton() {
    let icon = document.createElement("img");
    icon.src = "./images/upgradebutton.svg";
    icon.id = "upgrade";
    icon.style.zIndex = "3";
    if (window.innerHeight > window.innerWidth) {
      icon.style.top = "82%";
      icon.style.left = "50%";
      icon.style.width = "40%";
      icon.style.height = "auto";
    } else {
      icon.style.top = "72%";
      icon.style.left = "60%";
      icon.style.width = "15%";
      icon.style.height = "50%";
    }
    icon.style.position = "absolute";
    icon.style.backgroundPosition = "center";
    icon.style.backgroundRepeat = "no-repeat";
    GameElement.TransformScale(icon, 1);
    GameElement.TransformPivot(icon, -50, -50);
    this.UpgradeButton = icon;
    this.resource.appendChild(icon);
  }

  // ฟังก์ชัน SetLeaderBoardButton ใช้ในการตั้งค่าและเพิ่มปุ่มสำหรับแสดงอันดับในหน้าจอเริ่มต้น
  SetLeaderBoardButton() {
    let icon = document.createElement("img");
    icon.src = "./images/start.svg";
    icon.style.top = "72%";
    icon.style.left = "75%";
    if (window.innerHeight > window.innerWidth) {
      icon.style.width = "40%";
      icon.style.height = "50%";
    } else {
      icon.style.width = "15%";
      icon.style.height = "50%";
    }
    icon.style.position = "absolute";
    icon.style.backgroundPosition = "center";
    icon.style.backgroundRepeat = "no-repeat";
    GameElement.TransformScale(icon, 1);
    GameElement.TransformPivot(icon, -50, -50);
    this.LeaderBoardButton = icon;
    this.resource.appendChild(icon);
  }

  // ฟังก์ชัน UpgradeDIV ใช้ในการตั้งค่า UI สำหรับหน้าจออัปเกรด
  UpgradeDIV() {
    let upgradePage = document.createElement("div");
    upgradePage.id = "UpgradePage";
    upgradePage.style.zIndex = "4";
    upgradePage.style.top = "50%";
    upgradePage.style.left = "100%";
    upgradePage.style.position = "absolute";
    upgradePage.style.height = (755 / 1080) * 100 + "%";
    upgradePage.style.width = (571 * upgradePage.offsetHeight) / 755 + "px";
    GameElement.TransformPivot(upgradePage, -100, -50);
    this.resource.appendChild(upgradePage);
    this.UpgradePage = upgradePage;
    this.UpgradePage.style.display = "none";

    let upgradePageBg = document.createElement("img");
    upgradePageBg.id = "upgradePageBg";
    upgradePageBg.src = "./images/UpgradeBG.svg";
    upgradePageBg.style.width = "100%";
    upgradePageBg.style.height = "100%";
    upgradePage.appendChild(upgradePageBg);

    let ExitIcon = document.createElement("img");
    ExitIcon.src = "./images/bt_X.png";
    ExitIcon.style.top = "-7%";
    ExitIcon.style.right = "2%";
    ExitIcon.style.width =
      (155 * GameElement.GameElementColletion["controlArea"].ScaleFactor) / 3 +
      "px";
    ExitIcon.style.height =
      (163 * GameElement.GameElementColletion["controlArea"].ScaleFactor) / 3 +
      "px";
    ExitIcon.style.position = "absolute";
    this.ExitUpgradePage = ExitIcon;
    ExitIcon.addEventListener("click", (event) => {
      this.UpgradePage.style.display = "none";
    });

    for (let index = 0; index < this.skillImage.length; index++) {
      // เรียกฟังก์ชัน Upgrader เพื่อสร้างองค์ประกอบ UI สำหรับสกิล
      Profile["_uiupgrade" + index] = this.Upgrader(
        this.skillName[index], // ชื่อของสกิล (เช่น "Battery", "Vision")
        this.skillImage[index], // ภาพของสกิลที่ใช้แสดงผล
        8 + index * 12 + "%", // ตำแหน่งบนแกน y ของสกิลที่จะแสดงผลในหน้าจอ (เพิ่มทีละ 12%)
        index // ดัชนีของสกิล (ใช้ในการอ้างอิงสกิลแต่ละอัน)
      );

      // ตั้งค่าให้สกิลที่สร้างขึ้นมีความโปร่งใส 50% โดยเริ่มต้น
      Profile["_uiupgrade" + index].element.style.opacity = "0.5";

      // เก็บองค์ประกอบ UI ที่สร้างขึ้นไว้ใน Profile เพื่อใช้งานในภายหลัง
      Profile["_uiupgrade" + this.skillName[index]] =
        Profile["_uiupgrade" + index].element;

      // เพิ่มองค์ประกอบ UI ของสกิลลงในหน้าจอการอัปเกรด
      this.UpgradePage.appendChild(Profile["_uiupgrade" + index].element);
    }

    for (let s in this.skillEnable) {
      // ตั้งค่า opacity ของสกิลที่เปิดใช้งานให้เป็น 100% เพื่อแสดงว่าพร้อมใช้งาน
      Profile["_uiupgrade" + s].style.opacity = "1";
    }
    this.UpgradePage.appendChild(ExitIcon);
  }

  // ฟังก์ชัน UpgradeDialog ใช้ในการตั้งค่าและแสดงผลหน้าต่างข้อมูลการอัปเกรด
  UpgradeDialog() {
    let upgradeDataDiv = document.createElement("div");
    upgradeDataDiv.id = "upgradeDataDiv";
    upgradeDataDiv.style.top = "50%";
    upgradeDataDiv.style.left = "50%";
    upgradeDataDiv.style.width = "100%";
    upgradeDataDiv.style.height = "100%";
    upgradeDataDiv.style.position = "fixed";
    upgradeDataDiv.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    GameElement.TransformPivot(upgradeDataDiv, -50, -50);
    upgradeDataDiv.style.display = "block";
    this.UpgradeDataDiv = upgradeDataDiv;
    document.body.appendChild(upgradeDataDiv);

    let upgradeDataBackgroundDIV = document.createElement("div");
    upgradeDataBackgroundDIV.id = "upgradeDataBackgroundDIV";
    upgradeDataBackgroundDIV.style.top = "50%";
    upgradeDataBackgroundDIV.style.left = "50%";
    upgradeDataBackgroundDIV.style.position = "fixed";
    upgradeDataBackgroundDIV.style.height = (601 / 1080) * 100 + "%";
    upgradeDataBackgroundDIV.style.width =
      (569 * upgradeDataBackgroundDIV.offsetHeight) / 601 + "%";
    GameElement.TransformPivot(upgradeDataBackgroundDIV, -50, -50);
    upgradeDataDiv.appendChild(upgradeDataBackgroundDIV);
    this.UpgradeDataBackgroundDIV = upgradeDataBackgroundDIV;

    let upgradeDataBackground = document.createElement("img");
    upgradeDataBackground.id = "upgradeDataBackground";
    upgradeDataBackground.style.width = "100%";
    upgradeDataBackground.style.height = "100%";
    upgradeDataBackground.src = "./images/upgrageItembg.svg";
    upgradeDataBackgroundDIV.appendChild(upgradeDataBackground);

    let upgradeDataImg = document.createElement("img");
    upgradeDataImg.src = "./images/Group 151.svg";
    upgradeDataImg.style.position = "absolute";
    upgradeDataImg.style.top = "20%";
    upgradeDataImg.style.left = "20%";
    upgradeDataImg.style.width = "auto";
    upgradeDataImg.style.height = "25%";
    GameElement.TransformPivot(upgradeDataImg, -50, -50);
    this.UpgradeDataImg = upgradeDataImg;
    this.UpgradeDataBackgroundDIV.appendChild(upgradeDataImg);

    let upgradeDataHeader = document.createElement("span");
    upgradeDataHeader.textContent = "Skillxxxx";
    upgradeDataHeader.style.top = "10%";
    upgradeDataHeader.style.left = "37%";
    upgradeDataHeader.style.position = "absolute";
    upgradeDataHeader.style.fontSize = "30px";
    upgradeDataHeader.style.textAlign = "left";
    upgradeDataHeader.style.color = "white";
    GameElement.TransformPivot(upgradeDataHeader, -0, -50);
    this.UpgradeDataHeader = upgradeDataHeader;
    this.UpgradeDataBackgroundDIV.appendChild(upgradeDataHeader);

    let upgradeDataDes = document.createElement("span");
    upgradeDataDes.style.position = "absolute";
    upgradeDataDes.style.top = "25%";
    upgradeDataDes.style.left = "67%";
    upgradeDataDes.style.width = "60%";
    upgradeDataDes.style.height = "21%";
    upgradeDataDes.style.color = "white";
    upgradeDataDes.textContent =
      "dfgnhakdfjghadkfguadfhbgliashgiaflhgaflikdhgalkdfbngladhfgai";
    upgradeDataDes.style.textAlign = "left";
    upgradeDataDes.style.overflowWrap = "break-word";
    GameElement.TransformPivot(upgradeDataDes, -50, -50);
    this.UpgradeDataDes = upgradeDataDes;
    this.UpgradeDataBackgroundDIV.appendChild(upgradeDataDes);

    let upgradeResoureDivBlack = document.createElement("div");
    upgradeResoureDivBlack.style.backgroundColor = "black";
    upgradeResoureDivBlack.style.top = "60%";
    upgradeResoureDivBlack.style.left = "50%";
    upgradeResoureDivBlack.style.position = "absolute";
    GameElement.TransformPivot(upgradeResoureDivBlack, -50, -50);
    upgradeResoureDivBlack.style.width = "90%";
    upgradeResoureDivBlack.style.height = "28%";

    upgradeResoureDivBlack.style.borderRadius = "5%";
    this.UpgradeDataBackgroundDIV.appendChild(upgradeResoureDivBlack);

    let upgradeResoureDiv = document.createElement("div");
    upgradeResoureDiv.style.top = "55%";
    upgradeResoureDiv.style.left = "50%";
    upgradeResoureDiv.style.position = "absolute";
    GameElement.TransformPivot(upgradeResoureDiv, -50, -50);
    upgradeResoureDiv.style.width = "100%";
    upgradeResoureDiv.style.height = "35%";

    for (let index = 0; index < 3; index++) {
      let upgradeResource = this.ResourceUse(
        33.33 * index + "%", // กำหนดตำแหน่งทางซ้ายของแต่ละทรัพยากร โดยเริ่มจาก 0%, 33.33%, และ 66.66%
        "blue", // สีขององค์ประกอบ UI (ในที่นี้ถูกกำหนดเป็น "blue")
        this.resourceImage[index], // รูปภาพของทรัพยากรที่ใช้แสดงผล (เช่น รูปภาพของไม้, เหล็ก, หิน)
        this.resourceName[index] // ชื่อของทรัพยากรที่ใช้แสดงผล (เช่น "Branch", "Iron", "Stone")
      );

      // เพิ่มองค์ประกอบ UI ของทรัพยากรลงใน upgradeResoureDiv ซึ่งเป็นคอนเทนเนอร์สำหรับทรัพยากรทั้งหมด
      upgradeResoureDiv.appendChild(upgradeResource[0]);

      // เก็บค่าองค์ประกอบ UI ที่แสดงจำนวนของทรัพยากรแต่ละประเภทไว้ในอาร์เรย์ เพื่ออ้างอิงและอัปเดตในอนาคต
      this.UpgradeResourceAmount[index] = upgradeResource[1];
    }

    this.branchRequire = this.UpgradeResourceAmount[0];
    this.ironRequire = this.UpgradeResourceAmount[1];
    this.stoneRequire = this.UpgradeResourceAmount[2];
    this.UpgradeDataBackgroundDIV.appendChild(upgradeResoureDiv);

    let upgradeButtonResource = document.createElement("img");
    upgradeButtonResource.src = "./images/upgradebutton.svg";
    upgradeButtonResource.style.top = "86%";
    upgradeButtonResource.style.left = "71%";
    upgradeButtonResource.style.position = "absolute";
    GameElement.TransformPivot(upgradeButtonResource, -50, -50);
    upgradeButtonResource.style.width = "auto";
    upgradeButtonResource.style.height = "12%";

    upgradeButtonResource.addEventListener("click", (event) => {
      // เช็คว่าปุ่มสามารถกดได้หรือไม่ (ถ้า opacity เท่ากับ 0.5 แสดงว่าปุ่มไม่สามารถกดได้)
      if (upgradeButtonResource.style.opacity == "0.5") return;

      // ปรับขนาดของปุ่มให้เล็กลงเล็กน้อยเมื่อกดปุ่ม
      upgradeButtonResource.style.scale = "0.99";

      // กำหนดทรัพยากรที่ใช้ในกระบวนการอัปเกรด
      let resource = ["Branch", "Iron", "Stone"];

      // ลูปผ่านทรัพยากรแต่ละชนิด (ไม้, เหล็ก, หิน)
      for (let pr in resource) {
        let r = resource[pr];
        // ลดจำนวนทรัพยากรที่ผู้เล่นมีลงตามค่าที่กำหนดไว้ใน Profile.Data
        Profile.Data.resource[r.toLowerCase()] -=
          Profile.Data["_use" + r.toLowerCase()];
      }

      // เพิ่มระดับของสกิลที่ผู้เล่นกำลังอัปเกรด
      Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()]++;

      // แสดงรายละเอียดของการอัปเกรดใหม่หลังจากทำการอัปเกรดเสร็จ
      this.ShowDetailUpgrade(
        this.skillName[this.indexNow],
        this.skillImage[this.indexNow]
      ).then(() => {
        // หลังจากแสดงรายละเอียดเสร็จแล้ว ให้ปรับขนาดปุ่มกลับมาเท่าเดิมหลังจากผ่านไป 200 มิลลิวินาที
        setTimeout(() => {
          upgradeButtonResource.style.scale = "1";
        }, 200);
      });

      // อัปเดตแถบแสดงระดับการอัปเกรดให้ลดลงตามระดับที่เพิ่งอัปเกรด
      this.UpgradeBarMock[this.indexNow].style.clipPath =
        "inset(0 " + (100 - this.click - 1) + "% 0 0)";
    });

    this.UpgradeButtonResource = upgradeButtonResource;
    this.UpgradeDataBackgroundDIV.appendChild(upgradeButtonResource);

    let upgradeDataExit = document.createElement("img");
    upgradeDataExit.style.top = "86%";
    upgradeDataExit.style.left = "30%";
    upgradeDataExit.style.position = "absolute";
    upgradeDataExit.src = "./images/CancelUpgrade.svg";
    upgradeDataExit.style.width = "auto";
    upgradeDataExit.style.height = "12%";
    GameElement.TransformPivot(upgradeDataExit, -50, -50);
    upgradeDataExit.addEventListener("click", (event) => {
      this.UpgradeDataDiv.style.display = "none";
    });
    this.UpgradeDataBackgroundDIV.appendChild(upgradeDataExit);

    let upgradeDataLevel = document.createElement("span");
    upgradeDataLevel.style.position = "absolute";
    upgradeDataLevel.style.top = "10%";
    upgradeDataLevel.style.left = "75%";
    upgradeDataLevel.style.width = "25%";
    upgradeDataLevel.style.height = "8%";
    upgradeDataLevel.style.color = "white";
    upgradeDataLevel.style.fontSize = "30px";
    upgradeDataLevel.textContent = "0";
    upgradeDataLevel.style.textAlign = "left";
    upgradeDataLevel.style.overflowWrap = "break-word";
    GameElement.TransformPivot(upgradeDataLevel, -50, -50);
    this["UpgradeDataLevel"] = upgradeDataLevel;
    this.UpgradeDataBackgroundDIV.appendChild(upgradeDataLevel);
  }

  // ฟังก์ชัน Upgrader ใช้ในการตั้งค่า UI ของการอัปเกรดแต่ละสกิล
  Upgrader(name: string, icon: string, top: string, index: number): any {
    let upgradeBox = document.createElement("div");
    let upgradePic = document.createElement("img");
    upgradeBox.id = name;
    upgradeBox.style.width = "100%";
    upgradeBox.style.height = "12%";
    upgradeBox.style.top = top;
    upgradeBox.style.left = "5%";
    upgradeBox.style.width = "100%";
    upgradeBox.style.position = "absolute";

    upgradePic.src = icon;
    upgradePic.style.width = "auto";
    upgradePic.style.height = "75%";
    upgradePic.style.position = "absolute";
    upgradePic.style.top = "50%";
    upgradePic.style.left = "5%";

    GameElement.TransformPivot(upgradePic, -0, -50);

    let upgradeText = document.createElement("span");
    upgradeText.style.left = "22%";
    upgradeText.style.top = "20%";
    upgradeText.textContent = name;
    upgradeText.style.color = "white";
    upgradeText.style.position = "absolute";
    GameElement.TransformPivot(upgradeText, -0, -50);

    let upgradeBar = document.createElement("img");
    upgradeBar.src = "./images/UpgrageBar.svg";
    upgradeBar.id = index + "";
    upgradeBar.style.width = 50 + "%";
    upgradeBar.style.height = 36 + "%";
    upgradeBar.style.position = "absolute";
    upgradeBar.style.top = "64%";
    upgradeBar.style.left = "47%";
    GameElement.TransformPivot(upgradeBar, -50, -50);
    this.UpgradeBar.push(upgradeBar);

    let upgradePlus = document.createElement("img");
    upgradePlus.src = "./images/Plus.svg";
    upgradePlus.style.top = "43%";
    upgradePlus.style.left = "83%";
    upgradePlus.style.width = "7.5%";
    upgradePlus.style.height = "auto";
    upgradePlus.style.position = "absolute";
    GameElement.TransformPivot(upgradePlus, -100, -50);
    this.UpgradePlus.push(upgradePlus);
    upgradePlus["_index"] = index;

    let upgradeBarMock = document.createElement("img");
    upgradeBarMock.src = "./images/UpgrageBarMock.svg";
    upgradeBarMock.id = index + "";
    upgradeBarMock.style.width = 49 + "%";
    upgradeBarMock.style.height = 38 + "%";
    upgradeBarMock.style.position = "absolute";
    upgradeBarMock.style.top = "64%";
    upgradeBarMock.style.left = "47.25%";
    upgradeBarMock.style.clipPath = "inset(0 100% 0 0)";
    GameElement.TransformPivot(upgradeBarMock, -50, -50);
    this.UpgradeBarMock.push(upgradeBarMock);

    upgradePlus.addEventListener("click", (event) => {
      // ตรวจสอบว่าองค์ประกอบหลักของปุ่ม (parentElement) มีค่า opacity ที่ 0.5 หรือไม่
      // ถ้ามีค่า opacity เท่ากับ 0.5 แสดงว่าสกิลนี้ยังไม่พร้อมที่จะอัปเกรด จึงหยุดการทำงานของฟังก์ชัน
      if (upgradePlus.parentElement.style.opacity == "0.5") return;

      // ถ้าสกิลสามารถอัปเกรดได้ ให้กำหนดค่า indexNow เป็นค่า "_index" ของปุ่ม "+" ที่ถูกคลิก
      // ซึ่ง "_index" นี้ถูกเก็บไว้ก่อนหน้านี้ตอนที่มีการสร้าง UI ของสกิลแต่ละอัน
      this.indexNow = upgradePlus["_index"];

      // เรียกฟังก์ชัน ShowDetailUpgrade เพื่อแสดงรายละเอียดเพิ่มเติมของสกิลที่ถูกคลิก
      // โดยใช้ชื่อและรูปภาพของสกิลที่สอดคล้องกับค่า indexNow ที่กำหนดไว้
      this.ShowDetailUpgrade(name, icon);
    });

    upgradeBox.appendChild(upgradeText);
    upgradeBox.appendChild(upgradePlus);
    upgradeBox.appendChild(upgradePic);
    upgradeBox.appendChild(upgradeBar);
    upgradeBox.appendChild(upgradeBarMock);
    return { element: upgradeBox, bar: upgradeBarMock };
  }

  // ฟังก์ชัน ShowDetailUpgrade ใช้ในการแสดงข้อมูลการอัปเกรดเมื่อผู้เล่นเลือกสกิลที่จะอัปเกรด
  async ShowDetailUpgrade(name: string, icon: string) {
    // ตรวจสอบว่ามีข้อมูลการอัปเกรดของสกิลนี้อยู่ใน Profile.Data หรือไม่
    if (
      Profile.Data[
        "_upgradedata" + this.skillName[this.indexNow].toLowerCase()
      ] == null
    ) {
      // หากไม่มีข้อมูล ให้เรียก API เพื่อดึงข้อมูลการอัปเกรดจากเซิร์ฟเวอร์
      Profile.Data[
        "_upgradedata" + this.skillName[this.indexNow].toLowerCase()
      ] = await API.GetUpgradeData(this.skillName[this.indexNow].toLowerCase());
    }

    // ดึงข้อมูลการอัปเกรดจาก Profile.Data
    let data =
      Profile.Data[
        "_upgradedata" + this.skillName[this.indexNow].toLowerCase()
      ];

    // แสดงข้อมูลการอัปเกรดปัจจุบันในคอนโซลเพื่อการตรวจสอบ
    console.log(
      data[Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()]]
    );

    // แสดงหน้าจอข้อมูลการอัปเกรด
    this.UpgradeDataDiv.style.display = "block";

    // ตั้งค่าหัวข้อของหน้าจอด้วยชื่อของสกิลที่กำลังอัปเกรด
    this.UpgradeDataHeader.textContent = name;

    // แสดงคำอธิบายสกิล (ซึ่งตอนนี้เป็นข้อมูลแบบ placeholder)
    this.UpgradeDataDes.textContent = name + " Description";

    // ตั้งค่ารูปภาพของสกิลในหน้าจอข้อมูลการอัปเกรด
    this.UpgradeDataImg.src = icon;

    // ตั้งค่าให้ปุ่มอัปเกรดพร้อมใช้งาน (opacity = 1)
    this.UpgradeButtonResource.style.opacity = "1";

    // กำหนดรายการทรัพยากรที่ใช้ในการอัปเกรด
    let resource = ["Branch", "Iron", "Stone"];

    // วนลูปตรวจสอบทรัพยากรที่มีเพียงพอหรือไม่
    for (let pr in resource) {
      let r = resource[pr];

      // ตรวจสอบว่าทรัพยากรที่ผู้เล่นมีน้อยกว่าที่ต้องการสำหรับการอัปเกรดหรือไม่
      if (
        Profile.Data.resource[r.toLowerCase()] <
        Math.trunc(
          data[
            Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()] +
              1
          ][r]
        )
      ) {
        // ถ้าน้อยกว่า: เปลี่ยนสีข้อความของทรัพยากรนั้นเป็นสีแดง และปิดใช้งานปุ่มอัปเกรด (opacity = 0.5)
        (this[r.toLowerCase() + "Require"] as HTMLElement).style.color = "red";
        this.UpgradeButtonResource.style.opacity = "0.5";
      } else {
        // ถ้ามีเพียงพอ: เปลี่ยนสีข้อความของทรัพยากรนั้นเป็นสีขาว
        (this[r.toLowerCase() + "Require"] as HTMLElement).style.color =
          "white";
      }
    }

    // แสดงระดับปัจจุบันของสกิลที่กำลังอัปเกรด
    this["UpgradeDataLevel"].textContent =
      "LV : " +
      Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()];

    // คำนวณและจัดเก็บทรัพยากรที่ต้องใช้ในการอัปเกรดสกิลแต่ละชนิดใน Profile.Data
    Profile.Data["_usebranch"] = Math.trunc(
      data[
        Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()] + 1
      ].Branch
    );
    Profile.Data["_usestone"] = Math.trunc(
      data[
        Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()] + 1
      ].Stone
    );
    Profile.Data["_useiron"] = Math.trunc(
      data[
        Profile.Data.upgrade[this.skillName[this.indexNow].toLowerCase()] + 1
      ].Iron
    );

    // แสดงจำนวนทรัพยากรที่มีอยู่ในปัจจุบันและที่ต้องใช้ในการอัปเกรดบนหน้าจอ
    this.branchRequire.textContent =
      Profile.Data.resource.branch + "/" + Profile.Data["_usebranch"];
    this.ironRequire.textContent =
      Profile.Data.resource.iron + "/" + Profile.Data["_useiron"];
    this.stoneRequire.textContent =
      Profile.Data.resource.stone + "/" + Profile.Data["_usestone"];
  }

  // ฟังก์ชัน ResourceUse ใช้ในการสร้างองค์ประกอบ UI สำหรับแสดงทรัพยากรที่จำเป็นในการอัปเกรด
  ResourceUse(
    left: string,
    color: string,
    imgSrc: string,
    name: string
  ): [HTMLElement, HTMLElement] {
    let upgradeResource = document.createElement("div");
    upgradeResource.id = name;
    upgradeResource.style.left = left;
    upgradeResource.style.top = "50%";
    upgradeResource.style.position = "absolute";
    GameElement.TransformPivot(upgradeResource, 0, -50);
    upgradeResource.style.width = "33.33%";
    upgradeResource.style.height = "100%";

    let upgradeResourceImg = document.createElement("img");
    upgradeResourceImg.src = imgSrc;
    upgradeResourceImg.style.top = "30%";
    upgradeResourceImg.style.left = "50%";
    upgradeResourceImg.style.width = "50%";
    upgradeResourceImg.style.height = "auto";
    upgradeResourceImg.style.position = "absolute";
    GameElement.TransformPivot(upgradeResourceImg, -50, -50);

    let upgradeResourceAmount = document.createElement("span");
    upgradeResourceAmount.style.fontSize = "20px";
    upgradeResourceAmount.textContent = "50";
    upgradeResourceAmount.style.top = "65%";
    upgradeResourceAmount.style.left = "50%";
    upgradeResourceAmount.style.position = "absolute";
    upgradeResourceAmount.style.color = "white";
    GameElement.TransformPivot(upgradeResourceAmount, -50, -50);

    upgradeResource.appendChild(upgradeResourceImg);
    upgradeResource.appendChild(upgradeResourceAmount);

    let upgradeResourceName = document.createElement("span");
    upgradeResourceName.style.fontSize = "20px";
    upgradeResourceName.textContent = name;
    upgradeResourceName.style.top = "88%";
    upgradeResourceName.style.left = "50%";
    upgradeResourceName.style.position = "absolute";
    upgradeResourceName.style.color = "white";
    GameElement.TransformPivot(upgradeResourceName, -50, -50);
    upgradeResource.appendChild(upgradeResourceName);
    return [upgradeResource, upgradeResourceAmount];
  }

  // ฟังก์ชัน UpgradeEvent ใช้ในการจัดการเหตุการณ์ที่เกี่ยวข้องกับการอัปเกรด (ยังไม่ถูกใช้งานในโค้ดนี้)
  UpgradeEvent(index: number) {}
}
