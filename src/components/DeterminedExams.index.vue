<template>
  <div id="DeterminedExams">
    <div v-for="Exam in DeterminedExams" class="determinedExam">
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
            this.$http.get('http://localhost:8000/exams/full').then(function(data) {
                console.log(data)
                this.DeterminedExams = data.body
            })
        }
    }
</script>