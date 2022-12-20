const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

let playerNumber;
let gameActive = false;
let canvas = document.getElementById('canvas'); 
let c;
let map;
let upgradesImage;
let bound

let gameState

let exitupgrades
let arrowLeft
let arrowRight

let mouseDown;
let mousex
let mousey

let speedButton
let startbutton
let autostartbutton
const waypoints = [{ x: 0, y: 270 }, { x: 300, y: 270 }, { x: 300, y: 50 }, { x: 75, y: 50 }, { x: 75, y: 585 }, { x: 300, y: 585 }, { x: 300, y: 360 }, { x: 525, y: 360 }, { x: 525, y: 485 }, { x: 680, y: 485 }, { x: 680, y: 170 }, { x: 430, y: 170 }, { x: 430, y: 80 }, { x: 840, y: 80 }, { x: 840, y: 325 }, { x: 1000, y: 325 }]
const collisionRectangles = [{ x: 960, y: 0, w: 100, h: 1060 }, { x: 0, y: 230, w: 350, h: 80 }, { x: 255, y: 10, w: 100, h: 300 }, { x: 35, y: 5, w: 315, h: 85 }, { x: 30, y: 5, w: 95, h: 625 }, { x: 30, y: 550, w: 325, h: 85 }, { x: 255, y: 325, w: 100, h: 305 }, { x: 260, y: 330, w: 315, h: 80 }, { x: 475, y: 330, w: 105, h: 207 }, { x: 475, y: 455, w: 260, h: 80 }, { x: 635, y: 135, w: 100, h: 405 }, { x: 385, y: 135, w: 350, h: 85 }, { x: 385, y: 35, w: 95, h: 180 }, { x: 385, y: 40, w: 510, h: 85 }, { x: 800, y: 40, w: 95, h: 340 }, { x: 800, y: 290, w: 160, h: 85 }]
let buttons = []

const towerNames = ['', 'basic', 'sniper', 'fast', 'god']

let upgradeNames = [[], ['faster', 'range', 'double shot', 'triple shot', '+2 damage', '+2 damage', ' shotgun'], ['faster', 'pre round prep', ' stun', 'longer stun', '+2 damage', '+3 damage', ' seeking'], ['range', 'range', 'faster', '+2 damage', '+1 damage', '+1 damage', 'ultra fast'], []]
let upgradeCosts = [[], [1000, 2000, 4000, 4000, 3000, 3000, 10000], [1000, 4000, 5000, 3000, 3000, 5000, 10000], [1000, 2000, 1000, 3000, 2000, 2000, 10000], []]
let towerBeingUpgraded = 1

