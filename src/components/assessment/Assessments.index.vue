<template>
  <div id="DeterminedExams">
    <input type="text" id="examSearch" class="form-control" v-model="search" placeholder="Search for exam.."/>
    <div class="list-group">
      <div v-for="Exam in FilteredExams" class="">
        <!--<a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#exampleModalCenter">{{ Exam.exam_title }}</a>-->
        <router-link :to="{ name: 'AssessmentsJoin', params: { examId: Exam._id }}">{{ Exam.exam_title }}</router-link>
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
