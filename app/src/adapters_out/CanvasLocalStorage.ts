import { CanvasStorage } from "../providers/CanvasStorage";
// import { ShapesConfig } from "../providers/CanvasStorage";


export class CanvasLocalStorage extends CanvasStorage {
  private storageKey = "canvasData";

  save(data: Shape[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  load(selectedConfig: number): Config | null {
    return localStorage.getItem(this.storageKey);
  }

  list(): Config[]{
    return localStorage.getItem(this.storageKey);
  }
}

export default CanvasLocalStorage;