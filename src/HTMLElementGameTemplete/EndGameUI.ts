import API from "./API";
import { GameElement } from "./GameElement";
import { Profile } from "./Profile";

export class EndGameUI extends GameElement {
  protected parent: GameElement;
  public EndGameDiv;
  public EndGameFar;
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
    this.EndGame();
  }

  EndGame() {
    let endGameDiv = document.createElement("div");
    endGameDiv.id = this.id;
    endGameDiv.style.left = "50%";
    endGameDiv.style.top = "50%";
    endGameDiv.style.width = "40%";
    endGameDiv.style.height = "35%";
    endGameDiv.style.position = "fixed";
    endGameDiv.style.zIndex = "2";
    GameElement.TransformPivot(endGameDiv, -50, -50);
    this.parent.resource.appendChild(endGameDiv);
    this.EndGameDiv = endGameDiv;

    let endGamebg = document.createElement("img");
    endGamebg.id = "endGamebg";
    endGamebg.src = "./images/upgrageItembg.svg";
    endGamebg.style.width = "100%";
    endGamebg.style.height = "100%";
    endGamebg.style.objectFit = "cover";
    endGameDiv.appendChild(endGamebg);

    let endGameSpan = document.createElement("span");
    endGameSpan.textContent = "Game Over";
    endGameSpan.style.fontSize = "30px";
    endGameSpan.style.alignContent = "left";
    endGameSpan.style.top = "10%";
    endGameSpan.style.left = "50%";
    endGameSpan.style.position = "absolute";
    GameElement.TransformPivot(endGameSpan, -50, -50);
    endGameDiv.appendChild(endGameSpan);

    let endGameHowFar = document.createElement("span");
    endGameHowFar.id = "endGameHowFar";
    endGameHowFar.textContent = "How Deep You Drill";
    endGameHowFar.style.fontSize = "40px";
    endGameHowFar.style.top = "25%";
    endGameHowFar.style.left = "50%";
    endGameHowFar.style.width = "100%";
    endGameHowFar.style.position = "fixed";
    endGameHowFar.style.textAlign = "center";
    GameElement.TransformPivot(endGameHowFar, -50, -50);
    endGameDiv.appendChild(endGameHowFar);

    let endGameFar = document.createElement("span");
    endGameFar.id = "endGameHowFar";
    endGameFar.textContent = "3000 mile";
    endGameFar.style.fontSize = "30px";
    endGameFar.style.top = "45%";
    endGameFar.style.left = "50%";
    endGameFar.style.position = "absolute";
    GameElement.TransformPivot(endGameFar, -50, -50);
    endGameDiv.appendChild(endGameFar);
    this.EndGameFar = endGameFar;

    let refreshGame = document.createElement("img");
    refreshGame.id = "refreshGame";
    refreshGame.src = "./images/startbutton.svg";
    refreshGame.style.top = "80%";
    refreshGame.style.left = "50%";
    refreshGame.style.width = "25%";
    refreshGame.style.height = "auto";
    refreshGame.style.position = "absolute";
    GameElement.TransformPivot(refreshGame, -50, -50);

    endGameDiv.appendChild(refreshGame);

    refreshGame.addEventListener("click", () => {
      if (refreshGame.style.opacity == "0.5") return;
      refreshGame.style.opacity = "0.5";
      const data = {
        resource: Profile.Data.resource,
        upgrade: Profile.Data.upgrade,
      };

      API.SendUpgrade(data)
        .then((response) => {
          console.log("Success:", response);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Request failed:", error);
          refreshGame.style.opacity = "1";
        });
    });
  }
}
