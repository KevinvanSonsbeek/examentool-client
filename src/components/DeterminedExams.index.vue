<template>
  <div id="DeterminedExams">
    <input type="text" class="form-control" v-model="search" placeholder="Search for exam.."/><br>
    <div v-for="Exam in FilteredExams" class="determinedExam">
      <p>{{ Exam.exam_title }}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        data () {
            return {
                DeterminedExams: [],
                search: ''
            }
        },
        created () {
            this.$http.get('http://localhost:8000/exams/full').then(response => {
                console.log(response)
                this.DeterminedExams = response.body
            }, response => {
                alert(response.status);
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
            FilteredExams() {
                return this.DeterminedExams.filter(Exam => {
                    return Exam.exam_title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>

<style>
  #DeterminedExams{
    margin-top: 25px;
  }

</style>