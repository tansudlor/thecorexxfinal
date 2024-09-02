import { GameElement } from "./GameElement";

export class ScoreUI extends GameElement {
  protected parent: GameElement;
  public FontSize: string = "20px";
  public XPivot: number = -50;
  public YPivot: number = -50;
  public TextColor: string = "white";
  private scoreBg;
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
    let scoreText = GameElement.SetTextWithImage(
      id,
      20,
      id,
      -0,
      -0,
      5,
      9,
      parent.resource,
      "white"
    );
    this.resource = scoreText[0];
    this.scoreBg = scoreText[1];
  }
  update(self: GameElement): void {
    if (window.innerHeight > 1.3 * window.innerWidth) {
      this.resource.id = "1.30";
      this.resource.style.left = "3%";
      this.resource.style.top = "9.55%";
      this.resource.style.fontSize = "12px";
      this.scoreBg.id = "1.30";
      this.scoreBg.style.left = "1%";
      this.scoreBg.style.top = "9%";
      this.scoreBg.style.scale = "1";
    } else if (window.innerHeight > 1.0 * window.innerWidth) {
      this.resource.id = "1.0";
      this.scoreBg.id = "1.0";
      this.scoreBg.style.left = "5%";
      this.scoreBg.style.top = "10.5%";
      this.scoreBg.style.scale = "2";
      this.resource.style.left = "2.25%";
      this.resource.style.top = "10.5%";
      this.resource.style.fontSize = "20px";
    } else {
      this.resource.id = "0.0";
      this.scoreBg.id = "0.0";
      this.scoreBg.style.left = "5%";
      this.scoreBg.style.top = "10.5%";
      this.scoreBg.style.scale = "2";
      this.resource.style.left = "3.5%";
      this.resource.style.top = "10.5%";
      this.resource.style.fontSize = "20px";
    }
  }
}
