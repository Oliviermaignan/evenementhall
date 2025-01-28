<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Shape from './ShapeClass'; 

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const shapes = ref<Shape[]>([]);
const selectedShape = ref<Shape | null>(null);
const offsetX = ref(0);
const offsetY = ref(0);

const canvasWidth = 800;
const canvasHeight = 600;

const addShape = (canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number, color: string, angle: number) => {
  console.log(color);
  
  const shape = new Shape(canvas, x, y, width, height, color, angle);
  shapes.value.push(shape);
  drawShapes()
};

// Gestion des événements de la souris
const onMouseDown = (event: MouseEvent) => {
  const { offsetX: mouseX, offsetY: mouseY } = event;
  selectedShape.value = shapes.value.find((shape) =>
    shape.isInside(mouseX, mouseY),
  ) || null;
  
  if (selectedShape.value) {
    console.log('Shape selected:', selectedShape.value);
    selectedShape.value.isDragging = true;
    selectedShape.value.selected = true;

    offsetX.value = mouseX - selectedShape.value.x;
    offsetY.value = mouseY - selectedShape.value.y;
  }
};

const onMouseMove = (event: MouseEvent) => {
  if (selectedShape.value && selectedShape.value.isDragging) {
    const { offsetX: mouseX, offsetY: mouseY } = event;

    // Calcule la nouvelle position
    let newX = mouseX - offsetX.value;
    let newY = mouseY - offsetY.value;

    // contraint avec la taille du canva
    newX = Math.max(0, Math.min(canvasWidth - selectedShape.value.width, newX));
    newY = Math.max(0, Math.min(canvasHeight - selectedShape.value.height, newY));

    // update
    selectedShape.value.x = newX;
    selectedShape.value.y = newY;

    drawShapes();
  }
};

const onMouseUp = () => {
  if (selectedShape.value) {
    selectedShape.value.isDragging = false;
    // selectedShape.value = null;
  }
};

const drawShapes = () => {
  if (!context.value) return 
    // efface
  context.value.clearRect(0, 0, canvasWidth, canvasHeight); 
    
  shapes.value.forEach((shape) => {
    shape.drawHitBox(context.value)
    shape.draw(context.value)}
  
  );
  
};

const rotate = (angle) => {
  if (!context.value) return 

  if (selectedShape.value?.selected) {
    console.log('oui la rotation');
    
    context.value.clearRect(0, 0, canvasWidth, canvasHeight); 
    selectedShape.value.angle += angle
    shapes.value.forEach((shape) => {
      shape.drawHitBox(context.value)
      shape.draw(context.value)
    });
    selectedShape.value.selected = false;
    selectedShape.value = null;
  }  
};


onMounted(()=>{
    if (canvas.value) {
        context.value = canvas.value.getContext('2d');
        console.log(shapes);
        
  } else {
    return
  }
})
</script>

<template>
    <div>
        <p>this is my rectangle</p>
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown"
            @mousemove="onMouseMove" @mouseup="onMouseUp">
        </canvas>
    </div>
    <div>
        <button id="chaise-btn" @click="addShape(canvas, 0,0,50,50,'green', 0)">ajouter chaise</button>
        <button id="table-btn" @click="addShape(canvas, 0,0,100,150,'red', 0)">ajouter table</button>
        <button id="rotate-btn" @click="rotate(90)">Rotation 90°</button>
    </div>

</template>

<style scoped>
canvas{
    border:1px solid black
}
</style>