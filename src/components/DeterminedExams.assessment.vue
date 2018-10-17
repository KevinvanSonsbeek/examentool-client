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
                <td>Uitleg:</td>
                <td>Notitie:</td>
                </tr>
                <tr v-for="(criteria, criteriaIndex) in section.criteria">
                    <td v-bind:id="criteria.criteria_name + 'Title'">{{ criteria.criteria_name }}</td>
                    <td><input class="form-check-input" v-on:change="SaveStorage('radio', sectionIndex, criteriaIndex, criteria.criteria_name, 'true')" v-bind:name="criteria.criteria_name" v-bind:id="criteria.criteria_name + 'true'" type="radio" value="option1"></td>
                    <td><input class="form-check-input" v-on:change="SaveStorage('radio', sectionIndex, criteriaIndex, criteria.criteria_name, 'false')" v-bind:name="criteria.criteria_name" v-bind:id="criteria.criteria_name + 'false'" type="radio" value="option2"></td>
                    <td><input class="form-check-input" v-on:change="SaveStorage('checkbox', sectionIndex, criteriaIndex, criteria.criteria_name + 'Doubt', 'doubt')" v-bind:id="criteria.criteria_name + 'Doubt'" type="checkbox" value=""></td>
                <td><button v-on:click="showInfo(criteria.criteria_description)">?</button></td>
                </tr>
            </tbody>
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

        if (!localStorageData.justCreated) {
            // API call
            this.$http.get('http://localhost:8000/assessment/' + this.$route.params.examId + '/join').then(response => {
                // Succeed
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
                this.exam = localStorageData.data;
                this.sections = localStorageData.data.exam_criteria;
                // TODO: Logic for server not available
            });
        } else {
            this.exam = localStorageData.data;
            this.sections = localStorageData.data.exam_criteria;
            localStorageData.justCreated = false;
        }
        localStorage.setItem('assessment-' + this.$route.params.examId, JSON.stringify(localStorageData))
    },
  methods: {
    // Data has been entered and continue button clicked
    StartAssignment: function() {
        document.getElementById("infoTable").style.display = "none";
        document.getElementById("sectionsDiv").style.display = "block";

        // For each section
        for(let section in this.sections)
        {
            // For each criteria in the sections
            for(let curCriteria in this.sections[section].criteria)
            {
                let criteriaName = this.sections[section].criteria[curCriteria].criteria_name;
                // Look for local storage data and alter inputs accordingly
                if(localStorage.getItem(criteriaName) == "true")
                {
                    document.getElementById(criteriaName + "true").checked = true;
                }else if(localStorage.getItem(criteriaName) == "false")
                {
                    document.getElementById(criteriaName + "false").checked = true;
                }
                if(localStorage.getItem(criteriaName + "Doubt") == "checked")
                {
                    document.getElementById(criteriaName + "Doubt").checked = true;
                }
            }
        }
    },
    // Save answers in local storage
    SaveStorage: function(type, section, criteria, string, status) {
        let examId = 'assessment-' + this.$route.params.examId;
        let examArray = JSON.parse(localStorage.getItem((examId)));

        if(type == "radio"){
            examArray.data.exam_criteria[section].criteria[criteria].rating_group = status;
        }else if(type == "checkbox")
        {
            if(document.getElementById(string).checked == true)
            {
                //localStorage.setItem(this.$route.params.examId[section].criteria[criteria].string, "checked");
            }else if(document.getElementById(string).checked == false)
            {
                //localStorage.setItem(this.$route.params.examId[section].criteria[criteria].string, "notChecked")
            }
        }
        localStorage.setItem(examId, JSON.stringify(examArray))
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
  #sectionsDiv{
    display: none;
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
