import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HomeComponent'
import LenguajeComponent from '@/components/lenguaje/LenguajeComponent'
import LenguajeFacilComponent from '@/components/lenguaje/LenguajeFacilComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeComponent',
      component: HomeComponent
    },
    {
      path: '/lenguaje',
      name: 'LenguajeComponent',
      component: LenguajeComponent
    },
    {
      path: '/lenguaje/facil',
      name: 'LenguajeFacilComponent',
      component: LenguajeFacilComponent
    }
  ]
})
