import Vue from 'vue'
import Router from 'vue-router'
import DeterminedExams from './views/DeterminedExams.index.vue'
import DeterminedExamsAssessment from './views/DeterminedExams.assessment.vue'
import DeterminedExamsNewAssessment from './views/DeterminedExams.newAssessment.vue'
import AssessmentsIndex from './views/assessment/Assessments.index.vue'
import AssessmentsNew from './views/assessment/Assessments.new.vue'
import AssessmentsJoin from './views/assessment/Assessments.join.vue'

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
      },
      {
          path: '/assessments/index',
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
      }
  ]
})
