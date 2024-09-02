import { GameElement } from "./GameElement";

export class UIContainer extends GameElement {
  protected parent: GameElement;

  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.resource = this.CreateContainer();

    GameElement.ClearTransform(this.resource);
    GameElement.TransformPivot(this.resource, 0, 0);
  }

  update(): void {
    GameElement.SetPostion(this.resource, this.X, 0, "%", "fixed");
  }

  CreateContainer() {
    var con = document.createElement("div");
    con.id = this.id;
    con.style.width = "100%";
    con.style.height = "100%";
    con.style.position = "fixed";
    if (this.Parent == null) {
      document.body.appendChild(con);
    } else {
      this.Parent.resource.appendChild(con);
    }

    return con;
  }
}
