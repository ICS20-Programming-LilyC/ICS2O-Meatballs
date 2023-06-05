/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily Carroll
// Edited on: 06/1/2023
// This is the Menu Scene file


// Adding a class to Menu Scene.
class MenuScene extends Phaser.Scene {

  // Constructor for the menu scene.
  constructor() {
    super({ key: "menuScene"})
  }

  // Initializing menu scene.
  init(data) {
    this.cameras.main.setBackgroundColor("669bbc")
  }

  // Log menu scene during preload phase.
  preload() {
    console.log("Menu Scene")
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

  // Update the Menu Scene.
  update(time, delta) {
  }
}

// Exporting the menu scene as default.
export default MenuScene
