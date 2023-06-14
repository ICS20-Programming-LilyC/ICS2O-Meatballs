/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the menu Scene file

// Adding to Phaser.Scene.
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.instructionsButton = null
    this.menuSceneMusic =  null
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Menu Scene");
    this.load.image("menuSceneBackground", "images/purpleStormStartingScreen.png")
    this.load.image("startButton", "images/startButton.png")
    this.load.image("instructionsButton", "images/instructionsButton.png")
    this.load.audio("menuSceneMusic", "sounds/anticipationMusic.mp3")
  }

  create(data) {
    // Creating background image.
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(2.75);
    this.menuSceneBackgroundImage.setPosition(1920 / 2, 1080 / 2);

    // Creating music for this scene.
    this.menuSceneMusic = this.sound.add("menuSceneMusic")
    this.menuSceneMusic.loop = true
    this.menuSceneMusic.play()

    // Creating start button
   this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.clickStart())
    
    // Creating instructions button.
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, "instructionsButton")
    this.instructionsButton.setInteractive({ useHandCursor: true })
    this.instructionsButton.on("pointerdown", () => this.clickInstructions())
  }

  update(time, delta) {}

  // Function for clicking start button
  clickStart() {
    this.menuSceneMusic.pause()
    this.menuSceneMusic.loop = false
    this.scene.start("gameScene")
  }

  // Function for clicking instructions button
  clickInstructions() {
    this.menuSceneMusic.pause()
    this.menuSceneMusic.loop = false
    this.scene.start("instructionsScene")
  }
}

// Exports menu scene as default
export default MenuScene