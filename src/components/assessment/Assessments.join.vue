<style>
  #infoTable {
    width: 50%;
    max-width: 600px;
    min-width: 200px;
    margin: auto;
    margin-top: 5px;
  }
  #infoTable input {
    width: 200px;
  }
  .table{
    max-width: 500px;
    min-width: 200px;
  }
  .sectionTable {
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
    padding: 15px 0px 5px 0px;
    margin: 0px auto;
    vertical-align: middle!important;
    background: white;
  }
  #examSearch{
      width: 75%;
      min-width: 100px;
      max-width: 200px;
      margin: auto;
      margin-bottom: 30px;
  }
</style>

<template>
    <div id="DeterminedExams">
        <div id="sectionsDiv">
            <!--TODO: Find a way to make it dry-->
            <div class="statusMessages">
                <div v-for="statusMessage in statusMessages" :key="statusMessage.index">
                    <div v-if="statusMessage.type === 'success'" class="alert alert-success alert-dismissible" role="alert">
                        <strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="statusMessage.type === 'info'" class="alert alert-info alert-dismissible" role="alert">
                        <strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="statusMessage.type === 'warning'" class="alert alert-warning alert-dismissible" role="alert">
                        <strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="statusMessage.type === 'error'" class="alert alert-danger alert-dismissible" role="alert">
                        <strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>

            <table id="sectionTables" class="table sectionTable">
                <tbody class="" v-for="section in sections" :key="section.index"><br><br>
                <tr>
                    <td class="sectionHeader">{{ section.title }}</td>
                </tr>
                <tr>
                    <td>Vraag:</td>
                    <td>Wel:</td>
                    <td>Niet:</td>
                    <td>Twijfel:</td>
                    <td>Notitie:</td>
                </tr>
                <tr v-for="criteria in section.criteria" v-bind:id="criteria.criteria_name + 'Element'">
                    <td v-b-toggle="criteria.criteria_name" variant="primary">{{ criteria.criteria_name }}                    
                        <b-collapse v-bind:id="criteria.criteria_name" class="mt-2">
                        <b-card>
                            <p class="card-text">{{ criteria.criteria_description }}</p>      
                        </b-card>
                        </b-collapse>
                    </td>
                    <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.answer" value="true" type="radio"></td>
                    <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.answer" value="false" type="radio"></td>
                    <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.doubt" type="checkbox"></td>
                    <td><textarea rows="2" cols="12" v-on:keyup="onChange()" v-model="criteria.note"></textarea></td>
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
                examiner: '',

                assessment: null,
                sections: null,
                criterias: 0,
                criteriasFilled: 0,
            }
        },
        computed: {
            webStorageName: function () {
                return 'assessment-' + this.$route.params.examId + '-' + this.examiner;
            }
        },
        // Function called at creation of the page
        created () {
            this.examiner = prompt("Please enter your name:");

            this.getData().then((data) => {
                this.assessment = data;
                this.sections = data.exam_criteria;
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
                            this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
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
                            this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
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
                    // return true;
                });
                // TODO: Why unknown error?
                // this.setWebStorage(data).catch(function (error) {
                //     console.log("test:", error);
                // });
            },
            onChange() {
                this.setData(this.assessment);
                //calculate assassment completion percentage
                this.criterias = 0, this.criteriasFilled = 0;
                for(let section in this.assessment.exam_criteria)
                {
                    for(let criteria in this.assessment.exam_criteria[section].criteria)
                    {
                        this.criterias++;
                        if(this.assessment.exam_criteria[section].criteria[criteria].answer != null)
                        {
                            this.criteriasFilled++;
                        }
                    }
                }
                console.log('total: ' + this.criterias + ', filled: ' + this.criteriasFilled);
                console.log("Completion percentage: " + (this.criteriasFilled / this.criterias) * 100 + "%");
            }
        }
    }
</script>