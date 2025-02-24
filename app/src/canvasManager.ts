import { LocalCanvasStorage } from "./adapters_out/CanvasLocalStorage";
import Shape from "./components/ShapeClass";

export default class CanvasManager {
  private localCanvasStorage: LocalCanvasStorage;
  private shapes: Shape[];

  constructor(canvasStorage: CanvasStorage) {
    this.canvasStorage = canvasStorage;
    this.shapes = [];
  }

  saveShapes(): void {
    this.canvasStorage.save(JSON.stringify(this.shapes));
  }

  loadShapes(): void {
    const data = this.canvasStorage.load();
    if (data) {
      this.shapes = JSON.parse(data);
      this.drawShapes();
    }
  }

  getShapes(): Shape[] {
    return this.shapes;
  }

  addShape(shape: Shape): void {
    this.shapes.push(shape);
    console.log(this.shapes);
  }

  updateShapePosition(id: number, newX: number, newY: number): void {
    const shape = this.shapes.find(s => s.id === id);
    if (shape) {
      this.saveShapes();
    }
  }

}
