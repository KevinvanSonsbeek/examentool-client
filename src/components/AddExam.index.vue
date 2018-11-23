<template>
    <!-- Creates the form for add exam -->
    <div id="AddExam">
        <h3>Nieuw examen toevoegen</h3><br>
        <form>
            <div class="form-group">
                <label>Titel:</label>
                <input type="textarea" v-model="exam_title" class="form-control" placeholder="Titel...">
            </div>
            <div class="form-group">
                <label for="comment">Beschrijving:</label>
                <textarea class="form-control" v-model="exam_description" rows="5" placeholder="Beschrijving..."></textarea>
            </div>
            <div class="form-group">
                <label>Cohort:</label>
                <select class="form-control" v-model="exam_cohort">
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="AddExam()">Toevoegen</button>
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
