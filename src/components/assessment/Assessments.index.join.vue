<template>
  <div id="DeterminedExams">
    <h2 class="title">Inhaken op examen</h2>
    <input type="text" id="examSearch" class="form-control searchBar" v-model="search" placeholder="Zoeken..."/>
    <div class="list-group">
      <div v-for="(Exam, index) in FilteredExams" :key="index">
          <div class="list-group-item clearfix align-items-center justify-content-between exam">
              <span class="pull-right">
                  <router-link class="btn btn-primary float-right" :to="{ name: 'AssessmentsJoin', params: { examId: Exam._id }}" style="margin-top: 5px;">Inhaken</router-link>
              </span>
              <div>{{ Exam.exam_title }}</div>
              <div>Cohort: {{ Exam.exam_cohort }}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        head: {
            script: [
                {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
            ]
        },
        // Function needed for the data
        data () {
            return {
                search: '',
                DeterminedExams: []
            }
        },
        // Function called at creation of the page
        created () {
            // API call
            this.$http.get('http://localhost:8000/assessments').then(response => {
                // Succeed
                this.DeterminedExams = response.body
            }, response => {
                // Failed
                if (response.status === 404) {
                    alert(404)
                } else if (response.status === 500) {
                    alert(500)
                } else {
                    alert("unknown error")
                }
            });
        },
        computed: {
            // For filtering the exam's for the search function
            FilteredExams() {
                return this.DeterminedExams.filter(Exam => {
                    return Exam.exam_title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>

<style>

</style>