let lives = 100
let money = 120
let round = 1
let roundIndex = 0
let rounds = [ [], [1, 1, 1, 1, 1, 1, 1, 2, 2, 2], [1, 2, 1, 2, 1, 2, 1, 2], [3, 2, 3, 3, 2, 3, 2, 2, 3, 2, 2], [2, 3, 2, 3, 2], [3, 4, 5, 4, 4, 5, 5, 6, 6, 3, 5, 4], [4, 7, 5, 7, 7, 8, 6, 8, 8, 6], [6, 8, 8, 8, 6], [9, 9, 9, 7, 9, 7, 7, 9], [9, 11, 10, 7], [13, 9, 13, 10, 11, 14, 14, 8, 13, 8, 13, 12, 14, 10], [13, 12, 9, 15, 13, 8, 15, 9, 10, 13, 13], [11, 10, 16, 11, 15, 14, 11, 14, 12], [10, 18, 18, 15, 12, 17, 15, 15, 11, 14, 14, 10, 14, 10, 12], [13, 18, 20, 15, 11, 15, 15, 20, 18, 17, 13, 19, 17, 17, 16], [21, 11, 15, 12, 15, 20, 21, 11, 11, 15, 16, 17, 20, 12, 19], [19, 13, 16, 16, 17, 20, 12, 18, 20, 12, 13, 13, 21, 18, 12, 17, 15, 21], [21, 22, 21, 24, 23, 24, 23, 18, 17, 17, 18, 16, 15, 19, 24, 17, 19, 16], [18, 23, 26, 24, 22, 15, 25, 18, 26, 21, 21, 24, 16, 18, 25, 18], [16, 17, 19, 15, 22, 16, 19, 16, 22, 22, 27, 23, 17, 17, 23, 25], [18, 16, 15, 15, 17, 22, 26, 28, 15, 23, 19, 21, 17, 20, 24, 22, 24, 27, 15, 26], [21, 22, 21, 18, 28, 25, 16, 27, 23, 29, 30, 28, 18, 20, 20, 24, 27, 23], [20, 20, 21, 31, 19, 26, 23, 31, 32, 17, 17, 18, 23, 23, 32, 32, 25, 31], [21, 20, 28, 33, 18, 32, 19, 29, 19, 33, 29, 18, 24, 27, 22, 30, 20, 32], [21, 21, 26, 20, 28, 29, 19, 24, 29, 27, 31, 19], [31, 30, 22, 34, 19, 26, 36, 23, 35, 31, 33, 35, 26], [32, 35, 21, 25, 36, 28, 21, 20, 23, 23, 24, 20, 38, 37, 23, 23, 30, 36, 22, 38, 30], [29, 31, 30, 38, 39, 25, 22, 28, 24, 22, 33, 35, 28, 33, 30], [36, 22, 38, 34, 25, 28, 39, 32, 40, 26, 30, 33, 27, 34, 22, 28, 31, 26, 25, 26, 24], [42, 39, 30, 36, 22, 37, 28, 27, 37, 31, 33, 29, 33, 31, 30, 22, 24, 41, 40, 27, 41, 31, 40], [28, 39, 39, 30, 28, 28, 24, 30, 40, 31, 34, 38, 42, 29, 30, 27, 24], [45, 32, 39, 29, 45, 40, 24, 28, 28, 31, 43, 24, 34, 42, 35, 39, 42, 31, 42, 39, 45, 26, 26, 37, 29], [30, 32, 25, 25, 41, 26, 28, 30, 36, 31, 45, 42, 38, 45, 41, 44, 28, 28, 42, 34, 39, 33, 25, 32], [35, 27, 26, 27, 31, 44, 35, 28, 33, 42, 28, 42, 46, 35, 44, 32, 36, 43, 39, 43, 35, 37], [50, 37, 29, 50, 43, 31, 33, 48, 37, 50, 40, 46, 50, 35, 34, 40, 49, 43, 35], [51, 38, 40, 38, 50, 35, 41, 48, 47, 48, 33, 51, 38, 41, 28, 35, 27, 29, 41, 32, 44, 30, 47, 40, 34, 47, 34], [39, 47, 28, 34, 41, 30, 37, 33, 47, 51, 46, 43, 43, 45, 41, 49, 34, 50, 44, 31, 34, 48], [32, 31, 33, 52, 33, 49, 43, 31, 45, 43, 41, 29, 46, 34, 47, 36, 30, 41, 44, 42], [32, 42, 49, 41, 50, 32, 47, 37, 30, 47, 49, 42, 42, 39, 53, 39, 44, 40, 55, 44, 45, 52], [43, 34, 45, 43, 52, 33, 35, 46, 44, 32, 36, 35, 42, 50, 51, 34, 34, 54, 45, 54, 48, 54, 54, 37, 33, 54], [39, 56, 42, 49, 31, 57, 39, 55, 55, 39, 40, 55, 51, 50, 44, 49, 53, 38, 57, 31, 41, 37, 31], [59, 56, 33, 39, 47, 60, 41, 51, 58, 48, 41, 41, 53, 58, 34, 34, 47, 50, 33, 54, 37, 37, 40, 51, 53, 56, 47, 33], [50, 53, 36, 44, 44, 47, 55, 47, 55, 46, 61, 61, 57, 33, 61, 38, 59, 50, 56, 35, 41, 41, 41, 61], [53, 46, 39, 37, 63, 44, 34, 43, 45, 54, 40, 53, 49, 42, 35, 46, 34, 40, 49, 48, 46, 57, 39, 48, 46, 54, 51, 55, 47], [57, 47, 57, 63, 63, 64, 35, 40, 49, 47, 42, 57, 35, 45, 44, 49, 61, 58, 50, 48, 45, 36, 50, 52, 57, 57], [45, 51, 62, 49, 59, 35, 41, 60, 65, 38, 50, 53, 50, 64, 62, 35, 58, 36, 57, 60, 36, 47, 48, 41, 39, 44, 59, 37, 65, 54, 48, 37], [67, 44, 65, 63, 43, 45, 40, 42, 40, 38, 58, 36, 51, 64, 55, 44, 40, 50, 51, 38, 66, 67, 68, 40, 66, 40, 56, 51, 44], [60, 65, 69, 49, 62, 44, 61, 50, 57, 37, 50, 58, 51, 61, 65, 39, 48, 53, 37, 45, 59, 46, 60, 56, 68], [47, 44, 56, 70, 67, 61, 44, 38, 53, 54, 49, 55, 46, 62, 45, 38, 70, 62, 47, 69, 70, 46, 63, 52, 59, 68], [67, 55, 66, 61, 40, 41, 39, 50, 69, 69, 48, 39, 42, 56, 56, 38, 45, 64, 63, 59, 61, 70, 57, 63, 40, 48, 66, 41, 48, 68, 64, 60, 45, 52], [45, 74, 65, 69, 46, 74, 53, 54, 42, 71, 64, 51, 71, 39, 67, 47, 70, 46, 59, 72, 49, 74, 66, 61, 67, 64, 62, 70, 53, 52, 70], [46, 43, 59, 73, 52, 54, 51, 41, 56, 52, 56, 55, 54, 49, 60, 44, 68, 65, 60, 55, 60, 56, 41, 67, 43, 56, 71, 61, 47, 66, 57, 71], [55, 56, 72, 41, 52, 62, 71, 63, 54, 67, 63, 57, 42, 56, 65, 47, 49, 71, 70, 41, 74, 50, 45, 63, 50, 74, 62, 68, 50], [57, 74, 68, 52, 62, 60, 56, 62, 68, 68, 77, 55, 45, 55, 61, 54, 64, 66, 48, 48, 45, 73, 77, 78, 54, 50, 61, 55, 73, 59, 44, 65, 70, 44, 60, 59], [45, 51, 65, 44, 46, 66, 54, 65, 65, 80, 56, 45, 53, 57, 56, 42, 45, 48, 72, 43, 62, 44, 73, 73, 52, 63, 58, 55, 74], [52, 67, 59, 70, 48, 59, 71, 50, 66, 57, 55, 75, 65, 67, 45, 61, 80, 43, 69, 60, 67, 66, 43, 44, 78, 57, 52, 45, 57, 45, 72, 63, 78, 80, 76, 68, 58], [75, 61, 47, 73, 61, 72, 79, 56, 53, 63, 51, 45, 65, 54, 48, 68, 72, 62, 53, 56, 50, 69, 70, 44, 62, 46, 69, 82, 58, 56, 82, 57, 61, 59, 62, 45, 72], [57, 57, 77, 56, 66, 72, 48, 59, 51, 57, 83, 66, 63, 81, 54, 52, 82, 65, 61, 58, 47, 47, 77, 83, 67, 83, 64, 59, 83, 47, 59, 61, 48, 84, 63], [62, 65, 65, 65, 67, 46, 58, 83, 77, 47, 57, 83, 73, 62, 64, 72, 69, 60, 77, 64, 86, 60, 86, 72, 48, 48, 82, 60, 60, 59, 82, 69, 86], [66, 69, 73, 68, 51, 70, 53, 47, 62, 78, 65, 61, 66, 65, 71, 52, 75, 55, 46, 56, 81, 51, 63, 66, 64, 78, 61, 50, 61, 81, 82, 78, 50, 63, 78, 71], [75, 75, 83, 56, 86, 84, 69, 88, 69, 50, 82, 57, 77, 85, 85, 51, 51, 59, 65, 58, 71, 50, 73, 61, 79, 71, 86, 51, 58, 78, 78, 54, 63, 83], [83, 78, 50, 60, 54, 84, 81, 77, 63, 84, 49, 75, 50, 89, 83, 63, 52, 53, 82, 48, 87, 66, 70, 83, 51, 52, 67, 52, 55, 79, 75, 85, 74, 72, 50, 58, 64, 65, 78], [82, 58, 73, 73, 68, 54, 65, 59, 89, 81, 65, 92, 82, 63, 90, 79, 66, 77, 75, 87, 52, 54, 70, 60, 67, 71, 54, 67, 60, 54, 75, 63, 77, 72, 50, 68, 62, 75, 83], [82, 52, 87, 79, 76, 61, 78, 82, 82, 63, 61, 70, 79, 58, 57, 79, 74, 59, 85, 65, 53, 86, 70, 63, 81, 90, 77, 62, 84, 62, 77, 70, 93, 83, 56, 73, 53, 74], [76, 78, 90, 70, 66, 74, 57, 58, 94, 60, 52, 62, 84, 91, 82, 80, 54, 61, 83, 71, 86, 86, 52, 82, 91, 64, 56, 85, 54, 88, 65, 51, 79, 94, 53, 67, 94, 65, 82, 73, 75, 63], [69, 52, 85, 96, 78, 76, 71, 90, 82, 53, 84, 64, 84, 63, 89, 78, 79, 54, 54, 96, 92, 75, 62, 56, 94, 75, 72, 90, 61, 52, 85, 82, 52, 73, 86, 94], [56, 52, 75, 86, 83, 92, 75, 52, 87, 52, 81, 64, 91, 52, 54, 71, 82, 77, 78, 75, 82, 67, 77, 63, 98, 98, 61, 61, 81, 96, 95, 63, 98, 83, 67, 82, 98, 57], [99, 57, 79, 69, 77, 63, 97, 63, 56, 54, 90, 57, 86, 92, 95, 66, 69, 63, 78, 65, 81, 85, 99, 85, 64, 99, 57, 79, 61, 74, 77, 78, 86, 67, 89, 88, 65, 56, 64, 84, 90], [75, 56, 59, 65, 81, 55, 76, 94, 91, 85, 74, 76, 54, 85, 70, 92, 77, 91, 91, 84, 78, 99, 65, 86, 63, 60, 95, 65, 62, 67, 62, 93, 88, 99, 80, 76, 82, 78, 56, 60], [56, 72, 92, 90, 87, 99, 99, 90, 59, 99, 102, 58, 96, 57, 99, 71, 97, 97, 62, 81, 72, 89, 79, 87, 99, 78, 61, 81, 99, 67, 59, 97, 86, 98, 67, 68, 59, 58, 76, 62, 65, 63], [66, 85, 104, 99, 70, 95, 58, 104, 85, 100, 75, 96, 102, 69, 104, 84, 85, 68, 96, 82, 59, 96, 99, 61, 74, 58, 86, 80, 58, 86, 88, 88, 101, 75, 83, 60, 83, 87, 82, 68], [70, 72, 76, 73, 63, 70, 84, 95, 76, 83, 83, 86, 104, 87, 93, 71, 64, 58, 97, 62, 83, 105, 72, 77, 64, 88, 70, 58, 95, 70, 87, 101, 56, 73, 72, 65, 65, 63, 71, 69, 79, 71, 103, 101], [63, 93, 77, 93, 60, 84, 96, 65, 96, 59, 78, 72, 94, 80, 74, 63, 94, 65, 101, 92, 66, 65, 100, 87, 102, 80, 92, 83, 78, 59, 66, 97, 104, 69, 65, 103, 68, 64], [83, 63, 82, 70, 68, 107, 86, 86, 59, 58, 108, 71, 100, 89, 92, 59, 99, 108, 85, 85, 106, 76, 97, 73, 67, 65, 74, 60, 96, 68, 96, 97, 93, 92, 85, 88, 90, 102, 91], [106, 109, 60, 94, 97, 81, 69, 99, 65, 110, 58, 72, 93, 90, 88, 83, 93, 110, 102, 65, 93, 69, 65, 98, 60, 62, 109, 76, 97, 78, 108, 102, 70, 85, 101, 108, 99, 69, 110, 96, 75, 85, 105, 76], [69, 111, 93, 73, 109, 89, 63, 75, 107, 91, 60, 96, 74, 72, 90, 59, 60, 77, 98, 88, 94, 74, 77, 63, 62, 60, 76, 70, 66, 96, 61, 78, 108, 67, 111, 81, 95], [60, 111, 99, 84, 74, 76, 93, 83, 98, 66, 82, 94, 92, 101, 61, 96, 78, 99, 73, 65, 83, 85, 66, 102, 72, 92, 65, 93, 82, 73, 75, 80, 85, 72, 102, 65, 77, 71, 64, 79, 107], [69, 62, 91, 90, 100, 72, 100, 91, 101, 104, 69, 79, 84, 91, 87, 65, 108, 102, 108, 76, 77, 112, 89, 95, 104, 71, 97, 69, 76, 99, 68, 91, 102, 74, 103, 95, 76, 97, 62, 100, 73, 67, 94, 111, 81, 66], [83, 98, 84, 103, 72, 78, 90, 89, 109, 93, 81, 111, 108, 96, 86, 68, 79, 102, 74, 113, 74, 104, 79, 72, 112, 112, 79, 101, 109, 91, 116, 114, 116, 99, 97, 107, 70, 88, 66, 77, 82, 73], [95, 84, 104, 74, 101, 114, 104, 115, 64, 76, 78, 79, 116, 106, 75, 86, 83, 102, 64, 90, 101, 77, 105, 65, 100, 72, 72, 67, 77, 93, 112, 68, 73, 98, 74, 78, 100, 76, 99, 71, 101, 95, 86, 96], [110, 85, 82, 103, 95, 96, 75, 101, 112, 108, 71, 71, 101, 105, 118, 82, 84, 74, 97, 108, 76, 87, 85, 82, 71, 79, 116, 87, 104, 99, 81, 91, 73, 72, 101, 82, 67, 67, 97, 96], [93, 105, 103, 82, 95, 92, 100, 86, 71, 100, 118, 73, 92, 113, 112, 120, 119, 100, 101, 119, 86, 120, 75, 92, 74, 96, 115, 82, 65, 117, 96, 94, 80, 72, 64, 64, 114, 116, 91, 113, 98, 105, 115, 107], [66, 87, 97, 121, 75, 87, 121, 72, 77, 96, 87, 110, 78, 111, 114, 107, 121, 87, 83, 106, 99, 76, 103, 83, 122, 65, 87, 89, 112, 115, 90, 87, 73, 119, 102, 69, 99, 92, 121, 91, 82, 73, 96, 110, 115], [90, 91, 98, 101, 114, 120, 83, 78, 84, 74, 71, 106, 115, 78, 112, 93, 85, 120, 68, 96, 120, 103, 120, 73, 68, 98, 68, 77, 90, 77, 95, 116, 92, 103, 87, 105, 78, 76, 98, 115, 86, 79, 116], [105, 70, 78, 87, 79, 115, 66, 104, 99, 80, 106, 85, 66, 80, 123, 122, 83, 88, 116, 123, 124, 119, 81, 67, 88, 70, 95, 77, 105, 104, 90, 91, 112, 90, 119, 87, 75, 67, 112, 71, 96, 89, 107, 71, 108, 115, 73, 77, 115, 96], [78, 75, 109, 82, 76, 120, 74, 105, 118, 113, 105, 68, 99, 67, 67, 76, 86, 122, 98, 125, 100, 123, 107, 72, 73, 82, 121, 99, 101, 79, 69, 101, 75, 90, 73, 91, 75, 73, 69, 114, 78, 81, 120, 102, 90, 95, 104, 76, 102, 111, 94], [121, 72, 93, 128, 100, 119, 68, 82, 91, 72, 123, 96, 84, 119, 113, 120, 74, 101, 124, 80, 107, 73, 82, 81, 104, 103, 88, 126, 96, 123, 116, 97, 117, 91, 128, 109, 81, 80, 78, 107, 107, 72, 106, 82, 112, 124, 102], [91, 77, 110, 79, 107, 76, 82, 99, 70, 129, 129, 87, 83, 110, 108, 113, 99, 89, 101, 118, 104, 90, 97, 106, 82, 100, 80, 99, 108, 101, 104, 125, 86, 123, 117, 70, 126, 108, 128, 93, 101, 112, 123, 125, 81, 76, 98, 122, 118, 91], [103, 117, 118, 93, 104, 78, 78, 104, 128, 94, 102, 120, 107, 124, 76, 113, 126, 95, 119, 80, 129, 105, 77, 87, 126, 81, 81, 81, 114, 119, 94, 99, 77, 78, 116, 95, 74, 109, 102, 84, 103, 95, 125, 121, 75, 91, 70, 73, 117, 103, 125, 122], [87, 73, 113, 101, 98, 110, 96, 111, 118, 85, 116, 128, 127, 120, 86, 114, 120, 92, 96, 85, 122, 103, 109, 103, 102, 76, 95, 124, 124, 119, 100, 88, 128, 101, 109, 70, 95, 112, 95, 101, 131, 101, 100, 83], [85, 92, 128, 113, 89, 107, 84, 102, 103, 104, 102, 77, 90, 84, 128, 103, 132, 75, 74, 133, 117, 105, 129, 100, 119, 83, 76, 104, 72, 75, 76, 119, 99, 132, 85, 76, 122, 92, 127, 133, 72, 73, 130, 128, 96, 113, 73, 132, 101, 74, 81, 109], [73, 126, 79, 111, 133, 132, 75, 90, 81, 133, 72, 132, 122, 94, 77, 80, 120, 92, 126, 114, 93, 90, 72, 129, 104, 104, 97, 74, 121, 104, 75, 86, 112, 132, 114, 100, 130, 100, 99, 130, 109, 120, 76, 127, 113, 105, 72], [117, 100, 78, 119, 127, 106, 130, 119, 96, 96, 129, 129, 73, 121, 124, 88, 96, 88, 97, 95, 117, 119, 122, 111, 129, 98, 114, 76, 111, 130, 136, 100, 111, 104, 98, 115, 91, 102, 83, 122, 128, 126, 129, 119, 78, 124], [77, 104, 74, 88, 77, 138, 111, 88, 92, 106, 102, 76, 95, 80, 132, 137, 84, 106, 135, 132, 133, 80, 87, 96, 119, 136, 84, 125, 136, 135, 138, 84, 131, 77, 92, 107, 78, 119, 86, 93, 113, 121, 124, 115, 104, 78, 94, 94, 107, 112, 137, 122, 137, 110, 82, 130], [116, 135, 83, 133, 140, 84, 96, 109, 99, 92, 103, 93, 77, 134, 138, 75, 114, 85, 119, 131, 74, 97, 121, 134, 130, 108, 129, 111, 120, 114, 122, 76, 112, 116, 101, 136, 77, 132, 128, 81, 126, 112, 121, 126, 78, 103, 111, 108, 100, 92, 77, 94, 79], [123, 98, 79, 85, 98, 86, 120, 109, 141, 137, 141, 139, 100, 97, 87, 105, 75, 124, 120, 117, 135, 118, 125, 129, 104, 92, 126, 80, 75, 92, 118, 105, 117, 117, 109, 111, 103, 122, 138, 119, 105, 115, 96, 75, 103, 127, 134, 126, 121, 119, 125, 133, 131, 131], [135, 103, 109, 109, 97, 80, 83, 101, 83, 124, 100, 126, 87, 134, 92, 90, 105, 85, 93, 77, 124, 83, 123, 120, 125, 86, 130, 122, 111, 111, 90, 112, 108, 88, 128, 142, 139, 120, 138, 95, 115, 142, 99, 100, 133, 106, 126, 88], [138, 134, 100, 124, 142, 91, 96, 141, 138, 93, 107, 129, 108, 108, 130, 92, 84, 116, 96, 97, 124, 99, 83, 117, 85, 144, 90, 96, 141, 77, 130, 128, 94, 118, 140, 88, 84, 101, 115, 97, 134, 90, 83, 114, 142, 110, 86, 95, 77], [114, 107, 136, 132, 93, 114, 125, 134, 124, 97, 106, 78, 123, 139, 82, 144, 144, 81, 134, 140, 139, 96, 112, 88, 127, 82, 142, 93, 146, 96, 145, 105, 116, 133, 78, 84, 145, 127, 133, 101, 117, 112, 111, 108, 116, 112, 97, 95, 94], [1000], [2000]]
let roundWaiting = false
let autostart = false

