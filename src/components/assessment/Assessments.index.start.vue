<template>
  <div id="DeterminedExams">
    <h2 class="title">Nieuwe afnamen</h2>
    <input type="text" id="examSearch" class="form-control searchBar" v-model="search" placeholder="Zoeken..."/>
    <div class="list-group">
      <div v-for="(Exam, index) in FilteredExams" :key="index">
          <div class="list-group-item clearfix align-items-center justify-content-between exam">
              <span class="pull-right">
                  <router-link class="btn btn-primary float-right" :to="{ name: 'AssessmentsNew', params: { examId: Exam._id }}" style="margin-top: 5px;">Start</router-link>
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
            this.$http.get(`${this.url}/exams/full`)
                .then(response => {
                    // Succeed
                    this.DeterminedExams = response.body
                })
                .catch(response => {
                    this._catchException(response);
                });
        },
        computed: {
            // For filtering the examns for the search function
            FilteredExams() {
                return this.DeterminedExams.filter(Exam => {
                    return Exam.exam_title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>
