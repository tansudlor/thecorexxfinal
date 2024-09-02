import { GameElement } from "./GameElement";
import { Profile } from "./Profile";

export class ResourceUI extends GameElement {
  protected parent: GameElement;
  public BranchQuantity;
  public StoneQuantity;
  public IronQuantity;
  constructor(id: string, src: string = null, parent: GameElement = null) {
    super(id, src, parent);
    this.parent = parent;
    this.ResourceUIDIV();
  }
  update(self: GameElement): void {}
  ResourceUIDIV() {
    let resourceDIV = document.createElement("div");
    resourceDIV.id = "resourceDIV";
    resourceDIV.style.top = "11.8%";
    resourceDIV.style.left = "100%";
    resourceDIV.style.width = "30%";
    resourceDIV.style.height = "15%";
    resourceDIV.style.position = "absolute";
    //resourceDIV.style.backgroundColor = "white";
    GameElement.TransformPivot(resourceDIV, -100, -50);
    this.parent.resource.appendChild(resourceDIV);

    let bracnhImage = document.createElement("img");
    bracnhImage.id = "bracnhImage";
    bracnhImage.src = "./images/Skill/branch.svg";
    bracnhImage.style.top = "50%";
    bracnhImage.style.left = "8%";
    bracnhImage.style.width = "15%";
    bracnhImage.style.height = "auto";
    bracnhImage.style.position = "absolute";
    GameElement.TransformPivot(bracnhImage, -50, -50);
    resourceDIV.appendChild(bracnhImage);

    let bracnhSpan = document.createElement("span");
    bracnhSpan.id = "bracnhImage";
    bracnhSpan.textContent = "0";
    bracnhSpan.style.top = "50%";
    bracnhSpan.style.left = "25%";
    bracnhSpan.style.width = "17.5%";
    bracnhSpan.style.height = "auto";
    bracnhSpan.style.position = "absolute";
    bracnhSpan.style.fontSize = "30px";
    bracnhSpan.style.textAlign = "left";
    bracnhSpan.style.color = "white";
    GameElement.TransformPivot(bracnhSpan, -50, -50);
    this.BranchQuantity = bracnhSpan;
    resourceDIV.appendChild(bracnhSpan);

    let stoneImage = document.createElement("img");
    stoneImage.id = "stoneImage";
    stoneImage.src = "./images/Skill/stone.svg";
    stoneImage.style.top = "50%";
    stoneImage.style.left = "40%";
    stoneImage.style.width = "15%";
    stoneImage.style.height = "auto";
    stoneImage.style.position = "absolute";
    GameElement.TransformPivot(stoneImage, -50, -50);
    resourceDIV.appendChild(stoneImage);

    let stoneSpan = document.createElement("span");
    stoneSpan.id = "stoneSpan";
    stoneSpan.textContent = "0";
    stoneSpan.style.top = "50%";
    stoneSpan.style.left = "57%";
    stoneSpan.style.width = "17.5%";
    stoneSpan.style.height = "auto";
    stoneSpan.style.position = "absolute";
    stoneSpan.style.fontSize = "30px";
    stoneSpan.style.textAlign = "left";
    stoneSpan.style.color = "white";
    GameElement.TransformPivot(stoneSpan, -50, -50);
    resourceDIV.appendChild(stoneSpan);
    this.StoneQuantity = stoneSpan;

    let ironImage = document.createElement("img");
    ironImage.id = "ironImage";
    ironImage.src = "./images/Skill/iron.svg";
    ironImage.style.top = "50%";
    ironImage.style.left = "72%";
    ironImage.style.width = "15%";
    ironImage.style.height = "auto";
    ironImage.style.position = "absolute";
    GameElement.TransformPivot(ironImage, -50, -50);
    resourceDIV.appendChild(ironImage);

    let ironSpan = document.createElement("span");
    ironSpan.id = "ironSpan";
    ironSpan.textContent = "0";
    ironSpan.style.top = "50%";
    ironSpan.style.left = "89%";
    ironSpan.style.width = "17.5%";
    ironSpan.style.height = "auto";
    ironSpan.style.position = "absolute";
    ironSpan.style.fontSize = "30px";
    ironSpan.style.textAlign = "left";
    ironSpan.style.color = "white";
    GameElement.TransformPivot(ironSpan, -50, -50);
    resourceDIV.appendChild(ironSpan);
    this.IronQuantity = ironSpan;
  }
}
