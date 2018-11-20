<template>
    <!-- Creates the form for add exam -->
    <div id="AddExam">
        <h3>Add exam:</h3><br>
        <div id="form">
            <p>Exam title:</p><br>
            <input type="text" id="textInput" class="form-control" v-model="exam_title" placeholder="Exam title">
            <p>Exam description:</p><br>
            <input type="text" id="textInput" class="form-control" v-model="exam_description" placeholder="Exam description">
            <p>Exam cohort:</p><br>
            <select v-model="exam_cohort">
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
            </select>
        </div><br>
        <!-- Calls the add exam function -->
        <button class="btn btn-dark" v-on:click="AddExam()">Add new exam</button>
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
          // A check to see if everything is filled in
          if (this.exam_title && this.exam_description && this.exam_cohort) {
              // The post request to the backend with the paramenters for the new exam
              this.$http.post('http://localhost:8000/exam/create', {
                  exam_title: this.exam_title,
                  exam_description: this.exam_description,
                  exam_cohort: this.exam_cohort
              });
              // Send the user to the home page
              this.$router.push('/');
          } else {
              alert("Nog niet alle velden zijn ingevuld.")
          }
        }
    }
};
</script>

<style>

</style>
