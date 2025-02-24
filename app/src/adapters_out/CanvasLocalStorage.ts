import { CanvasStorage } from "../providers/CanvasStorage";
import { ShapesConfig } from "../providers/CanvasStorage";


export class CanvasLocalStorage extends CanvasStorage {
  private storageKey = "canvasData";

  save(data: ShapesConfig): void {
    localStorage.setItem(this.storageKey, data);
  }

  load(selectedConfig: number): Config | null {
    return localStorage.getItem(this.storageKey);
  }

  list(): Config[]{
    // todo
  }
}