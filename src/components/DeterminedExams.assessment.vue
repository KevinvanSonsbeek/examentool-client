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
        <div id="sectionsDiv">
          <table id="sectionTables" class="table sectionTable">
            <tbody class="" v-for="(section, sectionIndex) in sections"><br><br>
            <tr>
                <td class="sectionHeader">{{ section.title }}</td>
              </tr>
              <tr>
                <td>Vraag:</td>
                <td>Wel:</td>
                <td>Niet:</td>
                <td>Twijfel:</td>
                <td>Notitie:</td>
              </tr>

                <tr v-for="criteria in section.criteria" v-bind:id="criteria.criteria_name + 'Element'">
                  <td v-b-toggle="criteria.criteria_name" variant="primary">{{ criteria.criteria_name }}
                    <b-collapse v-bind:id="criteria.criteria_name" class="mt-2">
                      <b-card>
                        <p class="card-text">{{ criteria.criteria_description }}</p>
                      </b-card>
                    </b-collapse>
                  </td>

                  <td><input class="form-check-input" v-bind:name="criteria.criteria_name" id="wel" type="radio" value="option1"></td>
                  <td><input class="form-check-input" v-bind:name="criteria.criteria_name" id="niet" type="radio" value="option2"></td>
                  <td><input class="form-check-input" type="checkbox" value=""></td>
                  <td><textarea rows="2" cols="9"></textarea></td>
                  <td></td>
                </tr>

            </tbody><br><br>
          </table>
        </div>
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
    created () {
        // Check if there wis web storage support
        this.webStorageSupport = typeof(Storage) !== "undefined";
        let localStorageData = JSON.parse(localStorage.getItem('assessment-' + this.$route.params.examId));

        this.$http.post('http://localhost:8000/assessment/' + this.$route.params.examId + '/join', {examinator_name: "name"}).then(response => {
            // Succeed
            var serverVersionTime = new Date(response.data.updated_at).getTime();
            if(localStorageData != null)
            {
                if(serverVersionTime > localStorageData.lastUpdate)
                {
                    this.sections = response.body[0].exam_criteria
                    localStorage.setItem('assessment-' + this.$route.params.examId, JSON.stringify({
                        lastUpdate: Date.now(),
                        data: response.body,
                        justCreated: true
                    }));
                }else
                {
                    this.sections = localStorageData.data[0].exam_criteria;
                }
            }else
            {
                this.sections = response.body[0].exam_criteria
                localStorage.setItem('assessment-' + this.$route.params.examId, JSON.stringify({
                    lastUpdate: Date.now(),
                    data: response.body,
                    justCreated: true
                }));
            }
        }, response => {
            // Failed
            if (response.status === 404) {
                console.log(404)
            } else if (response.status === 500) {
                console.log(500)
            } else {
                console.log("unknown error")
            }
            // Server not available, using local storage
            // this.exam = localStorageData.data;
            // this.sections = localStorageData.data.exam_criteria;
            // TODO: Logic for server not available
            alert("failed");
        });

        localStorage.setItem('assessment-' + this.$route.params.examId, JSON.stringify(localStorageData))
    },
  methods: {
    // Data has been entered and continue button clicked
    StartAssignment: function() {
        document.getElementById("infoTable").style.display = "none";
        document.getElementById("sectionsDiv").style.display = "block";
        let examId = 'assessment-' + this.$route.params.examId;
        let examObject = JSON.parse(localStorage.getItem((examId)));
        // For each section
        for(let section in this.sections)
        {
            // For each criteria in the sections
            for(let curCriteria in this.sections[section].criteria)
            {
                let criteriaName = this.sections[section].criteria[curCriteria].criteria_name;
                // Look for local storage data and alter inputs accordingly
                if(examObject.data[0].exam_criteria[section].criteria[curCriteria].rating_group == true)
                {
                    document.getElementById(criteriaName + "True").checked = true;
                }else if(examObject.data[0].exam_criteria[section].criteria[curCriteria].rating_group == false)
                {
                    document.getElementById(criteriaName + "False").checked = true;
                }
                if(examObject.data[0].exam_criteria[section].criteria[curCriteria].doubt == true)
                {
                    document.getElementById(criteriaName + "Doubt").checked = true;
                }
            }
        }
    },

    // Save answers in local storage
    SaveStorage: function(type, section, criteria, string, status) {
        let examId = 'assessment-' + this.$route.params.examId;
        let examObject = JSON.parse(localStorage.getItem((examId)));
        // Act according to type
        if(type == "radio"){
            examObject.data[0].exam_criteria[section].criteria[criteria].rating_group = status;
        }else if(type == "checkbox")
        {
            if(document.getElementById(string).checked == true)
            {
                examObject.data[0].exam_criteria[section].criteria[criteria].doubt = true;
            }else if(document.getElementById(string).checked == false)
            {
                examObject.data[0].exam_criteria[section].criteria[criteria].doubt = false;
            }
        }
        localStorage.setItem(examId, JSON.stringify(examObject))
    }
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
  }
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
    padding: 15px 0px 5px 0px;
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
<!--<style>-->
  <!--#infoTable {-->
    <!--width: 600px;-->
    <!--margin: auto;-->
  <!--}-->
  <!--#infoTable input {-->
    <!--width: 200px;-->
  <!--}-->
  <!--#sectionsDiv{-->
    <!--display: none;-->
    <!--margin: auto;-->
    <!--width: 800px!important;-->
  <!--}-->
  <!--.sectionHeader {-->
    <!--background: lightgrey;-->
    <!--width: 100%;-->
  <!--}-->
  <!--.card {-->
    <!--border: 1px solid lightgray;-->
    <!--border-radius: 5px;-->
    <!--padding: 20px;-->
    <!--min-width: 400px;-->
    <!--margin: 0px auto;-->
    <!--vertical-align: middle!important;-->
    <!--background: white;-->
  <!--}-->
<!--</style>-->
