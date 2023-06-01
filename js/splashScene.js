/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the Splash Scene file

// Splash Scene class.
class SplashScene extends Phaser.Scene {

  // This is the constructor for the splash scene
  constructor() {
    super({ key: "splashScene"})
  }

  // Initializing scene 
  init(data) {
    this.cameras.main.setBackgroundColor("#9dbebb")
  }

  // Loads and logs splash scene image
  preload() {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "images/immaculataLogo.png")
  }

  // Creates and properly positions splash scene background
  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "splashSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  // If statement to switch to title scene after a certain amount of time has elapsed
  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene")
    }
  }
}

// Exports splash scene as default
export default SplashScene
