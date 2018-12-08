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
            this.$http.get(`${this.url}/exam/${this.$route.params.examId}/start`)
                .then((response) => {
                    this.$router.push({ name: 'AssessmentsJoin', params: { examId: response.body._id }})
                })
                .catch(response => {
                    // Failed
                    if (response.status === 404) {
                        this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                    } else if (response.status === 500) {
                        this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                    } else {
                        this._addStatusMessage('error', 'Onbekende foutmelding');
                        console.log(new Error(response));
                    }
                });
        }
    }
</script>
