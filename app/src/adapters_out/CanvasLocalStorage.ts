import { CanvasStorage } from "../providers/CanvasStorage";
import { ShapesConfig } from "../providers/CanvasStorage"


export class CanvasLocalStorage extends CanvasStorage {

  save(data: ShapesConfig): void {
    localStorage.setItem(data.name, data);
  }

  load(selectedConfig: number): Config | null {
    return localStorage.getItem(this.storageKey);
  }

  list(): Config[]{
    // todo
  }
}