/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the Splash Scene file

// Splash Scene class.
class SplashScene extends Phaser.Scene {

  // Constructor for the splash scene.
  constructor() {
    super({ key: "splashScene"})
  }

  // Initialize scene. 
  init(data) {
    this.cameras.main.setBackgroundColor("#9dbebb")
  }

  // Load splash scene image.
  preload() {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "images/immaculataLogo.png")
  }

  // Create and position splash scene background.
  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "splashSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  // If statement to switch to title scene after a certain time.
  update(time, delta) {
    if (time > 5000) {
      this.scene.switch("titleScene")
    }
  }
}

// Exporting splash scene for default.
export default SplashScene
