/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily Carroll
// Edited on: 06/1/2023
// This is the Phaser3 configuration file

// Importing scene modules.
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"

// Creating constants of game scenes.
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()

// Configuring constant for basic game settings.
const  config = {
  
  // Game type
  type: Phaser.AUTO,
  
  // Screen height.
  width: 1920,
  
  // Screen width.
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  
  // Defualt background color.
  backgroundColor: 0x3f6e9a,
  
  // Scale of background change to accommodate window size changing.
  scale: {
    mode: Phaser.Scale.FIT,
    
    // Centering the game on the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
}

// Creating a new Phaser game.
const game = new Phaser.Game(config)

// Adding scenes to the game.
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)

// Starting the splash scene.
game.scene.start("splashScene")
