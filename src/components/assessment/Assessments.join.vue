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
                // Check if there is web storage support
                webStorageSupport: typeof(Storage) !== undefined,
                examiner: "Richard", //TODO: Ask for one
                webStorageName: this.webStorageName = 'assessment-' + this.$route.params.examId + '-' + this.examiner,
            }
        },
        // Function called at creation of the page
        created () {
            // TODO: Logic
        },
        methods: {
            setLocalData(data) {
                if (this.webStorageSupport) {localStorage.setItem(this.webStorageName, JSON.stringify(data))}
                return this.webStorageSupport;
            },
            getLocalData() {
                return new Promise(
                    (resolve, reject) => {
                        let data;
                        if (this.webStorageSupport) {
                            data = JSON.parse(localStorage.getItem(this.webStorageName));
                            resolve(data);
                        } else {
                            reject(new Error("Web storage is not supported"));
                        }
                    }
                )
            },
            setServerData(data) {
                return false;
            },
            getServerData()  {
                return new Promise(
                    (resolve, reject) => {
                        this.$http.post('http://localhost:8000/assessment/' + this.$route.params.examId + '/join', {examinator_name: this.examiner}).then(response => {
                            resolve(response.body)
                        }, response => {
                            reject(new Error(response))
                        })
                    }
                );
            }
        }
    }
</script>
