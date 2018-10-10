<template>
    <div id="DeterminedExams">
        <table id="infoTable" class="table">
          <tbody>
              <tr>
                <td>Datum:</td>
                <td><input placeholder="09/10/2018" type="date"></td>
              </tr>
              <tr>
                <td>Kandidaat:</td>
                <td><input placeholder="Leerling" type="text"></td>
              </tr>
              <tr>
                <td>Examinator:</td>
                <td><input placeholder="J. Slemmer" type="text"></td>
              </tr>
              <button id="infoContinue" v-on:click="StartAssignment" type="button" class="btn btn-primary">Volgende</button>
          </tbody>
        </table>

          <table class="table sectionTable">
            <tbody class="" v-for="section in sections"><br><br>
            <tr>
                <td class="sectionHeader">{{ section.title }}</td>
              </tr>
              <tr>
                <td>Vraag:</td>
                <td>Wel:</td>
                <td>Niet:</td>
                <td>Twijfel:</td>
              </tr>
              <tr v-for="criteria in section.criteria">
                <td>{{ criteria.criteria_name }}</td>
                <td><input class="form-check-input" type="radio" value="option1"></td>
                <td><input class="form-check-input" type="radio" value="option2"></td>
                <td><input class="form-check-input" type="checkbox" value=""></td>
              </tr>
            </tbody>
          </table>
    </div>
</template>

<script>
export default {
  name: "DeterminedExam",
  search: "",
  // Function needed for the data
  data() {
    return {
      sections: []
    };
  },
  // Function called at creation of the page
  created() {
    // API call



    this.$http
      .get("http://localhost:8000/exam/" + this.$route.params.examId + "/start")
      .then(
        response => {
          // Succeed
          this.sections = response.body.exam_criteria;
          console.log(this.sections);
        },
        response => {
          // Failed
          if (response.status === 404) {
            alert(404);
          } else if (response.status === 500) {
            alert(500);
          } else {
            alert("unknown error");
          }
        }
      );
  },
  methods: {
    StartAssignment: function() {
      document.getElementById("infoTable").hidden = true;
      document.getElementById("sections").hidden = false;
    }
  }
};
</script>

<style>
  #infoTable {
    width: 600px;
    margin: auto;
    display: none;
  }
  #infoTable input {
    width: 200px;
  }
  #sections {
    /* display: none; */
  }
  .sectionTable {
    margin: auto;
    width: 800px!important;
  }
  .sectionHeader {
    background: lightgrey;
  }
</style>
