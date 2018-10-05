<template>
  <div id="DeterminedExams">
    <div v-for="Exam in DeterminedExams" class="determinedExam">
    <input type="text" class="form-control" v-model="search" placeholder="Search for exam.."/><br>
    <div v-for="Exam in FilteredExams" class="determinedExam">
      <p>{{ Exam.exam_title }}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        data () {
            return {
                DeterminedExams: []

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
        }
    }
</script>

<style>
  #DeterminedExams{
    margin-top: 25px;
  }

</style>