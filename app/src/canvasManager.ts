import { CanvasStorage } from "./providers/CanvasStorage";
import Shape from "./components/ShapeClass";

class CanvasManager {
  private canvasStorage: CanvasStorage;
  private shapes: Shape[];

  constructor() {
    this.canvasStorage = new CanvasStorage();
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
}

export default CanvasManager;
