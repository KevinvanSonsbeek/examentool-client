<template>
    <!-- Creates the form for add exam -->
    <div id="AddExam">
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

        <h2>Nieuw examen toevoegen</h2>
        <form>
            <div class="form-group">
                <label>Titel:</label>
                <input type="textarea" v-model="exam_title" class="form-control" placeholder="Titel...">
            </div>
            <div class="form-group">
                <label>Beschrijving:</label>
                <textarea class="form-control" v-model="exam_description" rows="5" placeholder="Beschrijving..."></textarea>
            </div>
            <div class="form-group">
                <label>Cohort:</label>
                <select class="form-control" v-model="exam_cohort" placeholder="2018">
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary" v-on:click="AddExam()">Toevoegen</button>
        </form>
    </div>
</template>

<script>
export default {
  name: "AddExam",
  data() {
    return {
        exam_title: '',
        exam_description: '',
        exam_cohort: ''
    };
  },
  methods: {
      // Function for adding a new exam
      AddExam: function () {
          //TODO:
          //Change alerts to alert system!!!


          // A check to see if everything is filled in
          if (this.exam_title && this.exam_description && this.exam_cohort) {
              let data = {};
              data['exam_title'] = this.exam_title;
              data['exam_description'] = this.exam_description;
              data['exam_cohort'] = this.exam_cohort;
              // The post request to the backend with the parameters for the new exam
              this.$http.post(`${this.url}/exam/create`,  data)
                  .then(response => {
                      if(response.status === 200) {
                        this.$router.push('/determinedexam');
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
        }
    }
};
</script>

<style>

</style>
