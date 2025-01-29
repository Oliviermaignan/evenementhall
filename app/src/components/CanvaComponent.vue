<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CanevasIconName } from './enums.ts';
import { CanevasStorage } from '../providers/CanvasStorage.ts'
import Shape from './ShapeClass'; 
import CanvasManager from '../canvasManager.ts';


const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const shapes = ref<Shape[]>([]);
const selectedShape = ref<Shape | null>(null);
const offsetX = ref(0);
const offsetY = ref(0);
const canvasWidth = 800;
const canvasHeight = 600;
const canvasManager = new CanvasManager()

const addShape = (canvas: HTMLCanvasElement, x: number, y: number, angle: number, icon: CanevasIconName) => {
  const shape = new Shape(canvas, x, y, angle, icon);
  shapes.value.push(shape);
  canvasManager.addShape(shape)
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
  } else {
    console.log('no shape selected');
    
  }
};

const onMouseMove = (event: MouseEvent) => {
  if (selectedShape.value && selectedShape.value.isDragging) {
    const { offsetX: mouseX, offsetY: mouseY } = event;

    // Calcule la nouvelle position
    let newX = mouseX - offsetX.value;
    let newY = mouseY - offsetY.value;

    // contraint avec la taille du canva
    newX = Math.max(0, Math.min(canvasWidth - selectedShape.value.image?.naturalWidth, newX));
    newY = Math.max(0, Math.min(canvasHeight - selectedShape.value.image?.naturalHeight, newY));

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
    shape.draw(context.value)
    shape.drawHitBox(context.value)
  }
  
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
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mousemove="onMouseMove"
      @mouseup="onMouseUp">
    </canvas>
  </div>
  <div>
    <button id="chaise-btn" @click="addShape(canvas, 0,0,0,CanevasIconName.Chaise)">ajouter chaise</button>
    <button id="table-btn" @click="addShape(canvas, 0,0, 0, CanevasIconName.Table)">ajouter
      table</button>
    <button id="deco-btn" @click="addShape(canvas, 0,0, 0, CanevasIconName.Déco)">ajouter décoration</button>
    <button id="deco-btn" @click="addShape(canvas, 0,0, 0, CanevasIconName.PorteManteau)">ajouter porte manteau</button>
    <button id="rotate-btn" @click="rotate(90)">Rotation 90°</button>
  </div>

</template>

<style scoped>
canvas {
  border: 1px solid black
}
</style>