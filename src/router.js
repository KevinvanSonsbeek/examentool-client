import Vue from 'vue'
import Router from 'vue-router'
import DeterminedExams from './views/DeterminedExams.index.vue'
import DeterminedExamsAssessment from './views/DeterminedExams.assessment.vue'
import DeterminedExamsNewAssessment from './views/DeterminedExams.newAssessment.vue'

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
          path: '/exams/:examId',
          name: 'DeterminedExamsAssessment',
          component: DeterminedExamsAssessment
      },
      {
        path: '/exams/:examId/start',
        name: 'DeterminedExamsNewAssessment',
        component: DeterminedExamsNewAssessment
      }
  ]
})
