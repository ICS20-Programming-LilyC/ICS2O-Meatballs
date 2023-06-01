/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily Carroll
// Edited on: 06/1/2023
// This is the Title Scene file


// Adding to Phaser.Scene
class TitleScene extends Phaser.Scene {

  // This is the constructor for the title scene
  constructor() {
    super({ key: "titleScene"})
  }

  // Initializing title scene
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  // Logs title scene during preload phase
  preload() {
    console.log("Title Scene")
  }

  // Creating data object
  create(data) {
  }

  // Update using time and delta
  update(time, delta) {
  }
}

// Exports title scene as default
export default TitleScene
