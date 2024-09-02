export class GameElement {
  protected src: string;
  public resource: HTMLElement;
  public X: number = 0;
  public Y: number = 0;
  public Angle: number = 0;
  public static GameElementColletion: object = {};
  public Parent: GameElement;
  bgScoreImg;
  protected id: string;
  constructor(id: string, src: string, parent: GameElement) {
    this.id = id;
    this.src = src; // กำหนดค่าเริ่มต้นให้กับ property ใน constructor
    this.Parent = parent;
    GameElement.GameElementColletion[id] = this;
  }

  update(self: GameElement) {}
  destroy() {
    //console.log("destroy");
    if (this.resource != null) {
      this.resource.remove();
    }
    delete GameElement.GameElementColletion[this.id];
  }

  /*static SetStyle(
    element: HTMLElement,
    x: number,
    y: number,
    scale: number,
    rotate: number,
    color: string = "#ffffff"
  ) {
    element.style.left = x + "%";
    element.style.top = y + "%";
    element.style.color = color;
    element.style.scale = scale + "%";
    element.style.position = "absolute";
    element.style.transform = "translate(-50%,-50%)";
  }*/

  static SetPostion(
    element: HTMLElement,
    x: number,
    y: number,
    unit: string = "px",
    position: string = "absolute",
    autoScale: boolean = true
  ) {
    if (autoScale) {
      element.style.left = (x * window.innerHeight) / 1080 + unit;
      element.style.top = (y * window.innerHeight) / 1080 + unit;
    } else {
      element.style.left = x + unit;
      element.style.top = y + unit;
    }
    element.style.position = position;
  }

  static ClearTransform(element: HTMLElement) {
    element.style.transform = "";
  }

  static TransformAngle(element: HTMLElement, rotate: number) {
    element.style.transform += `rotate(${rotate}deg) `;
  }

  static TransformPivot(element: HTMLElement, x: number, y: number) {
    element.style.transform += `translate(${x}%,${y}%) `;
  }

  static TransformScale(element: HTMLElement, scale: number) {
    element.style.transform += "scale(" + scale + ")";
  }
  static SetTextWithImage(
    textInput: string,
    fontSize: number,
    id: string,
    xPivot: number,
    yPivot: number,
    x: number,
    y: number,
    parent: HTMLElement,
    color: string
  ) {
    let bgImage = document.createElement("img");
    bgImage.src = "./images/scorebox.svg";
    bgImage.id = id + "Image";
    bgImage.style.scale = "2.0";

    GameElement.TransformPivot(bgImage, xPivot, yPivot);
    GameElement.SetPostion(bgImage, x + 1.2, y, "%");
    parent.appendChild(bgImage);
    let text = document.createElement("span");
    text.textContent = textInput;
    text.style.fontSize = fontSize + "px";
    text.style.textAlign = "left";
    text.style.color = color;
    text.id = id;
    GameElement.TransformPivot(text, xPivot, yPivot);
    GameElement.SetPostion(text, x, y, "%");
    parent.appendChild(text);
    return [text, bgImage];
  }
  static SetText(
    textInput: string,
    fontSize: number,
    id: string,
    xPivot: number,
    yPivot: number,
    x: number,
    y: number,
    parent: HTMLElement,
    color: string
  ) {
    let text = document.createElement("span");
    text.textContent = textInput;
    text.style.fontSize = fontSize + "px";
    text.style.textAlign = "left";
    text.style.color = color;
    text.id = id;
    GameElement.TransformPivot(text, xPivot, yPivot);
    GameElement.SetPostion(text, x, y, "%");
    parent.appendChild(text);
    return text;
  }
}
