<style>
.progress{
    width: 50%;
    left: 25%;
    position: fixed;
    z-index: 1;
    top: 75px;
}
.progress-bar{
    width: 0%;
}
#sectionsDiv {
    margin-top: 25px;
}
#removeFilter {
    display: none;
}
.assessmentButtons * {
    margin: 0 2px;
}
@media screen and (max-width: 900px){
    .progress{
        width: 70%;
        left: 15%;
    }
}
@media screen and (max-width: 700px){
    .progress{
        width: 95%;
        left: 2.5%;
    }
}
</style>

<template>
    <div id="DeterminedExams">
        <div class="progress">
            <div class="progress-bar" id="progressBar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div id="sectionsDiv">
            <div class="assessmentButtons float-right">
                <b-button variant="info" v-on:click="setShowProperty()" id="filter">Filter</b-button>
                <b-button variant="info" v-on:click="showAllCriteria()" id="removeFilter">Verwijder filter</b-button>
                <b-button variant="warning" v-on:click="showProcessReportModal()">Proces verbaal</b-button>
                <b-button variant="success" v-on:click="handInAssassment()"  id="handIn">Lever in</b-button>
            </div>
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

            <div class="sectionTable" v-for="(section, sectionIndex) in sections" :key="section.sectionIndex">
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">{{ section.title }}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Vraag:</th>
                            <td>Wel:</td>
                            <td>Niet:</td>
                            <td>Twijfel:</td>
                            <td>Notitie:</td>
                        </tr>
                        <tr v-if="criteria.show" v-for="(criteria, criterionIndex) in section.criteria" v-bind:id="criteria.criteria_name + 'Element'" :key="criterionIndex">
                            <td v-b-toggle="criteria.criteria_name" variant="primary">{{ criteria.criteria_description }}
                                <b-collapse v-bind:id="criteria.criteria_name" class="mt-2">
                                <b-card>
                                    <p class="card-text">{{ criteria.criteria_description }}</p>
                                </b-card>
                            </b-collapse>
                        </td>
                        <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.answer" value="true" type="radio"></td>
                        <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.answer" value="false" type="radio"></td>
                        <td><input class="form-check-input" v-on:change="onChange()" v-model="criteria.doubt" type="checkbox"></td>
                        <td>
                            <b-button @click="openNoteModal(sectionIndex + '-' + criterionIndex)" v-b-modal="" v-if="!criteria.note" variant="secondary"><span class="oi oi-pencil"></span></b-button>
                            <b-button @click="openNoteModal(sectionIndex + '-' + criterionIndex)" v-else variant="primary"><span class="oi oi-pencil"></span></b-button>
                        </td>

                        <b-modal :id="'modal-' + sectionIndex + '-' + criterionIndex" title="Notities" ok-only ok-title="Sluiten"
                                 @shown="focusNoteTextAreaInModal(sectionIndex + '-' + criterionIndex)">
                            <textarea class="form-control" :id="'noteTextArea-' + sectionIndex + '-' + criterionIndex" rows="3" v-on:keyup="onChange()" v-model="criteria.note"></textarea>
                        </b-modal>
                    </tr>
                    </tbody>
                </table>
            </div>
            <b-modal :id="'processReportModal'" ref="processReportModal" title="Proces verbaal" ok-title="Verstuur" cancel-title="Annuleren"
                     @shown="focusProcessReportTextAreaInModal" @ok="validateProcessReport">
                <b-form-group :invalid-feedback="invalidProcessReportFeedback">
                    <b-form-textarea id="noteTextArea"
                                     v-model="processReport"
                                     :rows="8"
                                     :state="processReportState"
                                     required>
                    </b-form-textarea>
                </b-form-group>
            </b-modal>
            <b-modal :id="'processReportModalConfirmation'" title="Proces verbaal" ok-title="Verstuur" cancel-title="Annuleren"
                     @cancel="showProcessReportModal" @ok="sendProcessReport">
                <p>Weet u zeker dat u dit proces verbaal wilt indienen? De afnamen wordt dan gestopt.</p>
            </b-modal>
            <b-modal :id="'assessmentClosedModal'" title="Afnamen gesloten" ok-only @hide="closeExam">
                <p>Dit afnamen is gesloten. U word doorgestuurd naar de homepagina.</p>
            </b-modal>
        </div>
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
                toggle: false,
                percentageFilled: 0,
                processReport: null,
            }
        },
        computed: {
            webStorageName: function () {
                return `assessment-${this.$route.params.examId}-${this.examiner}`;
            },
            processReportState() {
                // Vue validation in combination with Bootstrap validation.
                // Can not be simplified! Will not work.
                // noinspection RedundantConditionalExpressionJS
                return !this.processReport ? false : true;
            },
            invalidProcessReportFeedback() {
                return 'Dit veld mag niet leeg zijn';
            },
        },
        // Function called at creation of the page
        created () {
            this.examiner = prompt("Please enter your name:");

            this.getData()
                .then((data) => {
                    this.assessment = data;
                    this.sections = data.exam_criteria;
                    // Creates the property show and sets it to true
                    for (var i = 0; i < this.sections.length; i++) {
                        for (var e = 0; e < this.sections[i].criteria.length; e++) {
                            this.sections[i].criteria[e].show = true;
                        }
                    }
                });

            this.getProcessReport()
                .then((data) => {
                    this.processReport = data.processReport;
            });
        },
        updated () {
            this.updateProgressBar();
        },
        methods: {
            setWebStorage(data) {
                return new Promise(
                    (resolve, reject) => {
                        if (this.webStorageSupport) {
                            this.getWebStorage()
                                .then((localData => {
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
                        this.$http.put(`${this.url}/assessment/${this.assessment._id}/update`, data)
                            .then(response => {
                                resolve(response.body);
                            })
                            .catch(response => {
                                this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                                reject(new Error(response))
                            });
                    }
                );
            },
            getServerData()  {
                return new Promise(
                    (resolve, reject) => {
                        let data = {};
                        data.examiner_name = this.examiner;
                        this.$http.post(`${this.url}/assessment/${this.$route.params.examId}/join`, data)
                            .then(response => {
                                response.body.updated_at = new Date(response.body.updated_at).getTime(); //Convert to unix timestamp
                                resolve(response.body);
                            })
                            .catch(response => {
                                this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                                reject(new Error(response))
                            });
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
            updateProgressBar() {
                //calculate assessment completion percentage
                this.criterias = 0;
                this.criteriasFilled = 0;
                for(let section in this.assessment.exam_criteria){
                    for(let criteria in this.assessment.exam_criteria[section].criteria){
                        this.criterias++;
                        if(this.assessment.exam_criteria[section].criteria[criteria].answer !== null && this.assessment.exam_criteria[section].criteria[criteria].doubt !== true){
                            this.criteriasFilled++;
                        }
                    }
                }
                this.percentageFilled = Math.round((parseFloat(this.criteriasFilled / this.criterias) * 100));
                let progressBar = document.getElementById("progressBar");
                progressBar.style.width = this.percentageFilled + '%';
                progressBar.innerHTML = this.percentageFilled + '%';
            },
            onChange() {
                this.setData(this.assessment);
                if (this.toggle === true) {
                    // Adds a delay of 10 seconds
                    setTimeout(() => this.setShowProperty(), 10000)
                }
            },
            // Sets the criterion property "show" to false if already answereed.
            setShowProperty() {
                for (let i = 0; i < this.sections.length; i++) {
                    for (let e = 0; e < this.sections[i].criteria.length; e++) {
                        let criteria = this.sections[i].criteria[e];
                        if (criteria.answer !== null && criteria.doubt === false) {
                            this.sections[i].criteria[e].show = false;
                        }
                    }
                }
                this.toggle = true;
                global.$("#filter").hide("slow");
                global.$("#removeFilter").show("slow");
                this.$forceUpdate();
            },
            // Sets the property "show" of all criteria to true so they will all be shown
            showAllCriteria() {
                for (let i = 0; i < this.sections.length; i++) {
                    for (let e = 0; e < this.sections[i].criteria.length; e++) {
                        this.sections[i].criteria[e].show = true;
                    }
                }
                this.toggle = false;
                global.$("#removeFilter").hide("slow");
                global.$("#filter").show("slow");
                this.$forceUpdate();
            },
            handInAssassment() {
                if(this.percentageFilled === 100) {
                    this._addStatusMessage('success', "Alle criteria zijn ingevuld!");

                    this.$http.get(`${this.url}/assessment/${this.$route.params.examId}/finish`, this.assessment)
                        .then(response => {
                            this.$router.push('/assessments/join');
                        })
                        .catch(response => {
                            this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                        });
                }else {
                    this._addStatusMessage('warning', "Nog niet alle criteria zijn ingevuld!");
                }
            },
            openNoteModal(modalId) {
                this.$root.$emit('bv::show::modal', 'modal-' + modalId);

            },
            focusNoteTextAreaInModal(modalId) {
                global.$('#noteTextArea-' + modalId).focus();
            },
            getProcessReport() {
                return new Promise(
                    (resolve, reject) => {
                        let data = {};
                        data.examiner_name = this.examiner;
                        this.$http.get(`${this.url}/assessment/${this.$route.params.examId}/processreport`, data)
                            .then(response => {
                                resolve(response.body);
                            })
                            .catch(response => {
                                this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                                reject(new Error(response))
                            });
                    }
                );
            },
            setProcessReport() {
                return new Promise(
                    (resolve, reject) => {
                        let data = {};
                        data.processReport = this.processReport;
                        this.$http.put(`${this.url}/assessment/${this.$route.params.examId}/processreport`, data)
                            .then(response => {
                                resolve(response.body);
                            })
                            .catch(response => {
                                this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                                reject(new Error(response))
                            });
                    }
                );
            },
            showProcessReportModal() {
                this.$root.$emit('bv::show::modal', 'processReportModal');
            },
            focusProcessReportTextAreaInModal() {
                global.$('#noteTextArea').focus();
            },
            validateProcessReport(evt) {
               evt.preventDefault();
               if (this.processReportState) {
                   this.$refs.processReportModal.hide();
                   this.confirmProcessReport();
               }
            },
            confirmProcessReport() {
                this.$root.$emit('bv::show::modal', 'processReportModalConfirmation');
            },
            sendProcessReport() {
                this.setProcessReport()
                    .then((data) => {
                        this.processReport = data.processReport;
                        this.closeExamModal()
                    });
            },
            closeExamModal() {
                this.$root.$emit('bv::show::modal', 'assessmentClosedModal');
            },
            closeExam() {
                this.$router.push({ name: 'Index' })
            },
        }
    }
</script>
