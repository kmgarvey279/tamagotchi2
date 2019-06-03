import { tamagotchi } from './../src/tamagotchi.js';

describe('Tamagotchi', function() {
  let pet = tamagotchi;

  beforeEach(function() {
    jasmine.clock().install();
    pet.foodLevel = 10;
    pet.happinessLevel = 15;
    pet.sleepinessLevel = 0;
    pet.namePet("Fido");
    pet.setHunger();
    pet.setHappiness();
    pet.setSleepiness();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should have a name, a food level of 10, a happiness level of 15, and a sleepiness level of 0 when it is created', function() {
    expect(pet.name).toEqual("Fido");
    expect(pet.foodLevel).toEqual(10);
    expect(pet.happinessLevel).toEqual(15);
    expect(pet.sleepinessLevel).toEqual(0);
  });

  it('should have a food level of 7 after 3001 milliseconds', function() {
    jasmine.clock().tick(3001);
    expect(pet.foodLevel).toEqual(7);
  });

  it('should have a happiness level of 12 after 3001 milliseconds', function() {
    jasmine.clock().tick(3001);
    expect(pet.happinessLevel).toEqual(12);
  });

  it('should have a sleepiness level of 3 after 3001 milliseconds', function() {
    jasmine.clock().tick(3001);
    expect(pet.sleepinessLevel).toEqual(3);
  });

  it('should lose an extra happiness point each second the hunger level is higher than 6', function() {
    pet.foodLevel = 6;
    jasmine.clock().tick(1001);
    expect(pet.happinessLevel).toEqual(13);
  });

  it('should die if the food level drops below zero', function() {
    pet.foodLevel = 0;
    expect(pet.isDead()).toEqual(true);
  });

  it('should die if the sleepiness level is 24', function() {
    pet.sleepinessLevel = 24;
    expect(pet.isDead()).toEqual(true);
  });

  it('should die if 10 seconds pass without feeding', function() {
    jasmine.clock().tick(10001);
    expect(pet.isDead()).toEqual(true);
  });

  it('should run away if 15 seconds pass without increasing happiness level', function() {
    jasmine.clock().tick(15001);
    expect(pet.runsAway()).toEqual(true);
  });

  it('should run away if the happiness level drops below zero', function() {
    pet.happinessLevel = 0;
    expect(pet.runsAway()).toEqual(true);
  });

  it('should return that the pet ate treats and the food level should go up by 5', function() {
    pet.foodLevel = 8;
    expect(pet.eatSmall("treats")).toEqual("Your pet ate the treats! Food level goes up 5!");
    expect(pet.foodLevel).toEqual(10);
  });

  it('should not eat if the hunger level is 10 or above.', function() {
    expect(pet.eatSmall("treats")).toEqual("Fido is full, they can't eat anything right now");
  });

  it('should return that the pet played with a ball and the happiness level should go up by 5', function() {
    expect(pet.giveCheapToy("ball")).toEqual("Fido played with the ball! Happiness level goes up by 5!");
  });

  it('should return that the pet as as happy as can be if the happiness level is 30', function() {
    pet.happinessLevel = 29;
    expect(pet.giveCheapToy("ball")).toEqual("Fido played with the ball! Happiness level goes up by 5, Fido is as happy as can be!")
  });

  it('should return that the pet rested and the sleepiness level should go down by five', function() {
    pet.sleepinessLevel = 10;
    expect(pet.shortNap("short nap")).toEqual("Fido took a short nap and rested for 5 hours.");
  });

  it('should not be able to sleep is the sleepiness level is 5 or less', function() {
    pet.sleepinessLevel = 2;
    expect(pet.shortNap("short nap")).toEqual("Fido isn't tired yet.")
  })
});
