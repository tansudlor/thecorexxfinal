import { GameElement } from "./GameElement";
import { UIContainer } from "./UIContainer";

export class UpgradeUIContainer extends UIContainer {
  public UpgradePage;
  constructor(id: string, src: string, parent: GameElement) {
    super(id, src, parent);
    //this.UpgradeUiButton();
    //this.UpgradeUI();
  }

  UpgradeUiButton() {
    let upgrade = document.createElement("img");
    upgrade.src = "/start.svg";
    upgrade.id = this.id;

    if (window.innerHeight > window.innerWidth) {
      upgrade.style.top = "10%";
      upgrade.style.left = "80%";
      upgrade.style.width = "30%";
      upgrade.style.height = "10%";
    } else {
      upgrade.style.top = "10%";
      upgrade.style.left = "90%";
      upgrade.style.width = "10%";
      upgrade.style.height = "10%";
    }
    upgrade.style.position = "absolute";
    GameElement.TransformPivot(upgrade, -50, -50);
    this.Parent.resource.appendChild(upgrade);
  }

  UpgradeUI() {
    let upgradePage = document.createElement("div");
    upgradePage.id = "UpgradePage";
    upgradePage.style.top = "50%";
    upgradePage.style.left = "50%";
    upgradePage.style.position = "absolute";
    upgradePage.style.width = "100%";
    upgradePage.style.height = "100%";
    upgradePage.style.backgroundColor = "yellow";
    upgradePage.style.opacity = "0.5";
    GameElement.TransformPivot(upgradePage, -50, -50);
    this.Parent.resource.appendChild(upgradePage);
    this.UpgradePage = upgradePage;
    this.UpgradePage.style.display = "none";
  }
}
