import { Player } from "./Player";
import { GameController } from "./GameController";
import { GameElement } from "./GameElement";
import { Image } from "./Image";
import { Profile } from "./Profile";

export class Item extends Image {
  public Player: Player;
  public Score;
  public GameController: GameController;
  public ItemType;
  start(): void {
    //GameElement.SetStyle(this.resource, this.X + 50, this.Y, 150, 0);

    GameElement.TransformPivot(this.resource, -50, -50);
    GameElement.SetPostion(
      this.resource,
      this.X,
      this.Y,
      "px",
      "absolute",
      true
    );
  }

  update(self): void {
    GameElement.SetPostion(
      this.resource,
      this.X,
      this.Y,
      "px",
      "absolute",
      true
    );
    if (
      this.areCirclesColliding(
        this.Player.X,
        this.Player.Y,
        60,
        this.X,
        this.Y,
        60
      )
    ) {
      //console.log(this.ItemType);
      this.resource.remove();
      if (this.ItemType == "oil") {
        this.GameController.Fuel += 10;
      } else {
        Profile.Data.resource[this.ItemType] += 1;
      }
      this.destroy();
    }

    if (
      this.Y - this.Player.Y <
      -GameElement.GameElementColletion["controlArea"].Height * 2
    ) {
      //console.log("removeitem");
      this.resource.remove();
      this.destroy();
    }
    super.update(self);
  }

  areCirclesColliding(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): boolean {
    const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distance < r1 + r2;
  }
}
