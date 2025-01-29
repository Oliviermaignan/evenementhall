
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Déclarez les variables réactives
  const planName = ref('');
  const message = ref('');
  
  // Déclarez la méthode pour créer un plan

    // Simule la création d'un plan (exemple : appel API)
    message.value = `Le plan "${planName.value}" a été créé avec succès !`;
  
    // Réinitialise le champ de texte
    planName.value = '';
  
  </script>
  
  <style scoped>
  form {
    width: 15rem;
    display: flex;
background-color: #D9D9D9;
border:1px solid black;
    border-radius: 15px;
    padding: 5px;


    align-items: center;
  }

  #button-sauvgarde{
    width: 15rem;
    display: flex;
background-color: #D9D9D9;
border:1px solid black;
    border-radius: 15px;
    padding: 5px;
  }
  textarea {

   
border: none;
background-color: #D9D9D9;

    resize:none; /* Désactiver le redimensionnement */
  }
  
  button  {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #8188AD;
    color: white;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  