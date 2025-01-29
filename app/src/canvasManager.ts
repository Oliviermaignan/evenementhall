import { CanvasStorage } from "./providers/CanvasStorage";
import { Shape } from "components/ShapeClass";
import { drawShapes } from "./canvas_renderer";

const canvasStorage = new LocalCanvasStorage();
let shapes: Shape[] = [];

export function saveShapes() {
  canvasStorage.save(JSON.stringify(shapes));
}

export function loadShapes() {
  const data = canvasStorage.load();
  if (data) {
    shapes = JSON.parse(data);
    drawShapes(shapes);
  }
}

export function addShape(shape: Shape) {
  shapes.push(shape);
  drawShapes(shapes);
  saveShapes();
}

export function getShapes(): Shape[] {
  return shapes;
}
