import { GameElement } from "./GameElement";

export class FuelRemainUI extends GameElement {
  protected parent: GameElement;
  public FontSize: string = "20px";
  public XPivot: number = -50;
  public YPivot: number = -50;
  public TextColor: string = "white";
  public FuelRemainBar;
  private fuelBar;
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
    let scoreText = GameElement.SetText(
      "Fuel",
      20,
      "Fuel",
      -0,
      -0,
      3.5,
      22,
      parent.resource,
      "white"
    );
    this.resource = scoreText;

    let fuelbar = document.createElement("img");
    fuelbar.src = "./images/FuelBar.svg";
    GameElement.TransformPivot(fuelbar, 0, 0);
    GameElement.SetPostion(fuelbar, 7, 18, "%");
    this.parent.resource.appendChild(fuelbar);
    this.fuelBar = fuelbar;
    let fuelRemainBar = document.createElement("img");
    fuelRemainBar.src = "./images/FuelRemainBar.svg";
    GameElement.TransformPivot(fuelRemainBar, 0, 0);
    GameElement.SetPostion(fuelRemainBar, 7.1, 18.23, "%");
    this.parent.resource.appendChild(fuelRemainBar);
    this.FuelRemainBar = fuelRemainBar;
  }

  update(self: GameElement): void {
    if (window.innerHeight > 1.3 * window.innerWidth) {
      this.resource.id = "1.30";
      this.resource.style.left = "3%";
      this.resource.style.top = "17.6%";
      this.resource.style.fontSize = "12px";
      this.fuelBar.style.left = "3.7%";
      this.fuelBar.style.top = "16.8%";
      this.fuelBar.style.scale = "0.5";
      this.FuelRemainBar.style.scale = "0.5";
      this.FuelRemainBar.style.left = "4%";
      this.FuelRemainBar.style.top = "17.1%";
    } else if (window.innerHeight > 1.0 * window.innerWidth) {
      this.resource.id = "1.0";
      this.resource.style.left = "2.25%";
      this.resource.style.top = "22%";
      this.resource.style.fontSize = "20px";
      this.fuelBar.style.left = "6.7%";
      this.fuelBar.style.top = "22%";
      this.FuelRemainBar.style.left = "6.8%";
      this.FuelRemainBar.style.top = "22.3%";
      this.fuelBar.style.scale = "1";
      this.FuelRemainBar.style.scale = "1";
    } else {
      this.resource.id = "0.0";
      this.resource.style.left = "3.5%";
      this.resource.style.top = "22%";
      this.resource.style.fontSize = "20px";
      this.fuelBar.style.left = "6.7%";
      this.fuelBar.style.top = "22%";
      this.FuelRemainBar.style.left = "6.8%";
      this.FuelRemainBar.style.top = "22.3%";
      this.fuelBar.style.scale = "1";
      this.FuelRemainBar.style.scale = "1";
    }
  }
}
