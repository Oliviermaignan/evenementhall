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

const addShape = (x: number, y: number, width: number, height: number, color: string) => {
  const shape = new Shape(x, y, width, height, color);
  shapes.value.push(shape);
  drawShapes()
};

// Gestion des événements de la souris
const onMouseDown = (event: MouseEvent) => {
  const { offsetX: mouseX, offsetY: mouseY } = event;
  selectedShape.value = shapes.value.find((shape) =>
    shape.isInside(mouseX, mouseY)
  ) || null;

  if (selectedShape.value) {
    selectedShape.value.isDragging = true;
    selectedShape.value.rotate = true;

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
    selectedShape.value = null;
  }
};

const drawShapes = () => {
  if (context.value) {
    context.value.clearRect(0, 0, canvasWidth, canvasHeight); // Efface le canevas
    shapes.value.forEach((shape) => shape.draw(context.value!)); // Redessine chaque forme
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
        <button id="chaise-btn" @click="addShape(0,0,50,50,'green')">ajouter chaise</button>
        <button id="table-btn" @click="addShape(0,0,100,150,'red')">ajouter table</button>
        <button id="rotate-btn" @click="rotate()">Rotation 90°</button>
    </div>

</template>

<style scoped>
canvas{
    border:1px solid black
}
</style>