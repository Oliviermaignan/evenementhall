<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import CanvaComponent from './components/CanvaComponent.vue';
import Button from './components/Button.vue'
// Importation des dépendances nécessaires
import { RouterView } from 'vue-router';
import Legande from './components/Legande.vue';
import CreationNomPlan from './components/CreationNomPlan.vue';
import ListPlan from './components/ListPlan.vue';
import HistoriqueObject from './components/historiqueObject.vue';


function onSave() {
  console.log('save')
}
function onCreate() {}
</script>

<template>

  <header>
    <nav class="navbar navbar-expand">
      <!-- La barre de navigation -->
      <div class="navbar-container">
        <!-- Titre de la navbar -->
        <span class="navbar-title">Evenement Hall</span>

        <!-- Liens de la navbar -->
        <div class="navbar-nav ms-auto">
          <p class="nav-item"></p>
            <h4>Create Your Own Space</h4>
          
        </div>
      </div>
    </nav>
  </header>
 <CreationNomPlan></CreationNomPlan>

  <main>
    <RouterView />



  </main>
</template>

<style scoped>
/* Styles pour le header */
header {
  background-color: #94778B; /* Couleur d'arrière-plan */
  width: 100%;
display: flex;
}
.navbar {
  width: 100%; /* Prendre toute la largeur de la page */
  padding: 1rem 0; /* Espacement vertical */

}

.navbar-container {
  display: flex;
  justify-content: space-between; /* Espacement entre les éléments */
  align-items: center; /* Centrer verticalement */
  width: 100%; /* Assurer la largeur totale */
  padding: 0 2rem; /* Espacement horizontal */
  max-width: 1200px; /* Constrain content width */
  margin: 0 auto; /* Centrer la navbar */
  box-sizing: border-box; /* Inclure le padding dans les dimensions */
}

.navbar-title {
  font-size: 1.8rem; /* Taille du texte légèrement augmentée */
  font-weight: bold; /* Texte en gras */
  color: #F4F1DE; /* Couleur contrastée */
  text-transform: uppercase; /* Texte en majuscules pour l'élégance */
  letter-spacing: 1.5px; /* Espacement entre les lettres */
}

.nav-item h1 {
  font-size: 1.5rem; /* Taille plus grande */
  color: #F4F1DE; /* Couleur du texte */
  margin: 0; /* Supprimer les marges par défaut */
  text-align: right; /* Aligner à droite */
  font-weight: 500; /* Légèrement moins épais que le titre */
  text-transform: capitalize; /* Texte avec majuscule initiale */
}

.navbar-nav {
  display: flex;
  align-items: center; /* Centrer verticalement les liens */
}

.nav-item {
  margin-left: 2rem; /* Espacement généreux entre les éléments */
}

h4 {
  margin: 0;
}

/* Au survol : Ajout d'une animation douce */
.nav-item:hover {
  transform: scale(1.05); /* Légère mise en avant */
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.9; /* Réduction légère de l'opacité */
}

/* Adaptation pour les petits écrans */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column; /* Stacking the elements vertically */
    align-items: center; /* Centrer les éléments */
    text-align: center;
  }

  .navbar-title {
    margin-bottom: 1rem; /* Espacement sous le titre */
  }

  .nav-item h4 {
    font-size: 1.2rem; /* Réduction de la taille du texte */
  }
}
</style>
