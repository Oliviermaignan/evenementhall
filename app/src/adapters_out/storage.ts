import { CanvasStorage } from "../providers/CanvasStorage";

export class LocalCanvasStorage extends CanvasStorage {
  private storageKey = "canvasData";

  save(data: string): void {
    localStorage.setItem(this.storageKey, data);
  }

  load(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}