let enemiesCooldown

let gamespeed = 0
let placingTower = 0
let inUpgradesScreen = false
let upgradeButtons = []

const socket = io('https://tower-defense-game-server.vercel.app/');

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('gameAlreadyStarted', handleGameAlreadyStarted)
socket.on('usernameTooLong', handleUsernameTooLong);
socket.on('noUsername', handleNoUsername)

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const startGameBtn = document.getElementById('startGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const usernameInput = document.getElementById('usernameInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const copyCodeBtn = document.getElementById('copyButton');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
startGameBtn.addEventListener('click', startGame)
copyCodeBtn.addEventListener('click', copyGameCode)

class Button {
  constructor({ x = 0, y = 0, w = 0, h = 0, color = 'red', text = '', pressedcolor = 'green', hovercolor = 'blue', pressedfunction = 'null' }) {
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.color = color
    this.hovercolor = hovercolor
    this.pressedcolor = pressedcolor
    this.pressedfunction = pressedfunction
    this.hover = false
    this.clicked = false
    this.declick = 0
    this.text = text
  }
  draw() {

    if (this.hover && this.clicked) {
      c.fillStyle = this.pressedcolor
    } else if (this.hover) {
      c.fillStyle = this.hovercolor
    } else {
      c.fillStyle = this.color
    }

    c.fillRect(this.x, this.y, this.width, this.height)
    c.fillStyle = 'black'
    c.font = `${30 - (this.text.length + 1)}px sans-serif`
    c.fillText(this.text, this.x + ((this.width / 2) - 40), this.y + ((this.height / 2) + 10))
  }
  update() {
    if (mousex >= this.x && mousex <= this.x + this.width && mousey >= this.y && mousey <= this.y + this.height) {
      this.hover = true
    } else {
      this.hover = false
    }
    if (this.declick <= 0) {
      this.clicked = false
    } else {
      this.declick -= 1
    }
    this.draw()
  }
  onclick() {
    this.declick += 10
    this.clicked = true
    this.draw()
    if (this.pressedfunction == sell) {
      sell(this.towerToSell, this.buttonToSell)
      return true
    } else if (this.pressedfunction == 'makesellbutton') {
      let tempButton = new Button({ x: this.towerToSell.position.x - gameState.towerSizes[this.towerToSell.type], y: this.towerToSell.position.y - gameState.towerSizes[this.towerToSell.type] * 1, w: gameState.towerSizes[this.towerToSell.type] * 2, h: gameState.towerSizes[this.towerToSell.type], color: "red", pressedcolor: "red", hovercolor: "red", text: " sell", pressedfunction: "" })
      tempButton.towerToSell = this.towerToSell
      tempButton.buttonToSell = this.buttonToSell
      tempButton.pressedfunction = sell
      buttons.push(tempButton)
    } else {
      setTimeout(this.pressedfunction, 0)
    }
  }
}
class Enemy {
  constructor({ position = { x: 0, y: 0 }, health }) {
    this.position = position
    this.width = 50
    this.height = 50
    this.waypointIndex = 0
    this.stun = 0
    this.health = health
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.radius = 50
    this.velocity = {
      x: 0,
      y: 0
    }
  }
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.fillStyle = 'black'
    c.font = '32px sans-serif'
    c.fillText(Math.round(this.health * 10) / 10, this.position.x, this.position.y)
  }
  update() {
    this.draw()

    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    const speed = 3 * gamespeed

    if (this.stun <= 0) {
    this.velocity.x = Math.cos(angle) * speed
    this.velocity.y = Math.sin(angle) * speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    } else {
      this.stun -= gamespeed
    }

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if (this.health <= 0) {
      return true
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
      Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
      Math.abs(this.velocity.y)
    ) {
      if (this.waypointIndex == waypoints.length - 1) {
        lives -= this.health
        return true
      } else {
        this.waypointIndex++
      }
    }
  }
}

