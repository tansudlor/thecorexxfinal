import { Image } from "./Image";
import { GameElement } from "./GameElement";
export class Player extends Image {
  public Speed: number = 0;

  start(): void {
    //GameElement.SetStyle(this.resource, this.X, this.Y, 100, 0);
    this.resource.style.width = "15%";
    this.resource.style.height = "15%";
    this.X = 0;
    this.Y = GameElement.GameElementColletion["controlArea"].Height / 2;
    console.log(" this.Y" + this.Y);
    GameElement.SetPostion(
      this.resource,
      this.X,
      this.Y,
      "px",
      "absolute",
      true
    );
    GameElement.TransformPivot(this.resource, -50, -50);
    //this.resource.style.zIndex = "9";
  }

  update(self): void {
    GameElement.ClearTransform(this.resource);
    GameElement.TransformPivot(this.resource, -50, -50);
    GameElement.TransformAngle(this.resource, this.Angle);
    GameElement.SetPostion(
      this.resource,
      this.X,
      this.Y,
      "px",
      "absolute",
      true
    );

    super.update(self);
  }
}
