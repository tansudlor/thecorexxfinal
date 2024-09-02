import { GameElement } from "./GameElement";

export class Container extends GameElement {
  protected parent: GameElement;

  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.resource = this.CreateContainer();
    GameElement.TransformPivot(this.resource, -50, -50);
  }

  update(): void {
    GameElement.SetPostion(
      this.resource,
      this.X,
      this.Y,
      "px",
      "absolute",
      true
    );
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
