<style>
    #infoTable {
        width: 600px;
        margin: auto;
    }
    #infoTable input {
        width: 200px;
    }
    #sectionsDiv{
        margin: auto;
        width: 800px!important;
    }
    .sectionHeader {
        background: lightgrey;
        width: 100%;
    }
    .card {
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 20px;
        min-width: 400px;
        margin: 0px auto;
        vertical-align: middle!important;
        background: white;
    }
</style>

<template>
    <div id="DeterminedExams">
        <div id="sectionsDiv">
            <table id="sectionTables" class="table sectionTable">
                <tbody class="" v-for="section in sections"><br><br>
                <tr>
                    <td class="sectionHeader">{{ section.title }}</td>
                </tr>
                <tr>
                    <td>Vraag:</td>
                    <td>Wel:</td>
                    <td>Niet:</td>
                    <td>Twijfel:</td>
                    <td>Uitleg:</td>
                    <td>Notitie:</td>
                </tr>
                <tr v-for="criteria in section.criteria">
                    <td v-bind:id="criteria.criteria_name + 'Title'">{{ criteria.criteria_name }}</td>
                    <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.answer" value="true" type="radio"></td>
                    <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.answer" value="false" type="radio"></td>
                    <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.doubt" type="checkbox"></td>
                    <td><button v-on:click="showInfo(criteria.criteria_description)">?</button></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div id="cardDiv"></div>
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
                webStorageName: undefined,

                assessment: null,
                sections: null,
            }
        },
        // Function called at creation of the page
        created () {
            this.webStorageName = this.webStorageName = 'assessment-' + this.$route.params.examId + '-' + this.examiner;

            this.getData().then((data) => {
                this.assessment = data;
                this.sections = data.exam_criteria;

                console.log(this.assessment)
            });
        },
        methods: {
            setWebStorage(data) {
                return new Promise(
                    (resolve, reject) => {
                        if (this.webStorageSupport) {
                            this.getWebStorage().then((localData => {
                                // When there is no web storage, prevent using current date and use data from data
                                if (localData === null) {
                                    data.updated_at = new Date(data.updated_at).getTime(); //Convert to unix timestamp
                                } else {
                                    data.updated_at = Date.now();
                                }
                                localStorage.setItem(this.webStorageName, JSON.stringify(data));
                                resolve(data);
                            }));
                            reject(new Error("Unknown error"));
                        } else {
                            reject(new Error("Web storage is not supported"));
                        }
                    }
                );
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
                return new Promise(
                    (resolve, reject) => {
                        this.$http.put('http://localhost:8000/assessment/' + this.assessment._id + '/update', data).then(response => {
                            resolve(response.body);
                        }, response => {
                            reject(new Error(response))
                        })
                    }
                );
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
                return new Promise(
                    (resolve) => {
                        Promise.all([this.getServerData(), this.getWebStorage()]).then(function(values) {
                            let serverData = values[0];
                            let webStorageData = values[1];

                            if (webStorageData === null) {
                                self.setWebStorage(serverData);
                                resolve(serverData);
                            } else if (serverData.updated_at >= webStorageData.updated_at) {
                                resolve(serverData);
                            } else if (webStorageData.updated_at >= serverData.updated_at) {
                                resolve(webStorageData);
                            }
                        });
                    }
                )
            },
            setData(data) {
                Promise.all([this.setWebStorage(data), this.setServerData(data)]).then(function() {
                    return true;
                });
            },
            onChange() {
                this.setData(this.assessment);
            }
        }
    }
</script>
