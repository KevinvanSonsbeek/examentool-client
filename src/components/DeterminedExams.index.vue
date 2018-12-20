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

          <b-modal :id="'archiveModal-' + Exam._id" title="Weet u het zeker?" @ok="archiveExam(Exam._id)" ok-title="Archiveren"
                   ok-variant="danger" cancel-title="Sluiten">
              <p>Weet u zeker dat u '{{ Exam.exam_title }}' wilt archiveren?</p>
              <p>Als u dit examen archiveert, kunt u dit examen niet meer zien, wijzigen of gebruiken voor afnames.</p>
          </b-modal>
          <div class="list-group-item clearfix align-items-center justify-content-between exam">
              <span class="pull-right">
                  <b-btn variant="danger" class="float-right" v-b-modal="'archiveModal-' + Exam._id" style="margin-right: 5px; margin-top: 5px;">Archiveren</b-btn>
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
                      this._catchException(response);
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
                      this._catchException(response);
                  });
          },
          copyExam:function (id) {
              this.$http.get(`${this.url}/exam/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        this.examToBeCopied = response.body;

                        let data = {};
                        data.exam_title = this.examToBeCopied.exam_title;
                        data.exam_description = this.examToBeCopied.exam_description;
                        data.exam_cohort = this.examToBeCopied.exam_cohort;
                        data.exam_criteria = this.examToBeCopied.exam_criteria;
                        // The post request to the backend with the parameters for the new exam
                        this.$http.post(`${this.url}/exam/create`,  data)
                            .then(response => {
                                if(response.status === 200) {
                                    this.$router.push('/determinedexam');
                                    this.getExams();
                                }
                            })
                            .catch(response => {
                                this._catchException(response);
                            });
                        // Send the user to the home page
                        } else {
                            alert("Nog niet alle velden zijn ingevuld.")
                        }
                })
                .catch(response => {
                    this._catchException(response);
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
