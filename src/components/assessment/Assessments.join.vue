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
                webStorageSupport: undefined,
                examiner: "Richard", //TODO: Ask for one
                webStorageName: undefined,
            }
        },
        // Function called at creation of the page
        created () {
            // Check if there is web storage support
            this.webStorageSupport = typeof(Storage) !== undefined;
            // Set variable for web storage name
            this.webStorageName = 'assessment-' + this.$route.params.examId + '-' + this.examiner;

        },
        methods: {
            setLocalData: (data) => {
                if (this.webStorageSupport) {localStorage.setItem(this.webStorageName, JSON.stringify(data))}
                return this.webStorageSupport;
            },
            getLocalData: () => {
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
            setServerData: (data) => {
                return false;
            },
            getServerData: () => {
                return new Promise(
                    (resolve, reject) => {
                        this.$http.post('http://localhost:8000/assessment/' + this.$route.params.examId + '/join', {examinator_name: this.examiner}).then(response => {
                            resolve(response)
                        }, response => {
                            reject(new Error(response))
                        })
                    }
                );
            }
        }
    }
</script>
