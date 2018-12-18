<template>
    <div id="determinedExam">
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
                <div v-if="statusMessage.type === 'responseor'" class="alert alert-danger alert-dismissible" role="alert">
                    <strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container">
            <form>
                <div>
                    <div class="form-group">
                        <label for="exam_title">Examen Titel</label>
                        <input id="exam_title" v-model="determinedExam.exam_title" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="exam_description">Examen Beschrijving</label>
                        <textarea id="exam_description" v-model="determinedExam.exam_description" class="form-control" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="exam_cohort">Examen Cohort</label>
                        <select id="exam_cohort" v-model="determinedExam.exam_cohort" class="form-control">
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                        </select>
                    </div>
                </div>
                <hr>
                <div class="form-group">
                    <h1 style="margin-bottom:25px;">Examen Criteria</h1>
                    <div style="margin-bottom:100px;" v-for="(criteria_section, sectionIndex) in determinedExam.exam_criteria" :key="sectionIndex">
                        <th for="criteria_section_title">Criteria sectie naam</th>
                        <input id="criteria_section_title" v-model="criteria_section.title" class="form-control sectionName">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="criteriaName" scope="col">Criteria + uitleg</th>
                                    <th class="criteriaCaesuraGroup" scope="col">Criteria cesuur groep</th>
                                    <th class="criteriaShowStopper" scope="col">Showstopper</th>
                                </tr>
                                <tr>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(criteria, index) in criteria_section.criteria" :key="index">
                                    <td>
                                        <textarea placeholder="Criteria" v-model="criteria.criteria_name" class="form-control texterea"></textarea>
                                        <textarea placeholder="Uitleg" v-model="criteria.criteria_description" class="form-control texterea"></textarea>
                                    </td>
                                    <td>
                                        <select class="form-control" v-model="criteria.rating_group">
                                            <option value="good">Goed</option>
                                            <option value="pass">Voldoende</option>
                                            <option value="fail">Onvoldoende</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="checkbox" v-model="criteria.show_stopper" class="form-control">
                                        <b-button class="btn btn-danger float-right removeCriterion" @click="openNoteModal(sectionIndex + '-' + index)">Verwijder</b-button>
                                        <!-- <button type="button" class="btn btn-danger float-right removeCriterion" v-on:click="removeExamItem(sectionIndex, index)">Verwijder</button> -->
                                    </td>
                                    <b-modal :id="'modal-' + sectionIndex + '-' + index" title="Notities" ok-variant="danger" ok-title="Verwijderen" cancel-title="Annuleren" @ok="removeExamItem(sectionIndex, index)">
                                        <p>Weet u zeker dat u dit criterium wilt verwijderen?</p>
                                    </b-modal>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-primary float-right" v-on:click="addCriterion(sectionIndex)">Criteria toevoegen</button>
                        <button type="button" class="btn btn-danger float-right" style="margin-right:5px;" v-on:click="removeExamItem(sectionIndex, index, 'section')">Verwijder sectie</button>
                    </div>
                    <button type="button" class="btn btn-primary" v-on:click="addSection()">Sectie toevoegen</button>
                </div>
                <button type="button" class="btn btn-primary" v-on:click="updateDeterminedExam()" style="margin-bottom: 25px;">Opslaan</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DeterminedExamById',
        // Function needed for the data
        data () {
            return {
                msg: 'updateDeterminedExam',
                determinedExam: {},
                isActive: false
            }
        },
        created() {
            //Get determinedExam
            this.$http.get(`${this.url}/exam/${this.$route.params.examId}`)
                .then(response => {
                    if(response.status === 200) {
                        this.determinedExam = response.body;
                    }
                })
                .catch(response => {
                    if(response.status === 0) {
                        this._addStatusMessage('warning', 'Geen verbinding met server');
                    } else if(response.status === 404){
                        this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                    } else if(response.status === 500){
                        this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                    } else {
                        this._addStatusMessage('error', 'Onbekende foutmelding');
                        console.log(new Error(response))
                    }
                });
        },
        methods: {
            /**
             * Send update for determined exam
             */
            updateDeterminedExam: function() {
                //Check for empty fields
                if (!this.checkData()) {
                    this._addStatusMessage('warning', 'Lege velden. Vul deze in a.u.b. in.');
                    return false
                }

                //Update request
                this.$http.put(`${this.url}/exam/${this.determinedExam._id}`, this.determinedExam)
                    .then(response => {
                        if(response.status === 200) {
                            this._addStatusMessage('success', 'Succesvol opgeslagen');
                        }
                    })
                    .catch(response => {
                       if(response.status === 0) {
                           this._addStatusMessage('warning', 'Geen verbinding met server');
                       } else if(response.status === 404){
                           this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                       } else if(response.status === 405){
                           this._addStatusMessage('warning', 'Examen mag niet aangepast worden. Er is een lopende afnamen van dit examen.');
                       } else if(response.status === 500){
                           this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                       } else {
                           this._addStatusMessage('error', 'Onbekende foutmelding');
                           console.log(new Error(response))
                       }
                    });
            },
            addSection: function() {
                //Check if array containing criteria sections already exits
                if (typeof this.determinedExam.exam_criteria === undefined || !(this.determinedExam.exam_criteria instanceof Array)) {
                    this.determinedExam.exam_criteria = [];
                }

                //Make new empty criteria section
                this.determinedExam.exam_criteria.push({title: null, criteria: []});
                this.$forceUpdate();
            },
            addCriterion: function(sectionIndex) {
                //Push empty criteria into section
                this.determinedExam.exam_criteria[sectionIndex].criteria.push({criteria_description: null, criteria_name: null, rating_group: null, show_stopper: false});
                this.$forceUpdate();
            },
            // Removes criterion or section from exam.
            removeExamItem: function(sectionIndex, index, item) {
                let array;
                let itemToRemove;
                if (item === "section") {
                    array = this.determinedExam.exam_criteria;
                    itemToRemove = this.determinedExam.exam_criteria[index];
                } else {
                    array = this.determinedExam.exam_criteria[sectionIndex].criteria;
                    itemToRemove = this.determinedExam.exam_criteria[sectionIndex].criteria[index];
                }
                // Removes the section from the array.
                array.splice(global.$.inArray(itemToRemove, array),1);
            },
            openNoteModal(modalId) {
                this.$root.$emit('bv::show::modal', 'modal-' + modalId);
            },
            // Check if there are empty fields.
            checkData: function() {
                if (!this.determinedExam.exam_title) {return false}
                if (!this.determinedExam.exam_cohort) {return false}
                if (!this.determinedExam.exam_description) {return false}
                if (this.determinedExam.exam_criteria) {
                    for (let indexSection = 0; indexSection < this.determinedExam.exam_criteria.length; indexSection++) {
                        if (!this.determinedExam.exam_criteria[indexSection].title) {return false}
                        for (let indexCriteria = 0; indexCriteria < this.determinedExam.exam_criteria[indexSection].criteria.length; indexCriteria++) {
                            if (!this.determinedExam.exam_criteria[indexSection].criteria[indexCriteria].criteria_name) {return false}
                            if (!this.determinedExam.exam_criteria[indexSection].criteria[indexCriteria].criteria_description) {return false}
                            if (!this.determinedExam.exam_criteria[indexSection].criteria[indexCriteria].rating_group) {return false}
                        }
                    }
                }
                return true;
            },
        }
    }
</script>

<style>
.criteriaName
{
    width: 12.5%;
}
.criteriaDescription
{
    padding: 10px 0px 0px 0px;
    font-weight: bold;
}
.criteriaCaesuraGroup
{
    width: 3%;
}
.criteriaShowStopper
{
    width: 0.1%;
}
.removeCriterion {
    position: relative;
    left: 145px;
    bottom: 38px;
}
.sectionName
{
    margin-bottom: 10px;
}
.texterea
{
    margin-bottom: 10px;
}
</style>
