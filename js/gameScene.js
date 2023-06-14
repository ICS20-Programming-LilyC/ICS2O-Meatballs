/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the game Scene file

// Adding a class to Game Scene.
class GameScene extends Phaser.Scene {

  //Create a meatball
  createMeatball() {
    // This will allow for a meatball to spawn in a random x location, between numbers 1 and 1920.
    const meatballXLocation = Math.floor(Math.random() * 1920) + 1
    
    // Using a variable and Math.random() to make the meatball spawns less expected.
    let meatballXVelocity = Math.floor(Math.random() * 50) + 1

    // Allow the meatball to move slightly left and right. 
    meatballXVelocity *= Math.round(Math.random()) ? 1 : -1

    // Creating a variable that makes meatballs appear each time this function is called. 
    const aMeatball = this.physics.add.sprite(meatballXLocation, -100, "meatball")

    // Adding an y velocity to the meatball.
    aMeatball.body.velocity.y = 200

    // Adding an x velocity to the meatball.
    aMeatball.body.velocity.x = meatballXVelocity

    // Adding the new meatball created to the meatball group.
    this.meatballGroup.add(aMeatball)
  }
  
  // Constructor for the game scene.
  constructor() {
    super({ key: "gameScene" });

    // Constructing background image for gameScene.js.
    this.background = null

    // Constructing the main sprite (cop).
    this.cop = null

    // Initializing the fire bullet variable to false.
    this.firebullet = false

    // Initializing the group variables for my bullets and meatballs.
    this.bulletGroup = null
    this.meatballGroup = null

    // Initializing the score and adding style.
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65px Georgia", fill: "#ffffff", align: "center" }
    

    // Initializing the game over text and adding style.
    this.gameOverText = null
    this.gameOverTextStyle = {font: "65px Georgia", fill: "#ff000", align: "center" }

  }

  // Initializing game scene.
  init(data) {
    
    // Establishing game scene background colour.
    this.cameras.main.setBackgroundColor("669bbc");
  }

  // Logs game scene during preload phase.
  preload() {
    console.log("Game Scene");

    // Loading images for background or sprites.
    this.load.image("cityBackground", "images/cityAndTornadeoBackground.png");
    this.load.image("cop", "images/cop.png");
    this.load.image("bullet", "images/bullet.png");
    this.load.image("meatball", "images/meatball.png");

    // Loading sounds for the game.
    this.load.audio("gunshot", "sounds/gunshot.wav")
    this.load.audio("explosion", "sounds/exploding.wav")
    this.load.audio("gameOver", "sounds/gameOver.wav")
    this.load.audio("backgroundMusic", "sounds/sirenBeat.mp3")
  }

  // Creating data objects.
  create(data) {
    
    // Creating the background image and adding into the scene.
    this.background = this.add.sprite(0, 0, "cityBackground");
    this.background.setOrigin(0, 0);

    // Allow background music to play.
    this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.9 });
    this.backgroundMusic.play();

    // Displaying styled score text.
    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

    // Adjusting images to fit the user's screen.
    this.background.setScale(
      this.cameras.main.width / this.background.width,
      this.cameras.main.height / this.background.height
    );

    // Creating the cop sprite on the screen.
    this.cop = this.physics.add.sprite(1920 / 2, 1000 - 100, "cop");

    // Creating a group for the bullets.
    this.bulletGroup = this.physics.add.group();

    // Creating a group for the meatballs.
    this.meatballGroup = this.add.group()
    this.createMeatball()

    // Timer that controls the time for bombs and make it re-spawn even if user does nothing (method taken from: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/)
    this.meatballTimer = this.time.addEvent({
      delay: 4000,
      callback: this.createMeatball,
      callbackScope: this,
      loop: true
    });

    // Collisions between bullets and meatballs.
    // Using a physics collider to allow bullets to hit meatballs.
    this.physics.add.collider(this.bulletGroup, this.meatballGroup, function(bulletCollide, meatballCollide) {
      // Destroying the meatball when in collision.
      meatballCollide.destroy()

      // Destroying the bullet when in collision.
      bulletCollide.destroy()

      // Playing my explosion sound.
      this.sound.play("explosion")

      // Updating score when a meatball is hit/exploded.
      this.score = this.score + 2
      this.scoreText.setText("Score: " + this.score.toString())

      //Recreating a new meatball for every one that is hit/destroyed.
      this.createMeatball()
      this.createMeatball()
    }.bind(this))

    // Collisions between cop and meatballs.
    // Using a physics collider to allow the game to end once a meatball hits the cop.
    this.physics.add.collider(this.cop, this.meatballGroup, function(copCollide, meatballCollide) {

      // Playing my gameOver sound.
      this.sound.play("gameOver")

      // Disable space bar so that missiles cannot fire when game is over.
      const keySpaceObj = this.input.keyboard.addKey("SPACE")
      keySpaceObj.enabled = false;

      // Pausing physics.
      this.physics.pause()

      // Destroying both the cop and the meatballs.
      meatballCollide.destroy()
      copCollide.destroy()

      // Displaying the game over text to the user and allowing the user to try again using the "click here to play again" option.
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "You died. Game Over! :( \nClick here to play again!", this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))

      // Resetting the score back to 0.
      this.score = 0
    }.bind(this))
  }

  // Update the Game Scene.
  update(time, delta) {
    const keyLeftObject = this.input.keyboard.addKey("LEFT");
    const keyRightObject = this.input.keyboard.addKey("RIGHT");
    const keySpaceObject = this.input.keyboard.addKey("SPACE");

    // If the left arrow is pressed, move the cop to the left.
    if (keyLeftObject.isDown === true) {
  
      // Move the cop sprite to the left by 15 units.
      this.cop.x -= 15;

      // If the cop sprite goes off the left edge of the screen, wrap it around to the right edge.
      if (this.cop.x < 0) {
        this.cop.x = 1920;
      }
    }

    // If the right arrow is pressed, move the cop to the right.
    if (keyRightObject.isDown === true) {
      
      // Move the cop sprite to the right by 15 units.
      this.cop.x += 15;

      // If the cop sprite goes off the right edge of the screen, wrap it around to the left edge.
      if (this.cop.x > 1920) {
        this.cop.x = 0;
      }
    }

    // If the spacebar is pressed, fire a bullet.
    if (keySpaceObject.isDown === true) {
      if (this.firebullet === false) {
        // Fire bullets
        // Set fire bullet to true to prevent continuous firing.
        this.firebullet = true;

        // Create a new bullet sprite at a position slightly offset from the cop's position.
        const aNewbullet = this.physics.add.sprite(
          this.cop.x - 15,
          this.cop.y - 220,
          "bullet"
        );

        // Scale down the size of the bullet sprite.
        aNewbullet.setScale(0.1);

        // Add the bullet sprite to the bullet group.
        this.bulletGroup.add(aNewbullet);

        // Playing the sound of a gun being fired.
        this.sound.play("gunshot");
      }
    }

    // If the spacebar is not pressed, reset the fire bullet variable to false so another can be fired instead.
    if (keySpaceObject.isUp === true) {
      this.firebullet = false
    }
    
    // Making bullets move up the screen.
    this.bulletGroup.children.each(function (item) {
      item.y = item.y -15

      // If the item (bullet) location is off the screen, then destroy it.
      if (item.y < 0) {
        item.destroy()
      }
    })
  }

  // When the start button is clicked start the game.
  clickButton() {
    this.scene.start("gameScene");
  }
}

// Exporting the game scene as default.
export default GameScene;