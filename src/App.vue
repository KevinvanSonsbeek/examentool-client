<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" fixed>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{name: 'Index'}">Examen afnemen</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Afnamens" right>
            <b-dropdown-item :to="{name: 'AssessmentsStart'}">Starten</b-dropdown-item>
            <b-dropdown-item :to="{name: 'AssessmentsIndex'}">Inhaken</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Beheer" right>
            <b-dropdown-item :to="{name: 'DeterminedExams'}">Vastgestelde examens</b-dropdown-item>
            <b-dropdown-item :to="{name: 'Exams'}">Examens</b-dropdown-item>
            <b-dropdown-item :to="{name: 'DeterminedExamAdd'}">Toevoegen</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!--TODO: Find a way to make it dry-->
    <!--<div class="statusMessages">-->
      <!--<div v-for="statusMessage in statusMessages" :key="statusMessage.index">-->
        <!--<div v-if="statusMessage.type === 'success'" class="alert alert-success alert-dismissible" role="alert">-->
          <!--<strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}-->
          <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
            <!--<span aria-hidden="true">&times;</span>-->
          <!--</button>-->
        <!--</div>-->
        <!--<div v-if="statusMessage.type === 'info'" class="alert alert-info alert-dismissible" role="alert">-->
          <!--<strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}-->
          <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
            <!--<span aria-hidden="true">&times;</span>-->
          <!--</button>-->
        <!--</div>-->
        <!--<div v-if="statusMessage.type === 'warning'" class="alert alert-warning alert-dismissible" role="alert">-->
          <!--<strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}-->
          <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
            <!--<span aria-hidden="true">&times;</span>-->
          <!--</button>-->
        <!--</div>-->
        <!--<div v-if="statusMessage.type === 'error'" class="alert alert-danger alert-dismissible" role="alert">-->
          <!--<strong v-if="statusMessage.code">{{ statusMessage.code }}: </strong>{{ statusMessage.message }}-->
          <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
            <!--<span aria-hidden="true">&times;</span>-->
          <!--</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <main role="main" class="container"><router-view/></main>
  </div>
</template>

<style>
  .title {
    margin-bottom: 15px;
  }

  .searchBar {
    margin-bottom: 15px;
  }

  .exam {
    margin-bottom: 5px!important;
  }

  /* For the status messages */
  .statusMessages
  {
    position: fixed;
    top: 75px;
    right: 10px;
    width: 425px;
    max-width: 95%;
    z-index: 2;
  }
</style>