class tower {
  constructor({ position = { x: 0, y: 0 }, type = 1 , owner = -1}) {
    this.type = type
    this.owner = owner
    this.damage = gameState.towerDamage[this.type]
    this.range = gameState.towerRanges[this.type]
    this.speed = gameState.towerSpeeds[this.type]
    this.size = gameState.towerSizes[this.type]
    this.position = position
    this.width = this.size * 2
    this.height = this.size * 2
    this.projectileCooldown = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.draw = function()  {
      c.fillStyle = 'lime'
      c.fillRect(this.center.x - this.height, this.center.y - this.width, this.width, this.height)
    }
  }
  draw() {
    c.fillStyle = 'lime'
    c.fillRect(this.center.x - this.height, this.center.y - this.width, this.width, this.height)
  }
  update() {
    this.draw()

    if (this.projectileCooldown <= 0 && gameState.enemies.length > 0) {
      this.projectileCooldown += this.speed / gamespeed
      for (let i in gameState.enemies) {
        let enemy = gameState.enemies[i]
        if ((this.range >= distance(this.position.x, this.position.y, enemy.position.x, enemy.position.y)) || (this.range >= distance(this.position.x, this.position.y, enemy.position.x, enemy.position.y + enemy.height)) || (this.range >= distance(this.position.x, this.position.y, enemy.position.x + enemy.width, enemy.position.y)) || (this.range >= distance(this.position.x, this.position.y, enemy.position.x + enemy.width, enemy.position.y + enemy.height))) {
          gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type }))
          if (this.type == 1 && gameState.upgrades[1][2] == 1) {
            gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type, angleOffset: 0.523599}))
          }
          if (this.type == 1 && gameState.upgrades[1][3] == 1) {
            gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type, angleOffset: -0.523599}))
          }
          if (this.type == 1 && gameState.upgrades[1][6] == 1) {
            gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type, angleOffset: 0.174533}))
            gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type, angleOffset: -0.174533}))
            gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type, angleOffset: 0.349066}))
            gameState.projectiles.push(new projectile({ position: { x: this.position.x, y: this.position.y }, endpoint: { x: enemy.position.x + (enemy.velocity.x * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20), y: enemy.position.y + (enemy.velocity.y * distance(this.position.x, this.position.y, enemy.center.x, enemy.center.y) / 20) }, damage: this.damage, lifespan: this.range, type: this.type, angleOffset: -0.349066}))
          }
          return
        }
      }
    } else {
      this.projectileCooldown -= 1 * gamespeed
    }
  }
}

