

<script>
export default {
  methods: {
    CloseMenu: function() {
      document.getElementById("menuToggler").checked = false;
    }
  }
}
</script>
<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" id="menuToggler"/>
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <li><router-link to="/" exact v-on:click.native="CloseMenu">Home</router-link></li>
          <li><router-link to="/" exact v-on:click.native="CloseMenu">Exams</router-link></li>
          <li><router-link to="/" exact v-on:click.native="CloseMenu">About</router-link></li>
          <li><router-link to="/" exact v-on:click.native="CloseMenu">Students</router-link></li>
          <li><router-link :to="{ name: 'AssessmentsIndex'}" exact v-on:click.native="CloseMenu">Inhaken op afnamen</router-link></li>
          <li><router-link to="/AddExam" exact v-on:click.native="CloseMenu">Add exam</router-link></li>
        </ul>
      </div>
      <div id="navBar">
          <router-link to="/" exact v-on:click.native="CloseMenu">Home</router-link>
          <router-link to="/" exact v-on:click.native="CloseMenu">Exams</router-link>
          <router-link to="/" exact v-on:click.native="CloseMenu">About</router-link>
          <router-link to="/" exact v-on:click.native="CloseMenu">Students</router-link>
          <router-link :to="{ name: 'AssessmentsIndex'}" exact v-on:click.native="CloseMenu">Inhaken op afnamen</router-link>
          <router-link to="/AddExam" exact v-on:click.native="CloseMenu">Add exam</router-link>
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

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body
{
  margin: 0;
  padding: 0;
  padding-bottom: 100px;
  background: #232323;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
}

a
{
  text-decoration: none;
  color: #232323;

  transition: color 0.3s ease;
}

a:hover
{
  color: tomato;
}
#menuToggle
{
  display: block;
  position: relative;
  top: 12px;
  left: 10px;

  z-index: 1;

  -webkit-user-select: none;
  user-select: none;
}
@media (max-width: 850px)
{
  #navBar{
    display: none;
  }
}
@media (min-width: 850px)
{
  #menuToggle{
    display: none;
  }
  #navBar{
    display: block;
    background-color: lightgray;
    height: 35px;
    width: 100%;
    padding-left: 25%;
    margin: auto;
    display: flex;
    flex-direction: row;
  }
  #navBar a
  {
    margin-right: 25px;
    line-height: 35px;
    color: black;
  }
}
#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;

  cursor: pointer;

  opacity: 0;
  z-index: 2;

  -webkit-touch-callout: none;
}
#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background: #cdcdcd;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
  opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}
#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}
#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}
#menu
{
  position: absolute;
  width: 100%;
  margin: -50px 0 0 -10px;
  padding: 20px;
  padding-top: 50px;

  background: lightgrey;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;

  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.25s cubic-bezier(0.77,0.2,0.05,1.0);
}
#menu li
{
  padding: 5px 0;
  font-size: 17px;
}
#menuToggle input:checked ~ ul
{
  transform: none;
}
  /* For the status messages */
  .statusMessages
  {
    position: fixed;
    right: 10px;
    width: 425px;
    max-width: 95%;
  }

</style>
<style>
  #DeterminedExams{
    width: 50%;
    margin: auto;
    margin-top: 25px;
    background: lightyellow;
    min-width: 425px;
    padding: 30px;
    padding-top: 25px;
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
    width: 90%!important;
  }
  .table{

    }
  .sectionTable {
    margin: auto;
    width: 50%;
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
