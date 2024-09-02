import { GameElement } from "./GameElement";

export class ControlContainer extends GameElement {
  protected parent: GameElement;
  private container: HTMLElement;
  public RefWidth: number;
  public RefHeight: number;
  public Width: number;
  public Height: number;
  public ScaleFactor: number;
  constructor(id: string, src: string, parent: GameElement) {
    super(id, src, parent);
    this.resource = this.CreateContainer();
    this.update(this);
  }

  update(self: GameElement): void {
    this.ScaleFactor = window.innerHeight / this.RefHeight;
    this.container.style.width = this.RefWidth * this.ScaleFactor + "px";
    this.container.style.height = window.innerHeight + "px";
    this.Width = this.RefWidth * this.ScaleFactor;
    this.Height = window.innerHeight;
  }

  CreateContainer() {
    this.container = document.createElement("div");
    this.container.id = this.id;
    this.container.style.position = "fixed";
    this.container.style.top = "57%";
    this.container.style.left = "50%";
    this.container.style.width = "1920px";
    this.container.style.height = "1080px";

    //this.con.style.backgroundColor = "#FFFFFF";
    this.container.style.transform = "translate(-50%,-50%)";
    this.container.style.transform += "scale(0.7)";
    this.RefWidth = 3840;
    this.RefHeight = 1080;

    if (this.parent == null) {
      document.body.appendChild(this.container);
    } else {
      this.parent.resource.appendChild(this.container);
    }

    return this.container;
  }
}
