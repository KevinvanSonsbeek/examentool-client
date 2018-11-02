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
            setWebStorage(data) {
                if (this.webStorageSupport) {
                    this.getWebStorage().then((localData => {
                        // When there is no web storage, prevent using current date and use data from data
                        if (localData === null) {
                            data.updated_at = new Date(data.updated_at).getTime(); //Convert to unix timestamp
                        } else {
                            data.updated_at = Date.now();
                        }
                        localStorage.setItem(this.webStorageName, JSON.stringify(data));
                        return this.webStorageSupport;
                    }));
                    return false;
                }
            },
            getWebStorage() {
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
                            response.body.updated_at = new Date(response.body.updated_at).getTime(); //Convert to unix timestamp
                            resolve(response.body);
                        }, response => {
                            reject(new Error(response))
                        })
                    }
                );
            },
            getData() {
                let self = this;
                Promise.all([this.getServerData(), this.getWebStorage()]).then(function(values) {
                    let serverData = values[0];
                    let webStorageData = values[1];

                    console.log("Server data:", serverData);
                    console.log("Web storage data:", webStorageData);

                    if (webStorageData === null) {
                        self.setWebStorage(serverData);
                        return serverData;
                    } else if (serverData.updated_at >= webStorageData.updated_at) {
                        return serverData;
                    } else if (webStorageData.updated_at >= serverData.updated_at) {
                        return webStorageData;
                    }
                });
            },
            setData(data) {
                this.setWebStorage(data);
                this.setServerData(data);
            }
        }
    }
</script>
