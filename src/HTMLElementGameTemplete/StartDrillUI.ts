import { GameElement } from "./GameElement";

export class StartDrillUI extends GameElement {
  protected parent: GameElement;
  public FontSize: string = "20px";
  public XPivot: number = -50;
  public YPivot: number = -50;
  public TextColor: string = "white";
  public StartGame;
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
    this.StartDrill();
  }

  update(self: GameElement): void {
    if (window.innerHeight > 1.3 * window.innerWidth) {
      this.StartGame.id = "1.3";
      this.StartGame.style.left = "50%";
      this.StartGame.style.top = "46%";
      this.StartGame.style.width = "100px";
      this.StartGame.style.height = "auto";
    } else if (window.innerHeight > 1.0 * window.innerWidth) {
      this.StartGame.id = "1.0";
      this.StartGame.style.left = "50%";
      this.StartGame.style.top = "46%";
      this.StartGame.style.width = "145px";
      this.StartGame.style.height = "auto";
    } else {
      this.StartGame.id = "0.0";
      this.StartGame.style.left = "40%";
      this.StartGame.style.top = "46%";
      this.StartGame.style.width = "145px";
      this.StartGame.style.height = "auto";
    }
  }

  private StartDrill() {
    let startGame = document.createElement("img");
    startGame.id = this.id;
    startGame.src = "./images/DrillNow.svg";
    startGame.style.left = "40%";
    startGame.style.top = "46%";
    startGame.style.width = "145px";
    startGame.style.height = "auto";
    startGame.style.position = "absolute";
    GameElement.TransformPivot(startGame, -50, -50);
    this.parent.resource.appendChild(startGame);
    this.StartGame = startGame;
  }
}
