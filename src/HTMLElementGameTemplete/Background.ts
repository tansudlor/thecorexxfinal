import { GameElement } from "./GameElement";

export class Background extends GameElement {
  protected parent: GameElement;

  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.resource = Background.LoadTileImage(src, parent.resource);
    GameElement.TransformPivot(this.resource, -50, -50);
  }

  update(): void {
    this.resource.style.backgroundSize = "5%";
    this.resource.style.backgroundPosition =
      -this.X * GameElement.GameElementColletion["controlArea"].ScaleFactor +
      "px " +
      -this.Y * GameElement.GameElementColletion["controlArea"].ScaleFactor +
      "px";
    //GameElement.SetStyle(this.resource, this.X, this.Y, 100, 0);

    GameElement.SetPostion(this.resource, this.X, this.Y);
  }

  static LoadTileImage(path: string, parent: HTMLElement) {
    var img = document.createElement("div");
    img.style.backgroundImage = "url('" + path + "')";
    img.style.backgroundColor = "#FFAA00";
    img.style.width = "500%";
    img.style.height = "500%";
    img.style.position = "absolute";
    img.style.backgroundRepeat = "repeat";
    img.style.backgroundSize =
      Math.round(
        GameElement.GameElementColletion["controlArea"].ScaleFactor * 100
      ) + "%";
    // img.style.opacity = "0";
    parent.appendChild(img);
    return img;
  }
}
