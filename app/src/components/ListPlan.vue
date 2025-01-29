<script setup lang="ts">
import type { Plan } from '../interface';
import { CanevasIconName } from './enums';
import Shape from './ShapeClass';
import { ref } from 'vue';

// Création d'un canevas pour les formes
const demoCanvas = document.createElement("canvas");

// Définition des plans
const planOne: Plan = {
  name: 'plan test',
  planData: [
    new Shape(demoCanvas, 10, 12, 90, CanevasIconName.Chaise),
    new Shape(demoCanvas, 30, 50, 60, CanevasIconName.Table),
  ],
};

const planTwo: Plan = {
  name: 'plan2',
  planData: [
    new Shape(demoCanvas, 12, 12, 90, CanevasIconName.PorteManteau),
    new Shape(demoCanvas, 30, 40, 60, CanevasIconName.Table),
  ],
};

const saveConfigurations = [planOne, planTwo];

// État pour stocker le plan sélectionné
const selectedPlan = ref<Plan | null>(null);

// Émetteur d'événements
const emits = defineEmits(['onSelect']);

// Fonction appelée lors du clic sur un plan
function onSelectPlan(plan: Plan) {
  selectedPlan.value = plan; // Mise à jour du plan sélectionné
  emits('onSelect', plan); // Émission de l'événement avec le plan sélectionné
}
</script>

<template>
  <div>
    <!-- Liste des plans -->
    <ul>
      <li v-for="plan in saveConfigurations" :key="plan.name">
        <div>
          <strong>{{ plan.name }}</strong>
          <button @click="onSelectPlan(plan)">Afficher</button>
        </div>
      </li>
    </ul>

    <!-- Affichage des détails du plan sélectionné -->
    <div v-if="selectedPlan">
      <h2>Détails du plan : {{ selectedPlan.name }}</h2>
      <ul>
        <li v-for="(shape, index) in selectedPlan.planData" :key="index">
          Type : {{ shape.icon }}, Position : ({{ shape.x }}, {{ shape.y }})
        </li>
      </ul>
    </div>
  </div>
</template>
