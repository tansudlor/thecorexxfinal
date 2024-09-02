import { GameElement } from "./GameElement";

export class LaunchPad extends GameElement {
  protected parent: GameElement;

  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.resource = this.LoadTileImage(src, parent.resource);
    GameElement.TransformPivot(this.resource, -50, -50);
  }

  update(): void {
    this.resource.style.backgroundSize = "80%";
    this.resource.style.backgroundPositionX = "50%";
    //GameElement.SetStyle(this.resource, this.X, this.Y, 100, 0);
    //GameElement.SetPostion(this.resource, 50, 50, "%");
  }

  LoadTileImage(path: string, parent: HTMLElement) {
    var img = document.createElement("div");
    img.style.backgroundImage = "url('" + path + "')";
    img.style.backgroundColor = "";
    img.style.width = "100%";
    img.style.height = "80%";
    img.style.position = "absolute";
    img.style.backgroundRepeat = "repeat-x";
    img.style.backgroundSize =
      Math.round(
        GameElement.GameElementColletion["controlArea"].ScaleFactor * 100
      ) + "%";
    parent.appendChild(img);
    return img;
  }
}
