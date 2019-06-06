import { Tamagotchi } from './tamagotchi.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

let newPet = new Tamagotchi("");

function createPet(name, species){
  newPet.setName(name);
  newPet.setSpecies(species);
  $("#petName").append(name);
  $("#petSpecies").append(species);
  if (species == "Bulbasaur") {
    $("#petImage").append('<img src="img/Bulbasaur.png" weight="200px" height="200px" />');
  } else if (species == "Charmander") {
    $("#petImage").append('<img src="img/Charmander.png" weight="200px" height="200px" />');
  } else {
    $("#petImage").append('<img src="img/Squirtle.png" weight="200px" height="200px" />');
  }
}

function startTimer(){
  $("#display-time").empty().append("0:00");
  let hour = 0;
  let minute = 0;
  let newTimer = setInterval(function() {
    minute++
    if(minute > 59){
      minute = 0;
      hour++;
    }
    if(minute < 10){
      $("#display-time").empty().append(hour + ":0" + minute);
    } else {
      $("#display-time").empty().append(hour + ":" + minute);
    }
    $("#hunger-log").empty().append(newPet.setHunger());
    $("#hunger-bar").val(newPet.foodLevel);
    $("#exercise-log").empty().append(newPet.setExercise());
    $("#sleep-log").empty().append(newPet.setSleepiness());
    $("#happiness-log").empty().append(newPet.setHappiness());
  }, 1000);
}


$(document).ready(function() {
  $("form#start").submit(function(event) {
    event.preventDefault();
    let petName = $("#name").val();
    let petSpecies = $("input[name='select-pokemon']:checked").val();
    createPet(petName, petSpecies);
    startTimer();
    $("form#start").hide();
    $(".game").show();
  });

  $("form#feed").submit(function(event) {
    event.preventDefault();
    let foodType = $("input[name='food-type']:checked").val();
    if (foodType == "small treat") {
      $("#text-box").append(newPet.eatSmall(foodType));
    } else if (foodType == "bowl of food") {
      $("#text-box").append(newPet.eatMedium(foodType));
    } else {
      $("#text-box").append(newPet.eatFavorite(foodType));
    }
  });

  $("form#play").submit(function(event) {
    event.preventDefault();
    let toyType = $("input[name='toy-type']:checked").val();
    if (toyType == "ball") {
      $("#text-box").append(newPet.giveCheapToy(toyType));
    } else {
      $("#text-box").append(newPet.giveExpensiveToy(toyType));
    }
  });

  $("form#sleep").submit(function(event) {
    event.preventDefault();
    let foodType = $("input[name='food-type']:checked").val();
    if (foodType == "small treat") {
      $("#text-box").append(newPet.eatSmall(foodType));
    } else if (foodType == "bowl of food") {
      $("#text-box").append(newPet.eatMedium(foodType));
    } else {
      $("#text-box").append(newPet.eatFavorite(foodType));
    }
  });

  $("form#exercise").submit(function(event) {
    event.preventDefault();
    let foodType = $("input[name='food-type']:checked").val();
    if (foodType == "small treat") {
      $("#text-box").append(newPet.eatSmall(foodType));
    } else if (foodType == "bowl of food") {
      $("#text-box").append(newPet.eatMedium(foodType));
    } else {
      $("#text-box").append(newPet.eatFavorite(foodType));
    }
  });

});
