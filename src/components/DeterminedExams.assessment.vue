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
                    <td v-bind:id="criteria.criteria_name + 'Title'">{{ criteria.criteria_name }}</td>
                    <td><input class="form-check-input" v-on:change="SaveStorage('radio', criteria.criteria_name, 'true')" v-bind:name="criteria.criteria_name" v-bind:id="criteria.criteria_name + 'true'" type="radio" value="option1"></td>
                    <td><input class="form-check-input" v-on:change="SaveStorage('radio', criteria.criteria_name, 'false')" v-bind:name="criteria.criteria_name" v-bind:id="criteria.criteria_name + 'false'" type="radio" value="option2"></td>
                    <td><input class="form-check-input" v-on:change="SaveStorage('checkbox', criteria.criteria_name + 'Doubt', 'doubt')" v-bind:id="criteria.criteria_name + 'Doubt'" type="checkbox" value=""></td>
                </tr>
            </tbody>
            </table>
        </div>
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
          console.log(response);
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
    //Data has been entered and continue button clicked
    StartAssignment: function() {
        document.getElementById("infoTable").style.display = "none";
        document.getElementById("sectionsDiv").style.display = "block";

        //For each section
        for(var section in this.sections)
        {
            //For each criteria in the sections
            for(var curCriteria in this.sections[section].criteria)
            {
                var criteriaName = this.sections[section].criteria[curCriteria].criteria_name;
                //Look for local storage data and alter inputs accordingly
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
    //Save answers in local storage
    SaveStorage: function(type, string, status) {
        if(type == "radio"){
            localStorage.setItem(string, status);
        }else if(type == "checkbox")
        {
            if(document.getElementById(string).checked == true)
            {
                localStorage.setItem(string, "checked");
            }else if(document.getElementById(string).checked == false)
            {
                localStorage.setItem(string, "notChecked")
            }
        }
    }
  }
};
</script>

<style>
  #infoTable {
    width: 600px;
    margin: auto;
    /* display: none; */
  }
  #infoTable input {
    width: 200px;
  }
  #sectionsDiv {
    display: none;
  }
  .sectionTable {
    margin: auto;
    width: 800px!important;
  }
  .sectionHeader {
    background: lightgrey;
  }
</style>
