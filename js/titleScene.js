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
  }

  // Initializing title scene.
  init(data) {
    this.cameras.main.setBackgroundColor("669bbc")
  }

  // Log title scene during preload phase.
  preload() {
    console.log("Title Scene")
  }

  // Creating data objects.
  create(data) {
    
    // Display a welcome message. Here is the source I used to creat the code below: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/ .
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
