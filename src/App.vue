<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" :to="{ name: 'Index'}" exact>Examen afnemen</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Index'}" exact>Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Afnamens</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <router-link class="dropdown-item" :to="{ name: 'AssessmentsStart'}" exact>Starten</router-link>
              <router-link class="dropdown-item" :to="{ name: 'AssessmentsIndex'}" exact>Inhaken</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Vastgestelde examens</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <router-link class="dropdown-item" :to="{ name: 'DeterminedExams'}" exact>Overzicht</router-link>
              <router-link class="dropdown-item" :to="{ name: 'DeterminedExamAdd'}" exact>Toevoegen</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>

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
</style>
