<template>
    <div id="DeterminedExam">
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

        <div class="container">
            <form>
                <div>
                    <div class="form-group">
                        <label for="exam_title">Examen Titel</label>
                        <input id="exam_title" v-model="DeterminedExam.exam_title" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="exam_title">Examen Beschrijving</label>
                        <textarea id="exam_description" v-model="DeterminedExam.exam_description" class="form-control" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="exam_cohort">Examen Cohort</label>
                        <input id="exam_cohort" v-model="DeterminedExam.exam_cohort" type="number" class="form-control">
                    </div>
                </div>
                <hr>
                <div class="form-group">
                    <h1>Examen Criteria</h1>
                    <div v-for="(criteria_section, index) in DeterminedExam.exam_criteria" :key="index">
                        <label>Criteria sectie</label>
                        <input v-model="criteria_section.title" class="form-control">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Criteria naam</th>
                                    <th scope="col">Criteria beschrijving</th>
                                    <th scope="col">Criteria cesuur groep</th>
                                    <th scope="col">Showstopper</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(criteria, index) in criteria_section.criteria" :key="index">
                                    <td>
                                        <input v-model="criteria.criteria_name" class="form-control">
                                    </td>
                                    <td>
                                        <textarea v-model="criteria.criteria_description" class="form-control"></textarea>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <a type="button" class="btn btn-primary float-right" v-on:click="addCriteria(index)">Criteria toevoegen</a>
                    </div>
                    <a type="button" class="btn btn-primary" v-on:click="addSection()">Sectie toevoegen</a>
                </div>
                <a type="button" class="btn btn-primary" v-on:click="updateDeterminedExam()">Update</a>
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
                DeterminedExam: {},
                isActive: false
            }
        },
        created() {
            this.$http.get(`http://localhost:8000/exam/` + this.$route.params.examId)
                .then(response => {
                    this.DeterminedExam = response.body;
                    console.log(response.body);
                })
                .catch(response => {
                    console.log(response);
                    this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                })
        },
        methods: {
            /**
             * Send update for determined exam
             */
            updateDeterminedExam: function() {
                if (!this.checkData()) {
                    this._addStatusMessage('warning', 'Lege velden. Vul deze in a.u.b. in.');
                    return false
                }

                this.$http.put(`http://localhost:8000/exam/${this.DeterminedExam._id}`, this.DeterminedExam)
                    .then(response => {
                        if(response.status === 200) {
                            this._addStatusMessage('success', 'Succesvol opgeslagen');
                        } else if(response.status === 404){
                            alert("Error: Determined Exam not found");
                        } else if(response.status === 405){
                            alert("Error: Update not allowed (already has been used for assessment");
                        } else if(response.status === 500){
                            alert("Error: Internal Server Error");
                        } else  {
                            alert("How?");
                        }
                    })
                    .catch(err => {
                       if(err.status === 0) {
                            alert("No server connection");
                       } else {
                           alert("Unknown error")
                       }
                    })
            },
            addSection: function() {
                this.DeterminedExam.exam_criteria.push({title: null, criteria: []});
            },
            addCriteria: function(index) {
                this.DeterminedExam.exam_criteria[index].criteria.push({criteria_description: null, criteria_name: null, rating_group: null, show_stopper: false});
            },
            // Check if there are empty fields.
            checkData: function() {
                if (!this.DeterminedExam.exam_title) {return false}
                if (!this.DeterminedExam.exam_cohort) {return false}
                if (!this.DeterminedExam.exam_description) {return false}
                if (this.DeterminedExam.exam_criteria) {
                    for (let indexSection = 0; indexSection < this.DeterminedExam.exam_criteria.length; indexSection++) {
                        if (!this.DeterminedExam.exam_criteria[indexSection].title) {return false}
                        for (let indexCriteria = 0; indexCriteria < this.DeterminedExam.exam_criteria[indexSection].criteria.length; indexCriteria++) {
                            if (!this.DeterminedExam.exam_criteria[indexSection].criteria[indexCriteria].criteria_name) {return false}
                            if (!this.DeterminedExam.exam_criteria[indexSection].criteria[indexCriteria].criteria_description) {return false}
                            if (!this.DeterminedExam.exam_criteria[indexSection].criteria[indexCriteria].rating_group) {return false}
                        }
                    }
                }
                return true;
            },
        }
    }
</script>

<style>
    #DeterminedExam{
        margin-top: 25px;
    }
</style>
