<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CanevasIconName } from './enums.ts';
import { CanvasLocalStorage } from '../adapters_out/CanvasLocalStorage.ts'
import Shape from './ShapeClass'; 
import { CanvasStorage } from '../providers/CanvasStorage.ts';
// import CanvasManager from '../canvasManager.ts';

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const shapes = ref<Shape[]>([]);
const selectedShape = ref<Shape | null>(null);
const offsetX = ref(0);
const offsetY = ref(0);
const canvasWidth = 800;
const canvasHeight = 600;
const loadedShapeNumber = ref();
// const canvasLocalStorage = new CanvasLocalStorage()

const storageKey: Ref<string> = ref("");

const addShape = (icon: CanevasIconName) => {
  const shape = new Shape(canvas, 0, 0, 0, icon);
  shapes.value.push(shape);
  // canvasManager.addShape(shape)
  drawShapes()
};

function saveShapesConfig(){
  const canvasStorage = new CanvasLocalStorage(storageKey.value);
  if (!shapes){
    return
  }
  canvasStorage.save(shapes.value)
  console.log(`Données sauvegardées sous la clé: ${storageKey.value}`);
}

const cleanShapesConfig = () => {
  //efface le canva
  shapes.value = [];
  if (context.value) {
    context.value.clearRect(0, 0, canvasWidth, canvasHeight);
  }
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

    // canvasManager.updateShapePosition(selectedShape.value.id ,newX, newY)
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

const getThisCanvas = (loadedShapeNumber :number) => {
  const canvasLocalStorage = new CanvasLocalStorage()
  const array = canvasLocalStorage.load(loadedShapeNumber)
  console.log(array);
  array.forEach(loadedShape => {
    const shape = new Shape(canvas, loadedShape.x, loadedShape.y, loadedShape.angle, loadedShape.icon);
    shapes.value.push(shape);
    drawShapes()
  });
}

onMounted(()=>{
    if (canvas.value) {
        context.value = canvas.value.getContext('2d');
        // console.log(shapes);
        
  } else {
    return
  }
})
</script>

<template>
  <div class="canva-container">
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mousemove="onMouseMove"
      @mouseup="onMouseUp">
    </canvas>

  </div>
  <div class="button-container">
    <div class="marginY">      
      <button id="chaise-btn" @click="addShape(CanevasIconName.Chaise)">ajouter chaise</button>
      <button id="table-btn" @click="addShape(CanevasIconName.Table)">ajouter
        table</button>
      <button id="deco-btn" @click="addShape(CanevasIconName.Déco)">ajouter décoration</button>
      <button id="deco-btn" @click="addShape(CanevasIconName.PorteManteau)">ajouter porte manteau</button>
    </div>
    <div class="marginY">
      <button id="rotate-btn" @click="rotate(90)">Rotation 90°</button>
    </div>
    <div class="marginY">
      <input v-model="storageKey" placeholder="Nom de la sauvegarde" />
      <button id="rotate-btn" @click="saveShapesConfig">Sauvegarder espace</button>
    </div>
    <div class="marginY">
      <button @click="cleanShapesConfig">Vider l'espace</button>
    </div>
    <div class="relative inline-block marginY">
      <input type="text" minlength="1" v-model="loadedShapeNumber">
      <button @click="getThisCanvas">
        Charger le canvas
      </button>
    </div>
  </div>

</template>

<style scoped>
canvas {
  border: 1px solid black
}
button, input{
  height: 30px;
}
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
}
.marginY {
  margin: 10px 0;
}
.canva-container{
  display:flex;
  justify-content: center;
}
</style>