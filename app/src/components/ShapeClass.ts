import { CanevasIconName } from "./enums";

export default class Shape {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  // width: number;
  // height: number;
  isDragging: boolean;
  angle: number;
  selected: boolean;
  icon: CanevasIconName;
  image: HTMLImageElement | null = null;
  sideLength: number;
    value: any;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    angle: number,
    icon: CanevasIconName
  ) {
    this.x = x;
    this.y = y;
    this.isDragging = false;
    this.angle = angle;
    this.canvas = canvas;
    this.selected = false;
    this.icon = icon;
    if (this.icon) {
      this.loadIcon();
    }
    this.sideLength = Math.min(this.image.naturalWidth, this.image.naturalHeight);
    // this.width = width;
    // this.height = height;
  }

  private loadIcon(): void {
    this.image = new Image();
    this.image.src = `/icons/${this.icon}`;
    this.image.onload = () => {
      console.log("Icon loaded:", this.icon);
    };
  }

  // prendre en compte la rotation
  isInside(mouseX: number, mouseY: number): boolean {
    console.log(this.image.naturalWidth);
    console.log(this.sideLength);
    if (!this.image) return false;

    const squareX = this.x + (this.image.naturalWidth - this.sideLength) / 2;
    const squareY = this.y + (this.image.naturalHeight - this.sideLength) / 2;

    return (
      mouseX >= squareX &&
      mouseX <= squareX + this.sideLength &&
      mouseY >= squareY &&
      mouseY <= squareY + this.sideLength
    );
  }

  drawHitBox(context: CanvasRenderingContext2D) {
    if (context) {

      // Calculer les coordonnées pour centrer le carré dans le rectangle
      const squareX = this.x + (this.image.naturalWidth - this.sideLength) / 2;
      const squareY = this.y + (this.image.naturalHeight - this.sideLength) / 2;

      // Dessiner la hitbox (carré)
      context.save();
      context.strokeStyle = "yellow";
      context.lineWidth = 1;
      context.strokeRect(squareX, squareY, this.sideLength, this.sideLength);
      context.restore();

      // Charger et dessiner l'icône
      const icon = new Image();
      icon.src = "/icons/drag_pan.svg";

      // Dessiner l'icône une fois qu'elle est chargée
      icon.onload = () => {
        // Calculer la taille et la position de l'icône pour qu'elle soit centrée dans le carré
        const iconSize = this.sideLength / 2;
        const iconX = squareX + (this.sideLength - iconSize) / 2;
        const iconY = squareY + (this.sideLength - iconSize) / 2;
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

  draw(context: CanvasRenderingContext2D): HTMLImageElement | undefined {
    // rec de letat
    context.save();

    // rotate the canvas center
    context.translate(
      this.x + this.image.naturalWidth / 2,
      this.y + this.image.naturalHeight / 2
    );
    // prise en compte de l'angle
    context.rotate((this.angle * Math.PI) / 180);

    // context.fillStyle = this.color;
    // context.fillRect(-this.width/2, -this.height/2, this.width, this.height);

    // if (this.icon) {
    //   const icon = new Image();
    //   icon.src = "/icons/" + this.icon;
    if (this.image && this.image.complete) {
      context.drawImage(
        this.image,
        -this.image.naturalWidth / 2,
        -this.image.naturalHeight / 2,
        this.image.naturalWidth,
        this.image.naturalHeight
      );
    }

    // return icon;

    context.restore();
  }
}
