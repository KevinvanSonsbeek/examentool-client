<template>
  <div id="DeterminedExams">
    <h2 class="title">Vastgesteld examens</h2>
    <input type="text" id="examSearch" class="form-control searchBar" v-model="search" placeholder="Zoeken..."/>
    <div class="list-group">
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
      <div v-for="(Exam, index) in FilteredExams" :key="index">
          <div class="modal fade" v-bind:id="'myModal-' + Exam._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Weet u het zeker?</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <p>Weet u zeker dat u '{{ Exam.exam_title }}' wilt archiveren?</p>
                          <p>Als u dit examen archiveert, kunt u dit examen niet meer zien, wijzigen of gebruiken voor afnames.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
                          <button type="button" class="btn btn-danger" v-on:click="archiveExam(Exam._id)" data-dismiss="modal">Archiveren</button>
                      </div>
                  </div>
              </div>
          </div>
          <div class="list-group-item clearfix align-items-center justify-content-between exam">
              <span class="pull-right">
                  <button type="button" class="btn btn-danger float-right" data-toggle="modal" :data-target="'#myModal-' + Exam._id" style="margin-right: 5px; margin-top: 5px;">Archiveren</button>
                  <button type="button" class="btn btn-warning float-right" v-on:click="copyExam(Exam._id)" style="margin-right: 5px; margin-top: 5px;">Kopiëren</button>
                  <router-link class="btn float-right" :to="{ name: 'DeterminedExamEdit', params: { examId: Exam._id }}" v-bind:class="{disabled: !Exam.editable, 'btn-primary': Exam.editable, 'btn-secondary': !Exam.editable }" style="margin-right: 5px; margin-top: 5px;">Wijzigen</router-link>
              </span>
              <div>{{ Exam.exam_title }}</div>
              <div>Cohort: {{ Exam.exam_cohort }}</div>
          </div>
      </div>
    </div>
    <router-link class="btn btn-primary" :to="{ name: 'DeterminedExamAdd'}" style="margin-bottom: 15px;">Nieuw vastgesteld examen</router-link>
  </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        // Function needed for the data
        data () {
            return {
                search: '',
                DeterminedExams: []
            }
        },
        // Function called at creation of the page
        created () {
            this.getExams();
        },
        methods:{
          getExams:function(){
              // Get all Determined Exams
              this.$http.get(`${this.url}/exams/full`)
                  .then(response => {
                      // Succeed
                      if(response.status === 200){
                          this.DeterminedExams = response.body;
                      }
                  })
                  .catch(response => {
                      // Failed
                      if(response.status === 0) {
                          this._addStatusMessage('warning', 'Geen verbinding met server');
                      } else if(response.status === 500){
                          this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                      } else {
                          this._addStatusMessage('error', 'Onbekende foutmelding');
                          console.log(new Error(response))
                      }
                  });
          },
          archiveExam:function (id) {
              this.$http.get(`${this.url}/exam/${id}/archive`)
                  .then(response => {
                      //Succeed
                      if (response.status === 200) {
                          this.getExams();
                      }
                  })
                  .catch(response => {
                      //failed
                      if (response.status === 404) {
                          this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                      } else if (response.status === 500) {
                          this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                      } else if (response.status === 405) {
                          this._addStatusMessage('warning', 'Er is nog een lopende afname. Kan het examen niet archiveren');
                      } else {
                          this._addStatusMessage('error', 'Onbekende foutmelding');
                          console.log(new Error(response));
                      }
                  });
          },
          copyExam:function (id) {
              this.$http.get(`${this.url}/exam/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        this.examToBeCopied = response.body;

                        let data = {};
                        data['exam_title'] = this.examToBeCopied.exam_title;
                        data['exam_description'] = this.examToBeCopied.exam_description;
                        data['exam_cohort'] = this.examToBeCopied.exam_cohort;
                        data['exam_criteria'] = this.examToBeCopied.exam_criteria;
                        // The post request to the backend with the parameters for the new exam
                        this.$http.post(`${this.url}/exam/create`,  data)
                            .then(response => {
                                if(response.status === 200) {
                                    this.$router.push('/determinedexam');
                                    this.getExams();
                                }
                            })
                            .catch(response => {
                                if(response.status === 0) {
                                    this._addStatusMessage('warning', 'Geen verbinding met server');
                                } else if(response.status === 500){
                                    this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                                } else {
                                    this._addStatusMessage('error', 'Onbekende foutmelding');
                                    console.log(new Error(response))
                                }
                            });
                        // Send the user to the home page
                        } else {
                            alert("Nog niet alle velden zijn ingevuld.")
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
          }
        },
        computed: {
            // For filtering the examns for the search function
            FilteredExams() {
                return this.DeterminedExams.filter(Exam => {
                    return Exam.exam_title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
}
</script>

<style>

</style>
