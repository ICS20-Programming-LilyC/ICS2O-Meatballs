/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Lily Carroll
// Created on: 06/12/2023
// This is the Instructions Scene

// This class is the Instructions Scene
class InstructionsScene extends Phaser.Scene {

  // Constructor for the insturctions scene.
  constructor() {
    super({ key: "instructionsScene" });
    this.instructionsSceneBackgroundImage = null
    
    // Constructing back button.
    this.backButton = null

    // Constructing music for this scene.
    this.instructionSceneMusic = null
    
    // Constructin text and style for this scene.
    this.instructionsText = null
    this.instructionsTextStyle = {font: "26px Georgia", fill: "#fcf300", backgroundColor: "#14213d", align: "center" }
  }

  // Initializing scene with background color.
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  // Logs game scene during preload phase.
  preload() {
    console.log("Instructions Scene")
    
    // Loading image for background.
    this.load.image("instructionsSceneBackgroundImage","./images/flintLockwoodVictory.jpg")

    // Loading image for back button.
    this.load.image("backButton", "./images/backButton.png")

    // Loading audio for this page.
    this.load.audio("instructionSceneMusic", "./sounds/mysteriousMusic.mp3")
  }

  // Creating data objects.
  create(data) {
    
    // Creating background image.
    this.instructionsSceneBackgroundImage = this.add.sprite(0, 0, "instructionsSceneBackgroundImage").setScale(3.79999)
    this.instructionsSceneBackgroundImage.x = 1920 / 2
    this.instructionsSceneBackgroundImage.y = 1080 / 2

    // Creating the background music for this scene.
    this.instructionSceneMusic = this.sound.add("instructionSceneMusic")
    this.instructionSceneMusic.loop = true
    this.instructionSceneMusic.play()

    // Adding the instructions text for the user.
    this.instructionsText = this.add.text(1920 / 2, (1080 / 2) + 430, "A clumsy scientist known as Flint Lockwood has created a storm of raining meatballs on your hometown Swallow Falls.\nYou play as Earl Devereaux, a cop who is very dedicated and serious about the protection of this small town.\nIt is your job to help him ensure complete protection over the town and shoot down the falling meatballs with bullets to gain points.\nBut be careful if a meatball hits you, the game is over and Swallow Falls will be overthrown.\nTo move, use the arrow keys (left and right) and shoot the meatballs with the spacebar.\nGood luck!", this.instructionsTextStyle).setOrigin(0.5)

      // Creating back button.
    this.backButton = this.add.sprite(1920 / 2, (1080 / 2) - 480, "backButton")
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on("pointerdown", () => this.clickBack())
  }

  // Update using time and delta.
  update(time, delta) {}

 // Function for clicking back button.
  clickBack() {
    this.instructionSceneMusic.pause()
    this.instructionSceneMusic.loop = false
    this.scene.start("menuScene")
  }
}

// Export instructions scene as default.
export default InstructionsScene