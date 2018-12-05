<template>
  <div id="DeterminedExams">
    <h2 class="title">Vastgesteld examens</h2>
    <input type="text" id="examSearch" class="form-control searchBar" v-model="search" placeholder="Zoeken..."/>
    <div class="list-group">
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
                  <router-link class="btn btn-primary float-right" :to="{ name: 'DeterminedExamEdit', params: { examId: Exam._id }}" style="margin-right: 5px; margin-top: 5px;">Wijzigen</router-link>
              </span>
              <div>{{ Exam.exam_title }}</div>
              <div>Cohort: {{ Exam.exam_cohort }}</div>
          </div>
      </div>
    </div>
    <router-link class="btn btn-primary" :to="{ name: 'DeterminedExamAdd'}" style="margin-bottom: 15px;">Nieuw vastgesteld examen</router-link>

    <!--WIP-->
    <!--&lt;!&ndash; Modal &ndash;&gt;-->
    <!--<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">-->
      <!--<div class="modal-dialog" role="document">-->
        <!--<div class="modal-content">-->
          <!--<div class="modal-header">-->
            <!--<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>-->
            <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
              <!--<span aria-hidden="true">&times;</span>-->
            <!--</button>-->
          <!--</div>-->
          <!--<div class="modal-body">-->
            <!--hoi-->
          <!--</div>-->
          <!--<div class="modal-footer">-->
            <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
            <!--<button type="button" class="btn btn-primary">Save changes</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        head: {
            script: [
                {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
            ]
        },
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
              // API call
              this.$http.get('http://localhost:8000/exams/full').then(response => {
                  // Succeed
                  this.DeterminedExams = response.body
              }, response => {
                  // Failed
                  if (response.status === 404) {
                      this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                  } else if (response.status === 500) {
                      this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                  } else {
                      this._addStatusMessage('error', 'Onbekende foutmelding');
                      console.log(new Error(response));
                  }
              });
          },
          archiveExam:function (id) {
              this.$http.get('http://localhost:8000/exam/'+ id +'/archive').then(response => {
                  //Succeed
                  if (response.status === 200) {
                      this.getExams();
                      //failed
                  } else if (response.status === 404) {
                      this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                  } else if (response.status === 500) {
                      this._addStatusMessage('error', this._checkForStatusMessagesString(response.status, response.statusText), response.status);
                  } else {
                      this._addStatusMessage('error', 'Onbekende foutmelding');
                      console.log(new Error(response));
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
