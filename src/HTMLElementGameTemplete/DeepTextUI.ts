import { GameElement } from "./GameElement";

export class DeepTextUI extends GameElement {
  protected parent: GameElement;
  public FontSize: string = "20px";
  public XPivot: number = -50;
  public YPivot: number = -50;
  public TextColor: string = "white";
  private deepBg;
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
    let deepText = GameElement.SetTextWithImage(
      "Deep",
      20,
      "Deep",
      0,
      0,
      5,
      14,
      parent.resource,
      "white"
    );
    this.resource = deepText[0];
    this.deepBg = deepText[1];
  }

  update(self: GameElement): void {
    if (window.innerHeight > 1.3 * window.innerWidth) {
      this.resource.id = "1.30";
      this.resource.style.left = "3%";
      this.resource.style.top = "13.6%";
      this.resource.style.fontSize = "12px";
      this.deepBg.id = "1.30";
      this.deepBg.style.left = "1%";
      this.deepBg.style.top = "13%";
      this.deepBg.style.scale = "1";
    } else if (window.innerHeight > 1.0 * window.innerWidth) {
      this.resource.id = "1.0";
      this.deepBg.id = "1.0";
      this.deepBg.style.left = "5%";
      this.deepBg.style.top = "16.5%";
      this.deepBg.style.scale = "2";
      this.resource.style.left = "2.25%";
      this.resource.style.top = "16.5%";
      this.resource.style.fontSize = "20px";
    } else {
      this.resource.id = "0.0";
      this.deepBg.id = "0.0";
      this.deepBg.style.left = "5%";
      this.deepBg.style.top = "16.5%";
      this.deepBg.style.scale = "2";
      this.resource.style.left = "3.5%";
      this.resource.style.top = "16.5%";
      this.resource.style.fontSize = "20px";
    }
  }
}