class projectile {
  constructor({ position = { x: 0, y: 0 }, endpoint = { x: 0, y: 0 }, damage = 1, lifespan = 500, type = 0, angleOffset = 0 }) {
    this.position = position
    this.oldpositon = {x: 0, y: 0}
    this.damage = damage
    this.lifespan = lifespan
    this.angleOffset = angleOffset
    this.type = type
    this.range = 100
    this.width = 12.5
    this.height = 12.5
    this.waypointIndex = 0
    this.speed = 20
    this.distanceTravelled = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.endpoint = endpoint
    this.radius = 50
    this.health = 100
    this.velocity = {
      x: 0,
      y: 0
    }
    this.yDistance = this.endpoint.y - this.center.y
    this.xDistance = this.endpoint.x - this.center.x
    this.angle = Math.atan2(this.yDistance, this.xDistance) + this.angleOffset
    if (this.angleOffset != 0) {
      this.endpoint.x = this.position.x + Math.cos(this.angle) * this.speed * 10
      this.endpoint.y = this.position.y + Math.sin(this.angle) * this.speed * 10
    }
  }
  draw() {
    c.fillStyle = 'orange'
    c.fillRect(this.center.x - this.height, this.center.y - this.width, this.width, this.height)
  }
  update() {
    this.draw()

    if (this.type == 2) {
      this.speed = 50 * gamespeed
    } else {
      this.speed = 20 * gamespeed
    }

    if ((this.type == 2 && gameState.upgrades[2][6] == 1) || (this.type == 4)) {
    if (gameState.enemies.length > 0) {
      for (let i in gameState.enemies) {
        let enemy = gameState.enemies[i]
        let lowestDistance = 9999999
        if (distance(this.position.x, this.position.y, enemy.position.x, enemy.position.y) < lowestDistance) {
          this.endpoint.x = enemy.center.x
          this.endpoint.y = enemy.center.y
        }
      }
    }
  }

    this.yDistance = this.endpoint.y - this.center.y
    this.xDistance = this.endpoint.x - this.center.x
    this.angle = Math.atan2(this.yDistance, this.xDistance)

    this.velocity.x = Math.cos(this.angle) * this.speed
    this.velocity.y = Math.sin(this.angle) * this.speed

    this.oldpositon.x = this.position.x
    this.oldpositon.y = this.position.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.distanceTravelled += this.speed
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    for (let i = 0; i < gameState.enemies.length; i++) {
      let enemy = gameState.enemies[i]
      if (isColliding(this.position.x, this.position.y, this.width, this.height, enemy.position.x, enemy.position.y, enemy.width, enemy.height) || rectLineIntersection(enemy.position.x, enemy.position.y, enemy.width, enemy.height, this.position.x, this.position.y, this.oldpositon.x, this.oldpositon.y)) {
        if (gameState.enemies[i].health < this.damage) {
          money += gameState.enemies[i].health
          this.damage -= gameState.enemies[i].health
          gameState.enemies[i].health -= this.damage
          gameState.enemies.splice(i, 1)
          this.endpoint.x = this.position.x + this.velocity.x * 10
          this.endpoint.y = this.position.y + this.velocity.y * 10
        } else {
          money += this.damage
          gameState.enemies[i].health -= this.damage
          if (gameState.enemies[i].health <= 0) {
            gameState.enemies.splice(i, 1)
          }
          if (gameState.upgrades[2][3] == 1 && this.type == 2) {
            enemy.stun += 60
          } else if (gameState.upgrades[2][2] == 1 && this.type == 2) {
            enemy.stun += 30
          }
          return true
        }
      }
    }
    if (
      this.distanceTravelled > this.lifespan
    ) {
      return true
    }
    if (
      (Math.abs(Math.round(this.center.x) - Math.round(this.endpoint.x)) <
      Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(this.endpoint.y)) <
      Math.abs(this.velocity.y))
    ) {
      this.endpoint.x = this.position.x + this.velocity.x * 10
      this.endpoint.y = this.position.y + this.velocity.y * 10
    }
  }
}

