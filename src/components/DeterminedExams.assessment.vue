<template>
    <div id="DeterminedExams">
      <!-- This is the form shown before the start of a exam -->
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
              <button id="infoContinue" v-on:click="startAssignment" type="button" class="btn btn-primary">Volgende</button>
          </tbody>
        </table>

          <table id="sectionTables" class="table sectionTable">
            <!-- For every section it creates a new table -->
            <tbody class="" v-for="section in sections"><br><br>
            <tr>
                <td class="sectionHeader">{{ section.title }}</td>
              </tr>
              <tr>
                <td>Vraag:</td>
                <td>Wel:</td>
                <td>Niet:</td>
                <td>Twijfel:</td>
                <td>Uitleg:</td>
                <td>Notitie:</td>
              </tr>
              <!-- For every criteria it creates a table row with the name and options -->
              <tr v-for="criteria in section.criteria">
                <td>{{ criteria.criteria_name }}</td>
                <td><input class="form-check-input" v-bind:name="criteria.criteria_name" id="wel" type="radio" value="option1"></td>
                <td><input class="form-check-input" v-bind:name="criteria.criteria_name" id="niet" type="radio" value="option2"></td>
                <td><input class="form-check-input" type="checkbox" value=""></td>
                <td><button v-on:click="showInfo(criteria.criteria_description)">?</button></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div id="cardDiv"></div>
          
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
    startAssignment: function() {
      document.getElementById("infoTable").hidden = true;
      document.getElementById("sectionTables").style.display = "block";
    },
    showInfo: function(description) {
      alert(description);
    }
  }
};
</script>

<style>
  #infoTable {
    width: 600px;
    margin: auto;
  }
  #infoTable input {
    width: 200px;
  }
  #sectionTables{
    display: none;
  }
  .sectionTable {
    margin: auto;
    width: 800px!important;
  }
  .sectionHeader {
    background: lightgrey;
    width: 100%;
  }
  .card {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 20px;
    min-width: 400px;
    margin: 0px auto;
    vertical-align: middle!important;
    background: white;
  }
</style>
