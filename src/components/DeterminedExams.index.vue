<template>
  <div id="DeterminedExams">
    <input type="text" id="examSearch" class="form-control" v-model="search" placeholder="Search for exam.."/>
    <div class="list-group">
      <div v-for="Exam in FilteredExams" class="">
        <!--<a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#exampleModalCenter">{{ Exam.exam_title }}</a>-->
        <router-link :to="{ name: 'AssessmentsNew', params: { examId: Exam._id }}">{{ Exam.exam_title }}</router-link>
      </div>
    </div>

    <!--WIP-->
    <!--&lt;!&ndash; Modal &ndash;&gt;-->
    <!--<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">-->
      <!--<div class="modal-dialog" role="document">-->
        <!--<div class="modal-content">-->
          <!--<div class="modal-header">-->
            <!--<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>-->
            <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
              <!--<span aria-hidden="true">&times;</span>-->
            <!--</button>-->
          <!--</div>-->
          <!--<div class="modal-body">-->
            <!--hoi-->
          <!--</div>-->
          <!--<div class="modal-footer">-->
            <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
            <!--<button type="button" class="btn btn-primary">Save changes</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
    export default {
        name: 'DeterminedExam',
        search: '',
        head: {
            script: [
                {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
            ]
        },
        // Function needed for the data
        data () {
            return {
                search: '',
                DeterminedExams: []
            }
        },
        // Function called at creation of the page
        created () {
            // API call
            this.$http.get('http://localhost:8000/exams/full').then(response => {
                // Succeed
                this.DeterminedExams = response.body
            }, response => {
                // Failed
                if (response.status === 404) {
                    alert(404)
                } else if (response.status === 500) {
                    alert(500)
                } else {
                    alert("unknown error")
                }
            });
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

    // $('#exampleModalCenter').on('shown.bs.modal', function () {
    //     $('#exampleModalLong').trigger('focus')
    // })
</script>