class UpgradeButton {
  constructor({ x = 0, y = 0, r=0, color = 'red', text = '', pressedcolor = 'green', hovercolor = 'blue', pressedfunction = 'null', cost = 1000 }) {
    this.x = x
    this.y = y
    this.radius = r
    this.color = color
    this.hovercolor = hovercolor
    this.pressedcolor = pressedcolor
    this.pressedfunction = pressedfunction
    this.hover = false
    this.clicked = false
    this.declick = 0
    this.text = text
    this.active = true
    this.purchased = false
    this.cost = cost
  }
  draw(fontstyle) {

    if (this.hover && this.clicked) {
      c.fillStyle = this.pressedcolor
    } else if (this.hover) {
      c.fillStyle = this.hovercolor
    } else {
      c.fillStyle = this.color
    }

    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    c.fill()
    c.closePath()
    c.fillStyle = 'black'
    c.font = fontstyle || `${30 - (this.text.length / 2 + 10)}px sans-serif`
    c.fillText(this.text, this.x - (this.radius) + 5, this.y)
    c.fillText(this.cost, this.x - (this.radius) + 10, this.y + 20 + (10 * (fontstyle != null)))
  }
  update(fontstyle) {
    if (this.active) {
      this.color = 'blue'
      this.hovercolor = 'lime'
    } else {
      this.color = 'green'
      this.hovercolor = 'green'
    }
    if (this.purchased) {
      this.color = 'lime'
      this.hovercolor = 'lime'
      this.active = false
    }
    if (distance(this.x, this.y, mousex, mousey) < this.radius) {
      this.hover = true
    } else {
      this.hover = false
    }
    if (this.declick <= 0) {
      this.clicked = false
    } else {
      this.declick -= 1
    }
    this.draw(fontstyle)
  }
  onclick() {
    if (this.active) {
    this.declick += 10
    this.clicked = true
    this.draw()
    this.purchased = true
    setTimeout(this.pressedfunction, 0)
  }
  }
}


canvas.addEventListener('mousemove', function () {
  let pos = findPos(canvas)
  mousex = event.clientX - (((window.innerWidth - canvas.width) / 2) + (canvas.width / 10))
  mousey = event.clientY - (window.innerHeight - canvas.height) / 2
  socket.emit('mousemove', {x: mousex, y: mousey, playerNumber: playerNumber})
})
canvas.addEventListener('mousedown', function () {
  mouseDown = true
  if (!inUpgradesScreen) {
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i]
    if (button.hover) {
      button.click = true
      if (button.onclick()) {
        for (let u in buttons) {
          if (buttons[u] === button) {
            buttons.splice(u, 1)
          }
        }
      }
    }
  }
  for (let i in buttons) {
    let button = buttons[i]
    if (button.pressedfunction == sell && !isColliding(mousex, mousey, 1, 1, button.x, button.y, button.width, button.height * 2)) {
      buttons.splice(i, 1)
    }
  }
  if (placingTower > 0 && (validPlacement(mousex - gameState.towerSizes[placingTower], mousey - gameState.towerSizes[placingTower], gameState.towerSizes[placingTower] * 2, gameState.towerSizes[placingTower] * 2) && (money >= gameState.towerCosts[placingTower]))) {
    money -= gameState.towerCosts[placingTower]
    let temptower = new tower({ position: { x: mousex, y: mousey }, type: placingTower, owner: playerNumber })
    socket.emit('towerBought', temptower, playerNumber)
    var tempButton = new Button({ x: mousex - gameState.towerSizes[placingTower], y: mousey - gameState.towerSizes[placingTower], w: gameState.towerSizes[placingTower] * 2, h: gameState.towerSizes[placingTower] * 2, color: 'lime', pressedcolor: 'lime', hovercolor: 'lime', text: '', pressedfunction: '' })
    tempButton.towerToSell = temptower
    tempButton.buttonToSell = tempButton
    tempButton.pressedfunction = 'makesellbutton'
    buttons.push(tempButton)
  }
  } else {
    for (let i in upgradeButtons) {
    let button = upgradeButtons[i]
    if (distance(mousex, mousey, button.x, button.y) <= button.radius) {
      button.onclick()
    }
    }
    if (exitupgrades.hover) {
      exitupgrades.onclick()
    }
    if (arrowRight.hover) {
      arrowRight.onclick()
    }
    if (arrowLeft.hover) {
      arrowLeft.onclick()
    }
  }
})

function newGame() {
  socket.emit('newGame', usernameInput.value);
  init();
}

function joinGame() {
  const code = gameCodeInput.value;
  gameCodeDisplay.innerText = code;
  startGameBtn.remove()
  socket.emit('joinGame', {roomName: code, username: usernameInput.value});
  init();
}

function startGame() {
  socket.emit('startGame')
  startGameBtn.remove()
}

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";

  
  canvas = document.getElementById('canvas');
  c = canvas.getContext('2d');

  canvas.width = 1060;
  canvas.height = 640;

  c.fillStyle = 'gray';
  c.fillRect(0, 0, canvas.width, canvas.height);
  bound = canvas.getBoundingClientRect();

  document.getElementById('stylesheet').setAttribute('href', 'style.css')
  document.getElementById('stylesheet').removeAttribute('integrity')
  document.getElementById('stylesheet').removeAttribute('crossorigin')

  startbutton = new Button({ x: 960, y: 540, w: 100, h: 100, color: 'red', text: 'start', hovercolor: 'blue', pressedcolor: 'green', pressedfunction: startbuttonpressed })
  speedButton = new Button({ x: 960, y: 540, w: 100, h: 100, color: 'red', text: 'fast', hovercolor: 'blue', pressedcolor: 'green', pressedfunction: changeSpeed })
autostartbutton = new Button({ x: 960, y: 500, w: 100, h: 40, color: 'lime', text: 'autostart: off', hovercolor: 'green', pressedcolor: 'blue', pressedfunction: toggleAutoStart })
var tower1button = new Button({ x: 960, y: 0, w: 100, h: 100, color: 'lime', text: towerNames[1], hovercolor: 'green', pressedcolor: 'blue', pressedfunction: placetower1 })
var tower2button = new Button({ x: 960, y: 100, w: 100, h: 100, color: 'lime', text: towerNames[2], hovercolor: 'green', pressedcolor: 'blue', pressedfunction: placetower2 })
var tower3button = new Button({ x: 960, y: 200, w: 100, h: 100, color: 'lime', text: towerNames[3], hovercolor: 'green', pressedcolor: 'blue', pressedfunction: placetower3 })
var tower4button = new Button({ x: 960, y: 300, w: 100, h: 100, color: 'lime', text: towerNames[4], hovercolor: 'green', pressedcolor: 'blue', pressedfunction: placetower4 })
var upgradesbutton = new Button({ x: 960, y: 400, w: 100, h: 100, color: 'lime', text: 'upgrades', hovercolor: 'green', pressedcolor: 'blue', pressedfunction: toggleUpgrades })
buttons.push(startbutton)
buttons.push(autostartbutton)
buttons.push(tower1button)
buttons.push(tower2button)
buttons.push(tower3button)
buttons.push(tower4button)
buttons.push(upgradesbutton)

  var smallupgrade1 = new UpgradeButton({x: 135, y: 255, r: 42, color: 'lime', text: 'faster', pressedfunction: 'upgrade(0)'})
