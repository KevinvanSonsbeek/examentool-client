import Vue from 'vue'
import Router from 'vue-router'
import DeterminedExams from './views/DeterminedExams.index.vue'
import DeterminedExam from './views/DeterminedExam.index.vue'
import AssessmentsIndex from './views/assessment/Assessments.index.vue'
import AssessmentsNew from './views/assessment/Assessments.new.vue'
import AssessmentsJoin from './views/assessment/Assessments.join.vue'
import AddExam from './views/AddExam.index.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
        name: 'DeterminedExams',
        component: DeterminedExams
      },
      {
        path: '/exam/:examId',
        name: 'DeterminedExam',
        component: DeterminedExam
      },
      {
        path: '/assessments',
        name: 'AssessmentsIndex',
        component: AssessmentsIndex
      },
      {
        path: '/assessments/:examId/start',
        name: 'AssessmentsNew',
        component: AssessmentsNew
      },
      {
        path: '/assessments/:examId',
        name: 'AssessmentsJoin',
        component: AssessmentsJoin
      },
      {
        path: '/AddExam',
        name: 'AddExam',
        component: AddExam
      }
  ]
})
