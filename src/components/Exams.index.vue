<template>
  <div id="Exams">
      <h2 class="title">Examens</h2>
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
          <div class="list-group-item clearfix align-items-center justify-content-between exam">
              <span class="pull-right">
                  <b-btn variant="info" class="float-right" v-on:click="establishExam(Exam._id)" style="margin-right: 5px; margin-top: 5px;">Vaststellen</b-btn>
                  <router-link class="btn float-right" :to="{ name: 'DeterminedExamEdit', params: { examId: Exam._id }}" v-bind:class="{disabled: !Exam.editable, 'btn-primary': Exam.editable, 'btn-secondary': !Exam.editable }" style="margin-right: 5px; margin-top: 5px;">Wijzigen</router-link>
              </span>
              <div>{{ Exam.exam_title }}</div>
              <div>Cohort: {{ Exam.exam_cohort }}</div>
          </div>
      </div>
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
          establishExam:function(id) {
              this.$http.get(`${this.url}/exam/${id}/establish`)
              .then(response => {
                  // Succeed
                  console.log(response)
              })
              .catch(response => {
                  this._catchException(response)
              })
          },
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