var smallupgrade2 = new UpgradeButton({x: 135, y: 400, r: 42, color: 'green', text: 'range', pressedfunction: 'upgrade(1)'})
var smallupgrade3 = new UpgradeButton({x: 480, y: 255, r: 42, color: 'lime', text: 'double\nshot', pressedfunction: 'upgrade(2)'})
var smallupgrade4 = new UpgradeButton({x: 480, y: 400, r: 42, color: 'green', text: 'triple\nshot', pressedfunction: 'upgrade(3)'})
var smallupgrade5 = new UpgradeButton({x: 825, y: 255, r: 42, color: 'lime', text: '+2 damage', pressedfunction: 'upgrade(4)'})
var smallupgrade6 = new UpgradeButton({x: 825, y: 400, r: 42, color: 'green', text: '+2 damage', pressedfunction: 'upgrade(5)'})
var finalupgrade = new UpgradeButton({x: 480, y: 570, r: 65, color: 'green', text: 'Shotgun', pressedfunction: 'upgrade(6)'})
exitupgrades = new Button({x: 0, y: 0, w: 50, h: 50, color: 'red', hovercolor: 'darkred', pressedcolor: 'red', text: '    X', pressedfunction: toggleUpgrades})
arrowRight = new Button({x: 555, y: 45, w: 50, h: 50, color: 'red', hovercolor: 'darkred', pressedcolor: 'red', text: '   =>', pressedfunction: 'changeUpgradeTower(1)'})
arrowLeft = new Button({x: 355, y: 45, w: 50, h: 50, color: 'red', hovercolor: 'darkred', pressedcolor: 'red', text: '   <=', pressedfunction: 'changeUpgradeTower(-1)'})
upgradeButtons.push(smallupgrade1, smallupgrade2, smallupgrade3, smallupgrade4, smallupgrade5, smallupgrade6, finalupgrade)
   
  map = new Image()
    map.src = "img/map.png"
    upgradesImage = new Image()
    upgradesImage.src = "img/upgradescreen.png"
  gameActive = true;    
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return { x: curleft, y: curtop };
    }
    return undefined;
  }
  
  function distance(x, y, x2, y2) {
    return Math.sqrt((x - x2) ** 2 + (y - y2) ** 2)
  }
  
  function isColliding(x, y, w, h, x2, y2, w2, h2) {
    if ((((x <= x2) && ((x + w) >= (x2 + w2))) || ((x >= x2) && (x <= (x2 + w2)) || (((x + w) >= x2) && ((x + w) <= (x2 + w2))))) && (((y >= y2) && (y <= (y2 + h2)) || (((y + h) >= y2) && ((y + h) <= (y2 + h2)))) || ((y <= y2) && ((y + h) >= (y2 + h2))))) {
      return true
    } else if (((x <= x2) && ((x + w) >= (x2 + w2))) && ((y <= y2) && ((y + h) >= (y2 + h2)))) {
      return true
    } else {
      return false
    }
  }
  
  function lineLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  
    // calculate the distance to intersection point
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
  
      // where the lines meet
      let intersectionX = x1 + (uA * (x2-x1));
      let intersectionY = y1 + (uA * (y2-y1));
  
      return true;
    }
    return false;
  }
  
  function rectLineIntersection(rx, ry, rw, rh, lx1, ly1, lx2, ly2) {
    let intersecting = false
    if (lineLineIntersection(lx1, ly1, lx2, ly2, rx, ry, rx, ry + rh) || lineLineIntersection(lx1, ly1, lx2, ly2, rx, ry + rh, rx + rw, ry + rh) || lineLineIntersection(lx1, ly1, lx2, ly2, rx + rw, ry + rh, rx + rw, ry) || lineLineIntersection(lx1, ly1, lx2, ly2, rx, ry, rx + rw, ry)) {
      intersecting = true
    }
    return intersecting
  
  }
  
  function validPlacement(x, y, w, h) {
    let valid = true
    for (let i in gameState.towers) {
      let tower = gameState.towers[i]
      if (isColliding(gameState.towers[i].position.x - tower.size, gameState.towers[i].position.y - tower.size, tower.size * 2, tower.size * 2, x, y, w, h)) {
        valid = false
      }
    }
    for (let i in gameState.towers) {
      let tower = gameState.towers[i]
      if (isColliding(x, y, w, h, gameState.towers[i].position.x - tower.size, gameState.towers[i].position.y - tower.size, tower.size * 2, tower.size * 2)) {
        valid = false
      }
    }
    for (let i in collisionRectangles) {
      if (isColliding(x, y, w, h, collisionRectangles[i].x, collisionRectangles[i].y, collisionRectangles[i].w, collisionRectangles[i].h)) {
        valid = false
      }
    }
    for (let i in collisionRectangles) {
      if (isColliding(collisionRectangles[i].x, collisionRectangles[i].y, collisionRectangles[i].w, collisionRectangles[i].h, x, y, w, h)) {
        valid = false
      }
    }
    if (valid) {
      return true
    } else {
      return false
    }
  }

  function startbuttonpressed() {
    socket.emit('gamespeedchange', {gamespeed: 1, previousgamespeed: gamespeed})
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] === startbutton) {
        buttons.splice(i, 1)
      }
    }
      buttons.push(speedButton)
  }
  
  function changeSpeed() {
    if (gamespeed == 1) {
      socket.emit('gamespeedchange', {gamespeed: 2, previousgamespeed: gamespeed})
      speedButton.text = 'slow'
      enemiesCooldown /= 2
    } else {
      socket.emit('gamespeedchange', {gamespeed: 1, previousgamespeed: gamespeed})
      speedButton.text = 'fast'
      enemiesCooldown *= 2
    }
  }
  
  function toggleAutoStart() {
    if (autostart) {
      socket.emit('autoStartToggle', false)
      autostartbutton.text = 'autostart: off'
    } else {
      socket.emit('autoStartToggle', true)
      autostartbutton.text = 'autostart: on'
    }
  }
  
  function placetower1() {
    if (placingTower != 1) {
      placingTower = 1
    } else {
      placingTower = 0
    }
  }
  
  function placetower2() {
    if (placingTower != 2) {
      placingTower = 2
    } else {
      placingTower = 0
    }
  }
  
  function placetower3() {
    if (placingTower != 3) {
      placingTower = 3
    } else {
      placingTower = 0
    }
  }
  
  function placetower4() {
    if (placingTower != 4) {
      placingTower = 4
    } else {
      placingTower = 0
    }
  }
  
  function sell(selltower, sellbutton) {
    socket.emit('sellTower', selltower, playerNumber)
    for (let i in gameState.towers) {
      if (gameState.towers[i] === selltower) {

        break
      }
    }
    for (let i in buttons) {
      if (buttons[i] === sellbutton) {
        buttons.splice(i, 1)
        break
      }
    }
  }
  
  function toggleUpgrades() {
    inUpgradesScreen = !inUpgradesScreen
  }

  function upgrade(upgrade) {
    socket.emit('upgrade', {towerBeingUpgraded: towerBeingUpgraded, upgrade: upgrade, playerNumber: playerNumber})
  }
  
  function changeUpgradeTower(number) {
    towerBeingUpgraded += number
    if (towerBeingUpgraded < 1) {
      towerBeingUpgraded = towerNames.length - 2
    } else if (towerBeingUpgraded > towerNames.length - 2) {
      towerBeingUpgraded = 1
    }
  }
  

