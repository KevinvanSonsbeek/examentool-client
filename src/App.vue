<template>
  <div id="app">
    <!--<nav role="navigation">-->
      <!--<div id="menuToggle">-->
        <!--<span></span>-->
        <!--<span></span>-->
        <!--<span></span>-->
        <!--<ul id="menu">-->
          <!--<li></li>-->
          <!--<li><router-link to="/" exact v-on:click.native="CloseMenu">About</router-link></li>-->
          <!--<li><router-link to="/" exact v-on:click.native="CloseMenu">Students</router-link></li>-->
          <!--<li><router-link :to="{ name: 'AssessmentsIndex'}" exact v-on:click.native="CloseMenu">Inhaken op afnamen</router-link></li>-->
          <!--<li><router-link to="/AddExam" exact v-on:click.native="CloseMenu">Add exam</router-link></li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<div id="navBar">-->
          <!--<router-link to="/" exact v-on:click.native="CloseMenu">Home</router-link>-->
          <!--<router-link to="/" exact v-on:click.native="CloseMenu">About</router-link>-->
          <!--<router-link to="/" exact v-on:click.native="CloseMenu">Students</router-link>-->
          <!--<router-link :to="{ name: 'AssessmentsIndex'}" exact v-on:click.native="CloseMenu">Inhaken op afnamen</router-link>-->
          <!--<router-link to="/AddExam" exact v-on:click.native="CloseMenu">Add exam</router-link>-->
      <!--</div>-->
    <!--</nav>-->

    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" to="/" exact>Examen afnemen</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'AssessmentsIndex'}" exact>Inhaken op afnamen</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddExam" exact>Add exam</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
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

