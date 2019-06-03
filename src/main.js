$(document).ready(function() {
  $("form#start").submit(function(event) {
    event.preventDefault();
    let petName = $("#name").val();
    let petSpecies = $("#species").val();
    let newPet = new Tamagotchi(petName);
    newPet.setType(petSpecies);
  })
})
