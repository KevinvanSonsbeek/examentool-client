import Vue from 'vue'
import Router from 'vue-router'
import DeterminedExams from './views/DeterminedExams.index.vue'
import DeterminedExamsAssessment from './views/DeterminedExams.assessment.vue'
import AddExam from './views/AddExam.index.vue'

Vue.use(Router)

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
        path: '/exams/:examId/assessment',
        name: 'DeterminedExamsAssessment',
        component: DeterminedExamsAssessment
      },
      {
        path: '/AddExam',
        name: 'AddExam',
        component: AddExam
      }
  ]
})
