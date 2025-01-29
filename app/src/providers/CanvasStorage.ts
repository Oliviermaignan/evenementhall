export abstract class CanvasStorage {
    abstract save(data: string): void;
    abstract load(): string | null;
  }
  