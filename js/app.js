var GameTick = function () {
  this.spawncheck = 0;
  this.toNextSpawn = 30; // ~1/2 second
  // Simply a variable that I created to help manage # of enemies and logs
};
GameTick.prototype.determineEntities = function(type, row) { // the row's type ("water" or "stone") and the row number
  var result = 0;
  switch (type) {
    // case 'water':
    // for (var i = 0; i < allLogs.length; i++) {
    //   if (allLogs[i].row === (row)) {
    //     result++;
    //   }
    // }
    // break;
    case 'stone':
    for (var i2 = 0; i2 < allEnemies.length; i2++) {
      if (allEnemies[i2].row === (row)) {
        result++;
      }
    }
    break;
    default:
    // Should not reach following line (ever)
    console.log('error in testing row: type not valid');
  }
  return result;
};
// GameTick.prototype.checkLogs = function(row) {
//   if (allLogs.length === 0 || allLogs === []) {
//     this.createEntity('water', row);
//   }
//   else {
//     var curr = this.determineEntities('water', row);
//     if (curr < 5) { // there are less than 5 logs in the current row
//       var chance;
//       switch (curr) {
//         case 0:
//         chance = 100;
//         break;
//         case 1:
//         chance = 35;
//         break;
//         case 2:
//         chance = 20;
//         break;
//         case 3:
//         chance = 15;
//         break;
//         case 4:
//         chance = 15;
//         break;
//         default: // none (should never reach here)
//       }
//       var out = (Math.random() * 100);
//       if (out <= chance) {
//         _temp = new Log(row);
//         logIdTracker++;
//         if (allLogs.length === 0 || allLogs === []) {
//           allLogs[0] = _temp;
//         }
//         else {
//           allLogs.push(_temp);
//         }
//       }
//     }
//   }
// };
GameTick.prototype.checkEnemies = function(row) {
  if (allEnemies.length === 0 || allEnemies === []) {
    this.createEntity('stone', row);
  }
  else {
    var curr = this.determineEntities('stone', row);
    if (curr <= 9) { /* 6 enemies per row */
      var chance;
      switch (curr) {
        case 0:
        chance = 100;
        break;
        case 1:
        chance = 55;
        break;
        case 2:
        chance = 50;
        break;
        case 3:
        chance = 40;
        break;
        case 4:
        case 5:
        chance = 25;
        break;
        default:
        chance = 15;
      }
      var out = (Math.random() * 100);
      if (out <= chance) {
        var _temp = new Enemy(row);
        enemyIdTracker++;
        if (allEnemies.length === 0 || allEnemies === []) {
          allEnemies[0] = _temp;
        }
        else {
            allEnemies.push(_temp);
        }
      }
    }
  }
};
GameTick.prototype.createEntity = function(type, row) {
  // if (type === 'water') {
  //   var _temp = new Log(row);
  //   logIdTracker++;
  //   if (allLogs.length === 0 || allLogs === []) {
  //     allLogs[0] = _temp;
  //   }
  //   else {
  //     allLogs.push(_temp);
  //   }
  // }
  // else {
    if (type === 'stone') {
      var _temp2 = new Enemy(row);
      enemyIdTracker++;
      if (allEnemies.length === 0 || allEnemies === []) {
        allEnemies[0] = _temp2;
      }
      else {
        allEnemies.push(_temp2);
      }
    }
    else {
      console.log("error in createEntity function: type not valid");
    }
  // }
};
// Logs the player must walk on to cross water
// var Log = function(rownum) {
//   switch (rownum) {
//     case 2: // actual row is 2nd row (1st row of water)
//     this.row = 2;
//     break;
//     case 3: // actual row is 3rd row (2nd row of water)
//     this.row = 3;
//     break;
//     default:
//     // Should not reach following line (ever)
//     console.log("error in creating log: row not valid");
//   }
//   this.x = 0;
//   this.y = (this.row * 83);
//   this.speed = 1;
//   // The image/sprite for our enemies, this uses
//   // a helper we've provided to easily load images
//   this.sprite = 'images/river-logv3.png';
//   this.logId = logIdTracker;
// };
// Log.prototype.update = function(dt) {
//   // You should multiply any movement by the dt parameter
//   // which will ensure the game runs at the same speed for
//   // all computers.
//   if (this.x > 1111) {
//     var _positionInArray;
//     for (var i = 0; i < (allLogs.length - 1); i++) {
//       if (allLogs[i].logId == this.logId) {
//         _positionInArray = i;
//       }
//     }
//     allLogs.splice(_positionInArray, 1);
//   }
//   else {
//     this.x += this.speed;
//   }
// };
// Log.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
// Enemies our player must avoid
var Enemy = function(rownum) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  switch(rownum) { /* I used a switch statement so that Enemies can't be accidently created on the wrong row */
    case 2: // actual row is 2 (1st row of stone)
    this.row = 2;
    break;
    case 3: // actual row is 3 (2nd row of stone)
    this.row = 3;
    break;
    case 4: // actual row is 4 (3rd row of stone)
    this.row = 4;
    break;
    case 5: // actual row is 5 (4th row of stone)
    this.row = 5;
    break;
    case 6: // actual row is 6 (5th row of stone)
    this.row = 6;
    break;
    default:
    // Should not reach following line (ever)
    console.log("error in creating enemy: row not valid");
  }
  this.x = 0;
  this.y = (((this.row * 83) - 101) + 70);
  this.speed = (Math.ceil(Math.random() * 8)); // Generate a random speed for the enemy
  this.magic = false;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  // this.sprite = 'images/enemy-bug.png';
  // var gen = (Math.ceil(Math.random() * 15));
  // if (gen == 1) {
  //   this.magic = true;
  //   this.sprite = 'images/enemy-bug-magic.png';
  // }
  // else {
    this.sprite = 'images/enemy-bug.png';
  // }
  this.enemyId = enemyIdTracker;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // Check Collision w/ player
  if (((this.x) <= (player.x + 35)) && ((this.x + 99) >= (player.x + 67))) { // horizontal hb:32 and offset:35
    if (((this.y) <= (player.y + 60)) && ((this.y + 77) >= (player.y + 80))) { // vertical hb:20 and offset:60
      player.reset("death");
    }
  }
  //update enemy position
  if (this.x > 1111) {
    var _positionInArray;
    for (var i = 0; i < (allEnemies.length - 1); i++) {
      if (allEnemies[i].enemyId == this.enemyId) {
        _positionInArray = i;
      }
    }
    allEnemies.splice(_positionInArray, 1);
  }
  else {
    if (this.magic === false) {
      this.x += this.speed;
    }
    else {
      if (this.magic === true) {
        if (this.speed <= 70) {
          this.x += this.speed;
          this.speed = this.speed + 1;
        }
        else {
          this.x += this.speed;
        }
      }
    }
  }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // ctx.beginPath();
  // ctx.rect(this.x, this.y, 101, 77);
  // ctx.fillStyle = "White";
  // ctx.fill();
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 505;
  this.y = 547;
  this.sprite = 'images/char-boy.png';
  this.moveLeft = false;
  this.moveUp = false;
  this.moveRight = false;
  this.moveDown = false;
  this.stopLeft = false;
  this.stopUp = false;
  this.stopRight = false;
  this.stopDown = false;
};
Player.prototype.update = function() { // Player moves 10 pixels per update
  if (this.moveLeft === true) {
    if (this.stopLeft === false) { // Player has not released key
      if ((this.x > 0)||(this.x < 1010)) { // Checking to see if against border
        // move character in appropriate direction (LEFT)
        if (this.x > 5) {
          this.x -= 5;
        }
        else {
          this.x = 0;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveLeft = false;
      this.stopLeft = false;
    }
  }
  if (this.moveUp === true) {
    if (this.stopUp === false) { // Player has not released key
      if ((this.y > 0)||(this.y < 586)) { // Checking to see if against border
        // move character in appropriate direction (UP)
        if (this.y > 2) {
          this.y -= 2;
        }
        else {
          this.y = 0;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveUp = false;
      this.stopUp = false;
    }
  }
  if (this.moveRight === true) {
    if (this.stopRight === false) { // Player has not released key
      if ((this.x > 0)||(this.x < 1010)) { // Checking to see if against border
        // move character in appropriate direction (RIGHT)
        if (this.x < 1005) {
          this.x += 5;
        }
        else {
          this.x = 1010;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveRight = false;
      this.stopRight = false;
    }
  }
  if (this.moveDown === true) {
    if (this.stopDown === false) { // Player has not released key
      if ((this.y > 0)||(this.y < 586)) { // Checking to see if against border
        // move character in appropriate direction (RIGHT)
        if (this.y < 584) {
          this.y += 2;
        }
        else {
          this.y = 586;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveDown = false;
      this.stopDown = false;
    }
  }
  // When crossing river, check for log/tile
  // if ((70 <= this.y) && (224 >= this.y)) {
  //   // player is over river check their x and y to ensure they are on a safe tile
  //   var safe = false;
  //   var current_tiles = [];
  //   var res = [];
  //   if ((70 <= (this.y + 60)) && (154 >= (this.y))) {
  //     for (var i = 0; i <= 10; i++) {
  //       if (((Number(i) * 83) <= (Number(this.x) + 32)) && (((Number(i) + 1) * 83) >= (Number(this.x) + 67))) {
  //         var item1 = ("1:" + (i).toString());
  //         if (current_tiles.length === 0) {
  //           current_tiles[0] = item1;
  //         }
  //         else {
  //           current_tiles.push(item1);
  //         }
  //       }
  //     }
  //   }
  //   if ((154 <= (this.y + 60)) && (224 >= (this.y))) {
  //     for (var i2 = 0; i2 <= 10; i2++) {
  //       if (((Number(i2) * 83) <= (Number(this.x) + 32)) && (((Number(i2) + 1) * 83) >= (Number(this.x) + 67))) {
  //         var item2 = ("2:" + (i2).toString());
  //         if (current_tiles.length === 0) {
  //           current_tiles[0] = item2;
  //         }
  //         else {
  //           current_tiles.push(item2);
  //         }
  //       }
  //     }
  //   }
  //   if ((current_tiles.length !== 0)) {
  //     console.log(current_tiles);
  //     for (var i3 = 0; i3 < current_tiles.length; i3++) {
  //       if (res === [] || res.length === 0) {
  //         res[0] = determineIfSafe(current_tiles[i3]);
  //       }
  //       else {
  //         res.push(determineIfSafe(current_tiles[i3]));
  //       }
  //     }
  //     // console.log(res);
  //     for (var i4 = 0; i4 < res.length; i4++) {
  //       if (res[i4] === "safe") {
  //         safe = true;
  //       }
  //     }
  //   }
  //   else {
  //     console.log("not a major problem, but still a problem");
  //     // should not reach here, but just in case
  //     safe = true;
  //   }
  //   if (safe === false) {
  //     this.reset("death");
  //   }
  // } // Closing if statement for determining if the player is in water
  if (this.y <= 55) {
    this.reset("complete");
  }
}; // Close Player.update function prototype
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // ctx.beginPath();
  // ctx.rect((this.x + 35), (this.y + 60), 32, 20);
  // ctx.fillStyle = "White";
  // ctx.fill();
};
Player.prototype.handleInput = function(inputKey) { //
  switch(inputKey) {
    case 'left':
    case 'A':
      this.moveLeft = true;
    break;
    case 'up':
    case 'W':
      this.moveUp = true;
    break;
    case 'right':
    case 'D':
      this.moveRight = true;
    break;
    case 'down':
    case 'S':
      this.moveDown = true;
    break;
    default:
  }
};
Player.prototype.handleUnInput = function(inputKey) { //
  switch(inputKey) {
    case 'left':
    case 'A':
      this.stopLeft = true;
    break;
    case 'up':
    case 'W':
      this.stopUp = true;
    break;
    case 'right':
    case 'D':
      this.stopRight = true;
    break;
    case 'down':
    case 'S':
      this.stopDown = true;
    break;
    default:
  }
};
Player.prototype.reset = function(input) {
  switch(input) {
    case "death":
      fails++;
      bad.innerHTML = "Fails: " + fails.toString();
    break;
    case "complete":
      successes++;
      good.innerHTML = "Successes: " + successes.toString();
    break;
    default:
      // should not reach here
  }
  this.x = 505;
  this.y = 547;
};
var fails = 0;
var successes = 0;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var allLogs = [];
var allEnemies = [];
// var logIdTracker = 0;
var enemyIdTracker = 0;
var player = new Player();
var game = new GameTick();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'A',
        87: 'W',
        83: 'S',
        68: 'D'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'A',
    87: 'W',
    83: 'S',
    68: 'D'
  };
  player.handleUnInput(allowedKeys[e.keyCode]);
});
// function determineIfSafe(row_colon_col) {
//   var rc = row_colon_col.split(":");
//   if (rc.length === 2) {
//     if (rc[0] === 1 || rc[0] === 2) {
//       var hasLog = false;
//       for (var l1 = 0; l1 <= (allLogs.length - 1); l1++) {
//         if (allLogs[l1].row == (rc[0] + 1)) {
//           if ((allLogs[l1.x] >= ((rc[1] * 101) + 30)) && (allLogs[l1].x <= (((col + 1) *  101) - 10) )) {
//             hasLog = true;
//           }
//         }
//       } // Close for loop
//       if (hasLog === true) {
//         return "safe";
//       }
//       else {
//         return "unsafe";
//       }
//     }
//   }
// }


// Smooth(er) Player movement
/*
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'A',
        87: 'W',
        83: 'S',
        68: 'D'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'A',
    87: 'W',
    83: 'S',
    68: 'D'
  };
  player.handleUnInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(inputKey) { //
  switch(inputKey) {
    case 'left':
    case 'A':
      this.moveLeft = true;
    break;
    case 'up':
    case 'W':
      this.moveUp = true;
    break;
    case 'right':
    case 'D':
      this.moveRight = true;
    break;
    case 'down':
    case 'S':
      this.moveDown = true;
    break;
    default:
  }
};
Player.prototype.handleUnInput = function(inputKey) { //
  switch(inputKey) {
    case 'left':
    case 'A':
      this.stopLeft = true;
    break;
    case 'up':
    case 'W':
      this.stopUp = true;
    break;
    case 'right':
    case 'D':
      this.stopRight = true;
    break;
    case 'down':
    case 'S':
      this.stopDown = true;
    break;
    default:
  }
};

Player.prototype.update = function() { // Player moves 10 pixels per update
  if (this.moveLeft === true) {
    if (this.stopLeft === false) { // Player has not released key
      if ((this.x > 0)||(this.x < 1010)) { // Checking to see if against border
        // move character in appropriate direction (LEFT)
        if (this.x > 5) {
          this.x -= 5;
        }
        else {
          this.x = 0;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveLeft = false;
      this.stopLeft = false;
    }
  }
  if (this.moveUp === true) {
    if (this.stopUp === false) { // Player has not released key
      if ((this.y > 0)||(this.y < 586)) { // Checking to see if against border
        // move character in appropriate direction (UP)
        if (this.y > 2) {
          this.y -= 2;
        }
        else {
          this.y = 0;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveUp = false;
      this.stopUp = false;
    }
  }
  if (this.moveRight === true) {
    if (this.stopRight === false) { // Player has not released key
      if ((this.x > 0)||(this.x < 1010)) { // Checking to see if against border
        // move character in appropriate direction (RIGHT)
        if (this.x < 1005) {
          this.x += 5;
        }
        else {
          this.x = 1010;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveRight = false;
      this.stopRight = false;
    }
  }
  if (this.moveDown === true) {
    if (this.stopDown === false) { // Player has not released key
      if ((this.y > 0)||(this.y < 586)) { // Checking to see if against border
        // move character in appropriate direction (RIGHT)
        if (this.y < 584) {
          this.y += 2;
        }
        else {
          this.y = 586;
        }
      }
    }
    else { // Player has released key to move in direction
      this.moveDown = false;
      this.stopDown = false;
    }
  }
}; // Close Player.update function prototype




*/
