<template>
    <div id="DeterminedExam">
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
                    <div v-for="criteria_section in DeterminedExam.exam_criteria" :key="criteria_section.index">
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
                                <tr v-for="criteria in criteria_section.criteria" :key="criteria.index">
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
                    </div>
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
                .catch(err => {
                    console.log(err);
                })
        },
        methods: {
            /**
             * Send update for determined exam
             */
            updateDeterminedExam: function() {
                console.log(this.DeterminedExam);

                this.$http.put(`http://localhost:8000/exam/${this.DeterminedExam._id}`, this.DeterminedExam)
                    .then(response => {
                        if(response.status === 200) {
                            alert("Successfull update");
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
            }
        }
    }
</script>

<style>

</style>
