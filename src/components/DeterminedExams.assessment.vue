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
                webStorageSupport: undefined,
                exam: [] // TODO: Better name?
            }
        },
        // Function called at creation of the page
        created () {
            // Check if there wis web storage support
            this.webStorageSupport = typeof(Storage) !== "undefined";
            let localStorageData = JSON.parse(localStorage.getItem('assessment-' + this.$route.params.examId));

            if (!localStorageData.justCreated) {
                // API call
                this.$http.get('http://localhost:8000/assessment/' + this.$route.params.examId + '/join').then(response => {
                    // Succeed
                    console.log(this.exam);
                }, response => {
                    // Failed
                    if (response.status === 404) {
                        alert(404)
                    } else if (response.status === 500) {
                        alert(500)
                    } else {
                        alert("unknown error")
                    }

                    // Sever not available, using local storage
                    this.exam = localStorageData.data
                    // TODO: Logic for server not available
                });
            } else {
                this.exam = localStorageData.data;
                localStorageData.justCreated = false;
            }
            localStorage.setItem('assessment-' + this.$route.params.examId, JSON.stringify(localStorageData))
        }
    }
</script>
