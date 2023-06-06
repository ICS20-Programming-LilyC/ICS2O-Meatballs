// Adding a class to Game Scene.
class GameScene extends Phaser.Scene {
  // Constructor for the game scene.
  constructor() {
    super({ key: "gameScene" });

    this.background = null;
    this.cop = null;
    this.fireMeatball = false;
  }

  // Initializing game scene.
  init(data) {
    this.cameras.main.setBackgroundColor("669bbc");
  }

  // Log game scene during preload phase.
  preload() {
    console.log("Game Scene");

    //Images
    this.load.image("cityBackground", "images/cityAndTornadeoBackground.png");
    this.load.image("cop", "images/cop.png");
    this.load.image("missile", "images/meatball.png");
  }

  // Creating data objects.
  create(data) {
    this.background = this.add.sprite(0, 0, "cityBackground");
    this.background.setOrigin(0, 0);
    this.background.setScale(this.cameras.main.width / this.background.width, this.cameras.main.height / this.background.height);

    this.cop = this.physics.add.sprite(1920 / 2, 1000 - 100, "cop");

    //Creating a group for the missiles
    this.meatballGroup = this.physics.add.group();
  }

  // Update the Game Scene.
  update(time, delta) {
    //Called 60 times in one second.
    const keyLeftObject = this.input.keyboard.addKey("LEFT");
    const keyRightObject = this.input.keyboard.addKey("RIGHT");
    const keySpaceObject = this.input.keyboard.addKey("SPACE");

    if (keyLeftObject.isDown === true) {
      this.cop.x -= 15;
      if (this.cop.x < 0) {
          this.cop.x = 1920;
        }
    }

    if (keyRightObject.isDown === true) {
      this.cop.x += 15;
      if (this.cop.x > 1920) {
          this.cop.x = 0;
        }
    }

    if (keySpaceObject.isDown === true) {
      if (this.fireMeatball === false) {

        //Fire meatballs
        this.fireMeatball = true
        const aNewMeatball = this.physics.add.sprite(this.cop.x, this.cop.y, "missile");
        this.meatballGroup.add(aNewMeatball); 
      }
    }

    if (keySpaceObject.isUp === true) {
      this.fireMeatball = false
    }
  }

  clickButton() {
    this.scene.start("gameScene");
  }
}

// Exporting the game scene as default.
export default GameScene;
