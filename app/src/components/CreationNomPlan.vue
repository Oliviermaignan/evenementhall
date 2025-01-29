<script setup lang="ts">
import { ref } from 'vue';
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
</script>
<template>
    <form id="button-sauvgarde" @submit.prevent="createPlan">
        <textarea v-model="planName" placeholder="Veuillez choisir un nom de Plan" name="planName"></textarea>
        <button id="button-sauvegarde" type="submit">Valider</button>
    </form>
    <p v-if="message" style="color: green;">{{ message }}</p>
</template>

<style scoped>

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