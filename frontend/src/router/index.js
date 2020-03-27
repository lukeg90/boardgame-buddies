import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Session from '../views/Session.vue'
import Players from '../views/Players.vue'
import Player from '../views/Player.vue'
import Sessions from '../views/Sessions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/session/all',
    name: 'sessions',
    component: Sessions
  },
  {
    path: '/session/:id',
    name: 'session',
    component: Session
  },
  {
    path: '/player',
    name: 'players',
    component: Players
  },
  {
    path: '/player/:id',
    name: 'player',
    component: Player
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
