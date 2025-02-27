<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CanevasIconName } from './enums.ts';
import Shape from './ShapeClass'; // Assurez-vous que cette classe existe et gère correctement les formes.
import Legande from './Legande.vue';
import { LocalStorageProvider } from '../providers/LocalStorageProvider';
import type { DataProvider } from '../providers/DataProvider';
import type { Plan } from '../interface';
import ListPlan from './ListPlan.vue';

// Références pour canvas et context
const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);

// Variables pour gérer les formes
const shapes = ref<Shape[]>([]);
const selectedShape = ref<Shape | null>(null);

// Variables pour le drag-and-drop
const offsetX = ref(0);
const offsetY = ref(0);

// Dimensions du canvas
const canvasWidth = 800;
const canvasHeight = 600;

// Variables réactives pour les plans
const planName = ref('');
const message = ref('');

// Méthode pour créer un plan
const createPlan = () => {
  if (planName.value.trim() === '') {
    alert('Veuillez entrer un nom pour le plan.');
    return;
  }
  message.value = `Le plan "${planName.value}" a été créé avec succès !`;
  planName.value = ''; // Réinitialise le champ de texte
};

// Ajouter une forme
const addShape = (canvas: HTMLCanvasElement, x: number, y: number, angle: number, icon: CanevasIconName) => {
  const shape = new Shape(canvas, x, y, angle, icon);
  shapes.value.push(shape);
  drawShapes();
};

// Gestion des événements de souris pour drag-and-drop
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

// Fonction pour créer un nouvel état
const onCreate = () => {
  console.log('Création en cours...');
  // Logique pour initialiser un nouvel état ou ajouter des éléments
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

  <div>
    <!-- Boutons pour ajouter des formes -->
    <button id="chaise-btn" @click="addShape(0, 0, 50, 50, 'green')">Ajouter une chaise</button>
    <button id="table-btn" @click="addShape(0, 0, 100, 150, 'red')">Ajouter une table</button>
    <button id="rotate-btn" @click="rotate">Rotation 90°</button>
  </div>

  <Legande />
  <div>
    <!-- Boutons supplémentaires -->
    <button @click="onSave">Enregistrer</button>
    <button @click="onCreate">Créer</button>
  </div>
<ListPlan @click="onSelect"></ListPlan>
  
</template>

<style scoped>
canvas {
  border: 1px solid black
}

button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #8188ad;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

form {
  width: 15rem;
  display: flex;
  background-color: #D9D9D9;
  border: 1px solid black;
  border-radius: 15px;
  padding: 5px;
  align-items: center;
}

textarea {
  border: none;
  background-color: #D9D9D9;
  resize: none; /* Désactiver le redimensionnement */
}
</style>
