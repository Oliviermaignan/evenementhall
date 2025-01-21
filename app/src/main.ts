// Importation des styles et dépendances nécessaires

import { createApp } from 'vue'; // Création d'une application Vue
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue'; // Importation du composant principal
import router from './router'; // Importation du router
import { mdi,aliases} from 'vuetify/iconsets/mdi'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify';
// Ajout des icônes FontAwesome à la bibliothèque
library.add(fas);

// Configuration et création de Vuetify

  const vuetify = createVuetify({components,directives,icons: {
    aliases,sets: {mdi}, defaultSet:'mdi'
  }});
  


// Création de l'application Vue
const app = createApp(App);

// Enregistrement global des composants et plugins
app.component('font-awesome-icon', FontAwesomeIcon); // Enregistrement global de FontAwesome
app.use(router); // Utilisation du router
app.use(vuetify); // Utilisation de Vuetify

// Montage de l'application dans l'élément HTML avec l'ID "app"
app.mount('#app');
