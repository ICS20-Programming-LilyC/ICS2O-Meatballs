/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily Carroll
// Edited on: 06/1/2023
// This is the Title Scene file


// Adding a class to Title Scene.
class TitleScene extends Phaser.Scene {

  // Constructor for the title scene.
  constructor() {
    super({ key: "titleScene"})

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = {font:"200px Times", fill: "#fde4b9", align:"center"}
  }

  // Initializing title scene.
  init(data) {
    this.cameras.main.setBackgroundColor("669bbc")
  }

  // Log title scene during preload phase.
  preload() {
    console.log("Title Scene")
    this.load.image("titleSceneBackground",'images/purpleStormStartingScreen.png')
  }

  // Creating data objects.
  create(data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    this.titleSceneText = this.add.text (1920 / 2, (1080 / 2) + 350, "Cops VS meatballs", this.titleSceneTextStyle).setOrigin(0.5)
    
    // Display a welcome message.
    this.add.text(960, 540, "Welcome to my game Cop vs. Meatballs!", {
      fontSize: "48px",
      fontFamily: "Arial",
      color: "#ffffff",
      align: "center"
    }).setOrigin(0.5);
  }

  // Update the Title Scene.
  update(time, delta) {
  }
}

// Exporting the title scene as default.
export default TitleScene
