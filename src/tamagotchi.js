export let tamagotchi = {
  namePet: function(inputtedName) {
    this.name = inputtedName;
  },
  foodLevel: 10,
  happinessLevel: 15,
  sleepinessLevel: 0,
  setHunger: function() {
    const hungerInterval = setInterval(() => {
      this.foodLevel--;
      if (this.isDead() == true) {
        clearInterval(hungerInterval);
        return tamagotchi.name + " has died of hunger!";
      }
      if (this.foodLevel < 6) {
        this.happinessLevel--;
        return tamagotchi.name + " is unhappy because they needs to eat. Happiness has decreased."
      }
    }, 1000);
  },
  setHappiness: function() {
    const happinessInterval = setInterval(() => {
      this.happinessLevel--;
      if (this.runsAway() == true && this.isDead() == false) {
        clearInterval(happinessInterval);
        return tamagotchi.name + " ran away!";
      }
    }, 1000);
  },
  setSleepiness: function() {
    const sleepinessInterval = setInterval(() => {
      this.sleepinessLevel++;
      if (this.isDead() == true) {
        clearInterval(sleepinessInterval);
        return tamagotchi.name + " has died of exhaustion!"
      }
      if (this.sleepinessLevel > 16) {
        this.happinessLevel--;
        return tamagotchi.name + " is unhappy because they needs to sleep. Happiness has decreased."
      }
    }, 1000);
  },
  isDead: function() {
    if (this.foodLevel > 0 && this.sleepinessLevel < 24)  {
      return false;
    } else {
      return true;
    }
  },
  runsAway: function() {
    if (this.happinessLevel > 0) {
      return false
    } else {
      return true;
    }
  },
  feed: function(amount) {
    let that = this;
    return function(food) {
      if (that.foodLevel == 10){
        return tamagotchi.name + " is full, they can't eat anything right now";
      } else if (food == "favorite food") {
        that.foodLevel += amount;
        that.happinessLevel += amount;
        if (that.happinessLevel > 30) {
          that.happinessLevel = 30;
        }
        if (that.foodLevel > 10) {
          that.foodLevel = 10;
        }
        return `Your pet ate the ${food}! Food level goes up ${amount}! It was their favorite! Happiness level goes up by ${amount}`;
      } else {
        that.foodLevel += amount;
        if (that.foodLevel > 10) {
          that.foodLevel = 10;
        }
        return `Your pet ate the ${food}! Food level goes up ${amount}!`;
      }
    }
  },
  play: function(amount) {
    let that = this;
    return function(toy) {
      that.happinessLevel += amount;
      if (that.happinessLevel > 30) {
        that.happinessLevel = 30;
        return that.name + ` played with the ${toy}! Happiness level goes up by ${amount}, ` + that.name + ` is as happy as can be!`;
      }
      return that.name + ` played with the ${toy}! Happiness level goes up by ${amount}!`;
    }
  },
  rest: function(amount) {
    let that = this;
    return function(restType) {
      if (that.sleepinessLevel < 5) {
        return this.name + " isn't tired yet.";
      }
      that.sleepinessLevel -= amount;
      if (this.sleepinessLevel < 0) {
        this.sleepinessLevel = 0;
      }
      return this.name + ` took a ${restType} and rested for ${amount} hours.`;
    }
  }

}

tamagotchi.eatSmall = tamagotchi.feed(5);
tamagotchi.eatMedium = tamagotchi.feed(7);
tamagotchi.eatLarge = tamagotchi.feed(10);
tamagotchi.eatFavorite = tamagotchi.feed(7);
tamagotchi.giveCheapToy = tamagotchi.play(5);
tamagotchi.giveExpensiveToy = tamagotchi.play(10);
tamagotchi.shortNap = tamagotchi.rest(5);
tamagotchi.longNap = tamagotchi.rest(8);
tamagotchi.restfulSleep = tamagotchi.rest(12);
