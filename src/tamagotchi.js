export class Tamagotchi  {
  constructor(inputtedName) {
    this.name = inputtedName;
    //tamagotchi values
    this.foodLevel= 10;
    this.happinessLevel = 15;
    this.sleepinessLevel = 0;
    this.exerciseLevel = 10;
    //actions that can be taken to change values
    this.eatSmall = this.feed(5);
    this.eatMedium = this.feed(7);
    this.eatLarge = this.feed(10);
    this.eatFavorite = this.feed(7);
    this.giveCheapToy = this.play(5);
    this.giveExpensiveToy = this.play(10);
    this.shortNap = this.rest(5);
    this.longNap = this.rest(8);
    this.sleep = this.rest(12);
    this.shortWalk = this.exercise(4);
    this.longWalk = this.exercise(8);
  }

  setHunger() {
    const hungerInterval = setInterval(() => {
      this.foodLevel--;
      if (this.isDead() == true) {
        clearInterval(hungerInterval);
        return this.name + " has died of hunger!";
      }
      if (this.foodLevel < 6) {
        this.happinessLevel--;
        return this.name + " is unhappy because they needs to eat. Happiness has decreased."
      }
    }, 1000);
  }

  setHappiness() {
    const happinessInterval = setInterval(() => {
      this.happinessLevel--;
      if (this.runsAway() == true && this.isDead() == false) {
        clearInterval(happinessInterval);
        return this.name + " ran away!";
      }
    }, 1000);
  }

  setExercise() {
    const happinessLevel = setInterval(() => {
      if (this.exerciseLevel > 10){
        this.sleepinessLevel += 2;
        return this.name + " is worn out from exercising. They need to sleep.";
      } else if (this.exerciseLevel < 5) {
        this.happinessLevel--;
        return this.name + " is unhappy because they needs to exercise. Happiness has decreased."
      } else {
        this.exerciseLevel--;
      }
    }, 1000);
  }

  setSleepiness() {
    const sleepinessInterval = setInterval(() => {
      this.sleepinessLevel++;
      if (this.isDead() == true) {
        clearInterval(sleepinessInterval);
        return this.name + " has died of exhaustion!"
      }
      if (this.sleepinessLevel > 16) {
        this.happinessLevel--;
        return this.name + " is unhappy because they needs to sleep. Happiness has decreased."
      }
    }, 1000);
  }

  isDead() {
    if (this.foodLevel > 0 && this.sleepinessLevel < 24)  {
      return false;
    } else {
      return true;
    }
  }

  runsAway() {
    if (this.happinessLevel > 0) {
      return false
    } else {
      return true;
    }
  }

  feed(amount) {
    let that = this;
    return function(food) {
      if (that.foodLevel == 10){
        return this.name + " is full, they can't eat anything right now";
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
  }

  play(amount) {
    let that = this;
    return function(toy) {
      that.happinessLevel += amount;
      if (that.happinessLevel > 30) {
        that.happinessLevel = 30;
        return that.name + ` played with the ${toy}! Happiness level goes up by ${amount}, ` + that.name + ` is as happy as can be!`;
      }
      return that.name + ` played with the ${toy}! Happiness level goes up by ${amount}!`;
    }
  }

  rest(amount) {
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

  exercise(amount) {
    let that = this;
    return function(exerciseType) {
      if (that.exerciseLevel > 8 || that.sleepinessLevel > 16) {
        return that.name + " is too tired to exercise right now.";
      }
      that.exerciseLevel += amount;
      return that.name + "You took " + that.name + `on a ${exerciseType}. Exercise level goes up by ${amount}.`
    }
  }
}
