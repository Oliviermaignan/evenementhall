import { CanvasStorage } from "../providers/CanvasStorage";
// import { ShapesConfig } from "../providers/CanvasStorage";


export class CanvasLocalStorage extends CanvasStorage {
  private storageKey = "canvasData";

  constructor(storageKey: string) {
    super();
    this.storageKey = storageKey;
  }

  save(data: Shape[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  load(selectedConfig: string): Config | null {
    let canvasStorage = localStorage.getItem(selectedConfig);
    const parsedCanvasData = JSON.parse(canvasStorage);
    return parsedCanvasData
  }

  list(canvaNumber: number): Config[]{
    let key = localStorage.key(canvaNumber);
    let data = localStorage.getItem(key);
    let canvasLocalStorage = JSON.parse(data)
    return canvasLocalStorage
  }
}

export default CanvasLocalStorage;