import { GameElement } from "./GameElement";

export class Image extends GameElement {
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.src = src;
    this.resource = this.LoadImage(this.src);
  }
  update(self: GameElement): void {}

  LoadImage(path: string) {
    var img = document.createElement("img");
    img.src = path;
    img.style.width = "10%";
    img.style.height = "10%";
    this.Parent.resource.appendChild(img);
    return img;
  }
}
