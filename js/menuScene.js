/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the menu Scene file

// Adding to Phaser.Scene.
class MenuScene extends Phaser.Scene {

  // Constructor for the menu scene.
  constructor() {
    super({ key: "menuScene" });

    // Constructing background image.
    this.menuSceneBackgroundImage = null

     // Constructing start button.
    this.startButton = null

    // Constructing instructions button.
    this.instructionsButton = null

    // Constructing the menu scene music.
    this.menuSceneMusic =  null
  }

  // Initializing menu scene.
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  // Logs game scene during preload phase.
  preload() {
    console.log("Menu Scene");

    // Loading images for background.
    this.load.image("menuSceneBackground", "images/purpleStormStartingScreen.png")

    // Loading start button.
    this.load.image("startButton", "images/startButton.png")

    // Loading instructions button.
    this.load.image("instructionsButton", "images/instructionsButton.png")

    // Loading audio for this page.
    this.load.audio("menuSceneMusic", "sounds/anticipationMusic.mp3")
  }

  // Creating data objects.
  create(data) {
    // Creating background image.
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(2.75);
    this.menuSceneBackgroundImage.setPosition(1920 / 2, 1080 / 2);

    // Creating music for this scene.
    this.menuSceneMusic = this.sound.add("menuSceneMusic")
    this.menuSceneMusic.loop = true
    this.menuSceneMusic.play()

    // Creating start button.
   this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.clickStart())
    
    // Creating instructions button.
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, "instructionsButton")
    this.instructionsButton.setInteractive({ useHandCursor: true })
    this.instructionsButton.on("pointerdown", () => this.clickInstructions())
  }

  // Update the Game Scene.
  update(time, delta) {}

  // Function for clicking start button.
  clickStart() {
    this.menuSceneMusic.pause()
    this.menuSceneMusic.loop = false
    this.scene.start("gameScene")
  }

  // Function for clicking instructions button.
  clickInstructions() {
    this.menuSceneMusic.pause()
    this.menuSceneMusic.loop = false
    this.scene.start("instructionsScene")
  }
}

// Exports menu scene as default.
export default MenuScene