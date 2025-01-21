import { createMemoryHistory, createRouter } from 'vue-router';



import HelloWorld from '../components/HelloWorld.vue'
import CanvaComponent from '../components/CanvaComponent.vue'
import LandingView from '../views/LandingView.vue'

const routes = [
  { path: '/helloworld', component: HelloWorld },
  { path: '/', component: LandingView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router