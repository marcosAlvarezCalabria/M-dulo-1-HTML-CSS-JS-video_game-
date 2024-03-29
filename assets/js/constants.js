//CANVAS
const CANVAS_H = 674;
const CANVAS_W = 1200;
const FPS = 1100 / 60;
const SPEED_BACKGROUND = 0.5;

//////////////////GOKU/////////////////////////////
const HEALTH_GOKU = 250;
const KI_GOKU = 0;
const LIVES_GOKU = 3;
const SPEED_ONDA_VITAL = 5;
const GOKU_FLOOR = CANVAS_H - 150;
/////////////////MOVEMENTS GOKU////////////////////////
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_JUMP = 32; // LETRA espacio
const KEY_PUNCH = 83; // LETRA S
const KEY_SPECIAL_HIT = 68; //LETRA D
const KEY_CALL_CLOUD = 65;
const SPEED_MOVE_GOKU = 10;

const ACELERATION = 2;
const SPEED_JUMP = 10;
//////////////////ENEMIES///////////////////////

const ENEMY1_SPAWN_TICK = 20;
const ENEMY_1_DAMAGE = 5;
//////////////////bars////////////////////////

const WIDTH_HEALTH_BAR = 200;
const HEIGHT_HEALTH_BAR = 50;

const WIDTH_KI_BAR = 200;
const HEIGHT_KI_BAR = 100;
//////////////////////////////balls/////////////////////////////

const POSITION_Y_BALL = 6000;
const POSITION_X_BALL = 2000;

//////////////////////////////////panels/////////////////////
const ENEMY_PIG = {
  src: "/assets/img/spgoku/Pig-Pirate-gun.png",
  verticalFrames: 1,
  verticalFramesIndex: 0,
  horizontalFrames: 6,
  horizontalFramesIndex: 0,
};
const ENEMY_BIRD = {
  src: "/assets/img/spgoku/img-bird.png",
  verticalFrames: 1,
  verticalFramesIndex: 0,
  horizontalFrames: 6,
  horizontalFramesIndex: 0,
};
