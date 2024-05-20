import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue'
import Home from '../pages/Home.vue';
import CharacterPage from '../pages/Character.vue';
import Episode from '../pages/Episode.vue';
import Location from '../pages/Location.vue';

const routes = [{
  path: '/',
  component: Layout,
  children: [
  { path: '/', name: 'Home', component: Home },
  { path: '/character/:id',name: 'Character', component: CharacterPage, props: true },
  { path: '/episode/:id', name: 'Episode', component: Episode, props: true },
  { path: '/location/:id', name: 'Location', component: Location, props: true  }
]
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

