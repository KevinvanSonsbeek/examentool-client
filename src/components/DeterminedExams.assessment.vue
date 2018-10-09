<template>
    <div id="DeterminedExams">

    </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        // Function needed for the data
        data () {
            return {

            }
        },
        // Function called at creation of the page
        created () {
            // API call
            this.$http.get('http://localhost:8000/exam/' + this.$route.params.examId + '/start').then(response => {
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
        }
    }
</script>
