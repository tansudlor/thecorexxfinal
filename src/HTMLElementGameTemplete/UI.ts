import { GameElement } from "./GameElement";

export class UI extends GameElement {
  protected parent: GameElement;
  public FontSize: string = "100px";
  public XPivot: number = -50;
  public YPivot: number = -50;
  public TextColor: string = "white";
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
  }

  start() {
    this.resource = this.SetText(this.src);
  }

  SetText(textInput: string) {
    let text = document.createElement("span");
    text.textContent = textInput;
    text.style.fontSize = this.FontSize;
    text.style.textAlign = "center";
    text.style.color = "white";
    GameElement.TransformPivot(text, this.XPivot, this.YPivot);
    GameElement.SetPostion(text, this.X, this.Y);
    this.Parent.resource.appendChild(text);
    return text;
  }
}
