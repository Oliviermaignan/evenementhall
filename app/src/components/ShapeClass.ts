export default class Shape {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isDragging: boolean;
  angle: number;
  selected: boolean;
  sideLength: number;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number, color: string, angle: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isDragging = false;
    this.angle = angle;
    this.canvas = canvas;
    this.selected = false;
    this.sideLength = Math.max(this.width, this.height);
  }

  // prendre en compte la rotation
  isInside(mouseX: number, mouseY: number): boolean {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.sideLength &&
      mouseY >= this.y &&
      mouseY <= this.y + this.sideLength
    );
  }
  // isInside(canvas: HTMLCanvasElement, mouseX: number, mouseY: number): boolean {
    
  //   const sideLength = Math.max(this.width, this.height);
    
  //   const squareX = this.x - (sideLength - this.width) / 2;
  //   const squareY = this.y - (sideLength - this.height) / 2;
    
  //   this.drawHitBox(squareX, squareY, canvas);
  //   return (
  //     mouseX >= squareX &&
  //     mouseX <= squareX + sideLength &&
  //     mouseY >= squareY &&
  //     mouseY <= squareY + sideLength
  //   );
  // }

  drawHitBox(context: CanvasRenderingContext2D) {
    console.log(this.sideLength);
    
    if (context){
      context.save();
      context.strokeStyle = 'yellow';
      context.lineWidth = 2;
      context.strokeRect(this.x,this.y, this.sideLength, this.sideLength);
      context.restore();
    }
  }

  rotate(angle: number) {
    const angleIncrementInDegrees = angle;
    const angleIncrementInRadians = (angleIncrementInDegrees * Math.PI) / 180;
    this.angle += angleIncrementInRadians; // Add in radians
    this.drawHitBox(this.canvas.getContext("2d")!);
    this.draw(this.canvas.getContext("2d")!);
  }


  draw(context: CanvasRenderingContext2D) {
    // rec de letat
    context.save()
    
    // rotate the canvas center
    context.translate(this.x + this.width/2, this.y + this.height/2 );
    // prise en compte de l'angle
    context.rotate(this.angle * Math.PI / 180);

    context.fillStyle = this.color;
    context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    
    context.restore()
  }

}
