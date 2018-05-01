import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HomeComponent'
import LenguajeComponent from '@/components/lenguaje/LenguajeComponent'
import LenguajeFacilComponent from '@/components/lenguaje/LenguajeFacilComponent'
import LenguajeMedioComponent from '@/components/lenguaje/LenguajeMedioComponent'
import LenguajeDificilComponent from '@/components/lenguaje/LenguajeDificilComponent'
import CalculoComponent from '@/components/calculo/CalculoComponent'
import CalculoFacilComponent from '@/components/calculo/CalculoFacilComponent'
import CalculoMedioComponent from '@/components/calculo/CalculoMedioComponent'
import CalculoDificilComponent from '@/components/calculo/CalculoDificilComponent'

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
    },
    {
      path: '/lenguaje/medio',
      name: 'LenguajeMedioComponent',
      component: LenguajeMedioComponent
    },
    {
      path: '/lenguaje/dificil',
      name: 'LenguajeDificilComponent',
      component: LenguajeDificilComponent
    },
    {
      path: '/calculo',
      name: 'CalculoComponent',
      component: CalculoComponent
    },
    {
      path: '/calculo/facil',
      name: 'CalculoFacilComponent',
      component: CalculoFacilComponent
    },
    {
      path: '/calculo/medio',
      name: 'CalculoMedioComponent',
      component: CalculoMedioComponent
    },
    {
      path: '/calculo/dificil',
      name: 'CalculoDificilComponent',
      component: CalculoDificilComponent
    }
  ]
})
