export default class Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isDragging: boolean;

  constructor(x: number, y: number, width: number, height: number, color: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color
    this.isDragging = false;
  }

  isInside(mouseX: number, mouseY: number): boolean {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }



  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

}
