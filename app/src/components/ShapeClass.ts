import { CanevasIconName } from './enums';

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
  icon: CanevasIconName;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number, color: string, angle: number, icon: CanevasIconName) {
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
    this.icon = icon;
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

  drawHitBox(context: CanvasRenderingContext2D) {
    if (context) {
      // Calculer la taille du carré (le plus petit côté du rectangle)
      const sideLength = Math.min(this.width, this.height);
      
      // Calculer les coordonnées pour centrer le carré dans le rectangle
      const squareX = this.x + (this.width - sideLength) / 2;
      const squareY = this.y + (this.height - sideLength) / 2;
      
      // Dessiner la hitbox (carré)
      context.save();
      context.strokeStyle = 'yellow';
      context.lineWidth = 1;
      context.strokeRect(squareX, squareY, sideLength, sideLength);
      context.restore();
     
      // Charger et dessiner l'icône
      const icon = new Image();
      icon.src = '/icons/drag_pan.svg';
  
      // Dessiner l'icône une fois qu'elle est chargée
      icon.onload = () => {
        // Calculer la taille et la position de l'icône pour qu'elle soit centrée dans le carré
        const iconSize = sideLength / 2;
        const iconX = squareX + (sideLength - iconSize) / 2;
        const iconY = squareY + (sideLength - iconSize) / 2;
        context.drawImage(icon, iconX, iconY, iconSize, iconSize);
      };
    }
  }

  rotate(angle: number) {
    const angleIncrementInDegrees = angle;
    const angleIncrementInRadians = (angleIncrementInDegrees * Math.PI) / 180;
    this.angle += angleIncrementInRadians; // Add in radians
    this.draw(this.canvas.getContext("2d")!);
    this.drawHitBox(this.canvas.getContext("2d")!);
  }


  draw(context: CanvasRenderingContext2D) {
    // rec de letat
    context.save()
    
    // rotate the canvas center
    context.translate(this.x + this.width/2, this.y + this.height/2 );
    // prise en compte de l'angle
    context.rotate(this.angle * Math.PI / 180);

    // context.fillStyle = this.color;
    // context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    
    if (this.icon){
      const icon = new Image();
      icon.src = '/icons/' + this.icon;
      icon.onload = () => {
        context.drawImage(icon , this.x, this.y, this.width, this.height);
    }
    };


    context.restore()
  }

}
