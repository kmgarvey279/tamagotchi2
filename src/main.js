$(document).ready(function() {
  $("form#start").submit(function(event) {
    event.preventDefault();
    let petName = $("#name").val();
    let petSpecies = $("#species").val();
    let newPet = new Tamagotchi(petName);
    newPet.setType(petSpecies);
    if (newPet.species == bulbasaur) {
      $("#petImage").append('<img src="img/Bulbasaur.png" weight="200px" height="200px" />');
    } else if (newPet.species == charmander) {
      $("#petImage").append('<img src="img/Charmander.png" weight="200px" height="200px" />');
    } else {
      $("#petImage").append('<img src="img/Squirtle.png" weight="200px" height="200px" />');
    }
    $("#start").hide();
    $("#game").show();
  });
});