function keydown(e) {
  socket.emit('keydown', e.keyCode);
}

function copyGameCode() {
  navigator.clipboard.writeText(gameCodeDisplay.innerText)
}

function drawGame(state) {
  gameState = state
  gamespeed = state.gamespeed
  money = state.players[playerNumber - 1].money
  lives = state.lives
  round = state.round
  autostart = state.autostart
    let startButtonFound = false
    let speedButtonFound = false
    let startButtonIndex = -1
    let speedButtonIndex = -1
    for (let i in buttons) {
      if (buttons[i] === startbutton) {
        startButtonFound = true
        startButtonIndex = i
      }
      if (buttons[i] === speedButton) {
        speedButtonFound = true
        speedButtonIndex = i
      }
  }

  if (speedButtonFound && gamespeed == 0) {
    buttons.splice(speedButtonIndex, 1)
  }
  if (startButtonFound && gamespeed != 0) {
    buttons.splice(startButtonIndex, 1)
  }
  if (!startButtonFound && gamespeed == 0) {
    buttons.push(startbutton)
  }
  if (!speedButtonFound && gamespeed != 0) {
    buttons.push(speedButton)
  }
  if (gamespeed == 1) {
    speedButton.text = 'fast'
  } else {
    speedButton.text = 'slow'
  }

  if (!autostart) {
    autostartbutton.text = 'autostart: off'
  } else {
    autostartbutton.text = 'autostart: on'
  }
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (!inUpgradesScreen) {
    c.fillStyle = 'red'
    c.drawImage(map, 0, 0, canvas.width - 100, canvas.height);
    
    for (let i = gameState.enemies.length - 1; i >= 0; i--) {
      let enemy = gameState.enemies[i]
      c.fillStyle = 'red'
    c.fillRect(enemy.position.x, enemy.position.y, enemy.width, enemy.height)
    c.fillStyle = 'black'
    c.font = '32px sans-serif'
    c.fillText(Math.round(enemy.health * 10) / 10, enemy.position.x, enemy.position.y)
    }
    if (gameState.towers.length > 0) {
      for (let i = 0; i < gameState.towers.length; i++) {
        let tower = gameState.towers[i]
        c.fillStyle = 'lime'
      c.fillRect(tower.center.x - tower.height, tower.center.y - tower.width, tower.width, tower.height)
      }
    }
    if (gameState.projectiles.length > 0) {
      for (let i = 0; i < gameState.projectiles.length; i++) {
        let projectile = gameState.projectiles[i]
        c.fillStyle = 'orange'
        c.fillRect(projectile.center.x - projectile.height, projectile.center.y - projectile.width, projectile.width, projectile.height)
      }
    }
    
   
    for (let i = 0; i < buttons.length; i++) {
      c.font = '30px sans-serif'
      let button = buttons[i]
      button.update()
    }
    if (lives <= 0) {
      c.font = '96px sans-serif'
      c.fillStyle = 'red'
      c.fillText("GAME OVER", canvas.width / 2 - 300, canvas.height / 2)
      return
    }
    if (round > rounds.length - 1) {
      c.font = '96px sans-serif'
      c.fillStyle = 'black'
      c.fillText("YOU WIN", canvas.width / 2 - 300, canvas.height / 2)
      return
    }
    for (let i in buttons) {
      let foundButton = false
      let button = buttons[i]
      if (button.pressedfunction == sell) {
        for (let u in buttons) {
          if (button.buttonToSell === buttons[u]) {
            foundButton = true
          }
        }
        if (!foundButton) {
        buttons.splice(i, 1)
        }
      }
    }
    c.fillStyle = 'lime'
    if (!validPlacement(mousex - gameState.towerSizes[placingTower], mousey - gameState.towerSizes[placingTower], gameState.towerSizes[placingTower] * 2, gameState.towerSizes[placingTower] * 2)) {
      c.fillStyle = 'red'
    }
    //-----UI ELEMENTS-----
    if (placingTower > 0) {
      c.fillRect(mousex - gameState.towerSizes[placingTower], mousey - gameState.towerSizes[placingTower], gameState.towerSizes[placingTower] * 2, gameState.towerSizes[placingTower] * 2)
      c.beginPath()
      c.arc(mousex, mousey, gameState.towerRanges[placingTower], 0, 2 * Math.PI)
      c.fillStyle = 'rgba(240, 248, 255, 0.05)'
      c.fill()
      c.fillStyle = 'rgb(240, 248, 255)'
      c.stroke()
      c.closePath()
    }
    c.fillStyle = 'white'
    c.font = '30px sans-serif'
    c.fillText("Money: " + Math.round(money), 0, 30)
    c.fillText("Lives: " + lives, 0, 70)
    c.fillText("Round: " + round, 0, 110)
  } else if (inUpgradesScreen) {
    c.drawImage(upgradesImage, 0, 0, canvas.width - 100, canvas.height)
  
    for (let i in upgradeButtons) {
      let button = upgradeButtons[i]
      button.cost = upgradeCosts[towerBeingUpgraded][i]
      button.text = upgradeNames[towerBeingUpgraded][i]
      if (i == 6) {
        if (!gameState.upgrades[towerBeingUpgraded].includes(0)) {button.active = true} else {button.active = false}
        if (gameState.upgrades[towerBeingUpgraded][i] == -1) {
          button.purchased = false
        } else {
          button.purchased = true
        }
        button.update('30px sans-serif')
        break
      }
      if (!gameState.upgrades[towerBeingUpgraded][i - 1] == 1 && i != 0 && i != 2 && i != 4) {
        button.active = false
      } else {
        button.active = true
      }
      if (gameState.upgrades[towerBeingUpgraded][i] == 0) {
        button.purchased = false
      } else {
        button.purchased = true
      }
      button.update()
    }
    exitupgrades.update()
    arrowRight.update()
    arrowLeft.update()
    c.beginPath()
    c.fillStyle = 'lime'
    c.arc(480, 75, 65, 0, 2 * Math.PI)
    c.fill()
    c.closePath()
    c.fillStyle = 'black'
    c.fillText(towerNames[towerBeingUpgraded], 440, 80)
    c.fillText("Money: " + Math.round(money), 60, 30)
  }
}

function handleInit(number) {
  playerNumber = number;
}

function handleGameState(state) {
  if (!gameActive) {
  return
  }
  let gameState = JSON.parse(state);
  let playersList = ''
    for (let i in gameState.players) {
      let player = gameState.players[i]
      playersList += `<p>${player.username}</p>`
    }
    document.getElementById('playersDiv').innerHTML = playersList
  if (!gameState.gameStarted) {
    return;
  }
  requestAnimationFrame(() => drawGame(gameState));
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}

function handleUnknownCode() {
  reset();
  alert('Unknown Game Code')
}

function handleTooManyPlayers() {
  reset();
  alert('This game is full');
}

function handleGameAlreadyStarted() {
  reset();
  alert('This game is already in progress')
}

function handleUsernameTooLong() {
  reset();
  alert('Username too long')
}

function handleNoUsername() {
  reset();
  alert('Invalid username')
}

function reset() {
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
  location.reload()
}
