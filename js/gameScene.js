/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the game Scene file

// Adding a class to Game Scene.
class GameScene extends Phaser.Scene {
  // Constructor for the game scene.
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.cop = null
    this.firebullet = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65px Georgia", fill: "#ffffff", align: "center" }

    this.gameOverText = null
    this.gameOverTextStyle = { font: "65px Georgia", fill: "ff0000", align: "center" }
  }

  // Initializing game scene.
  init(data) {
    this.cameras.main.setBackgroundColor("669bbc")
  }

  // Log game scene during preload phase.
  preload() {
    console.log("Game Scene")

    // Images
    this.load.image("cityBackground", "images/cityAndTornadeoBackground.png")
    this.load.image("cop", "images/cop.png")
    this.load.image("bullet", "images/bullet.png")
    this.load.image("meatball", "images/meatball.png")

    // Sounds
    this.sound.add("gun shot", "sounds/gunshot.wav")
    this.sound.add("exploding", "sounds/exploding.wav")
    this.sound.add("gameOver", "sounds/gameOver.wav")
  }

  // Creating data objects.
  create(data) {
    this.background = this.add.sprite(0, 0, "cityBackground")
    this.background.setOrigin(0, 0)

    // Setting up score to display to user.
    this.scoreText = this.add.text(10, 10, "Score:" + this.score.toString(), this.scoreTextStyle)

    // Adjusting images to fit the user's screen. Link: https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html
    this.background.setScale(this.cameras.main.width / this.background.width, this.cameras.main.height / this.background.height)

    this.cop = this.physics.add.sprite(1920 / 2, 1000 - 100, "cop")

    // Creating a group for the bullets
    this.bulletGroup = this.physics.add.group()

    // Creating a group for the meatballs
    this.meatballGroup = this.add.group()
    this.createMeatball()

    // Collisions set between bullets and meatballs
    this.physics.add.collider(this.meatballGroup, this.bulletGroup, function (bulletCollide, meatballCollide) {
      bulletCollide.destroy()
      meatballCollide.destroy()
      this.sound.play("exploding")
      this.score += 1
      this.scoreText.setText("Score: " + this.score.toString())
      this.createMeatball()
      this.createMeatball()
    }.bind(this))

    // Collisons between meatballs and cop
    this.physics.add.collider(this.cop, this.bulletGroup, function (copCollide, meatballCollide) {
      this.sound.play("gameOver")
      this.physics.pause()
      meatballCollide.destroy()
      copCollide.destroy()
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "You Died. Game Over").setOrigin(0.5);

      this.gameOverText.setInteractive({useHandCursor: true})
      this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
    }.bind(this))
  }

  // Update the Game Scene.
  update(time, delta) {
    
    //Called 60 times in one second.
    const keyLeftObject = this.input.keyboard.addKey("LEFT");
    const keyRightObject = this.input.keyboard.addKey("RIGHT");
    const keySpaceObject = this.input.keyboard.addKey("SPACE");

    if (keyLeftObject.isDown === true) {

      // Move the cop sprite to the left by 15 units.
      this.cop.x -= 15;
      // If the cop sprite goes off the left edge of the screen, wrap it around to the right edge.
      if (this.cop.x < 0) {
          this.cop.x = 1920;
        }
    }

    if (keyRightObject.isDown === true) {
      // Move the cop sprite to the right by 15 units.
      this.cop.x += 15;

      //If the cop sprite goes off the right edge of the screen, wrap it around to the left edge.
      if (this.cop.x > 1920) {
          this.cop.x = 0;
        }
    }

    if (keySpaceObject.isDown === true) {
      if (this.firebullet === false) {
        
        // Fire bullets
        // Set firebullet flag to true to prevent continuous firing.
        this.firebullet = true

        // Create a new bullet sprite at a position slightly offset from the cop's position.
        const aNewbullet = this.physics.add.sprite(this.cop.x - 15, this.cop.y - 235, "bullet");

        // Scale down the size of the bullet sprite.
        aNewbullet.setScale(0.1); 
        
        // Add the bullet sprite to the bullet group for further processing.
        this.bulletGroup.add(aNewbullet);
        this.sound.play("gun shot");
      }
    }

    if (keySpaceObject.isUp === true) {
      this.firebullet = false
    }
    //making missile upward
    this.bulletGroup.children.each(function (item) {
      item.y = item.y -15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }

  clickButton() {
    this.scene.start("gameScene");
  }
}

// Exporting the game scene as default.
export default GameScene;
