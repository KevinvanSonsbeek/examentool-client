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
              <button id="infoContinue" v-on:click="startAssignment" type="button" class="btn btn-primary">Volgende</button>
          </tbody>
        </table>

          <table id="sectionTables" class="table sectionTable">
            <tbody class="" v-for="section in sections">
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
              <tr v-for="criteria in section.criteria">
                <td>{{ criteria.criteria_name }}</td>
                <td><input class="form-check-input" v-bind:name="criteria.criteria_name" id="wel" type="radio" value="option1"></td>
                <td><input class="form-check-input" v-bind:name="criteria.criteria_name" id="niet" type="radio" value="option2"></td>
                <td><input class="form-check-input" type="checkbox" value=""></td>
                <td><button v-on:click="showInfo(criteria.criteria_description)">?</button></td>
                <td></td>
              </tr>
            </tbody><br><br>
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
    
  }
};
</script>

<style>

  #DeterminedExams{
      width: 50%;
      margin: auto;
      margin-top: 75px;
      background: lightyellow;
      min-width: 425px;
      padding: 30px;
      padding-top: 40px;
      border-radius: 15px;
  }
  #DeterminedExams a{
      color: black;
  };
  #infoTable {
    width: 50%;
    max-width: 600px;
    min-width: 200px;
    margin: auto;
    margin-top: 5px;
  }
  #infoTable input {
    width: 200px;
  }
  #sectionTables{
    display: none;
  }
  .table{
    max-width: 500px;
    min-width: 200px;
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
  #examSearch{
      width: 75%;
      min-width: 100px;
      max-width: 200px;
      margin: auto;
      margin-bottom: 30px;
  }
  @media (max-width: 850px)
  {
    /*mobile*/
  }
</style>
