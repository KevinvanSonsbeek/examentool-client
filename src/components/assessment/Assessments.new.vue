<template>
    <div id="DeterminedExams">
        Loading...
    </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        // Function needed for the data
        data () {
            return {
                examiner: "",
            }
        },
        // Function called at creation of the page
        created () {
            // Check if there is web storage support
            this.webStorageSupport = typeof(Storage) !== "undefined";

            // API call
            this.$http.get('http://localhost:8000/exam/' + this.$route.params.examId + '/start').then(response => {
                // Succeed
                this.$router.push({ name: 'DeterminedExamsAssessment', params: { examId: this.exam._id }})
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
