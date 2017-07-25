
var five = require("johnny-five");

// The Johnny Five REPL is on by default
// To deactivate it just add change to
// var board = new five.Board({repl: false});
var board = new five.Board();

var gamepad = require("gamepad");

board.on("ready", function () {

    // Load the Config for the Arduino Motor Shield
    var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

    // Configure the driving motors
    var motor1 = new five.Motor(configs.M3);
    var motor2 = new five.Motor(configs.M4);

    // If REPL is inactivate, comment this out, else error!
    // This injects the motor objects into the REPL, so they can be used like: m1.stop()
    this.repl.inject({
        m1: motor1,
        m2: motor2
    });

    // Some example event handlers for the driving motors

    
    gamepad.init();

    for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
      console.log(i, gamepad.deviceAtIndex());
    }

    setInterval(gamepad.processEvents, 16);
    setInterval(gamepad.detectDevices, 500);

    gamepad.on("move", function (id, axis, value) {
      console.log("move", {
        id: id,
        axis: axis,
        value: value,
      });

      if ( axis == 5 ) {
        if ( value == -1 ) {
          motor2.forward(255);
        }

        if ( value == 1 ) {
          motor2.reverse(255);
        }

        if ( value == 0 ) {
          motor2.stop();
        }
      }
    });

    gamepad.on("up", function (id, num) {
      console.log("up", {
        id: id,
        num: num,
      });

      if ( num == 3 ) {
        motor1.stop();
      }

      if ( num == 1 ) {
        motor1.stop();
      }

    });

    gamepad.on("down", function (id, num) {
      console.log("down", {
        id: id,
        num: num,
      });

      if ( num == 3 ) {
        motor1.forward(255);
      }

      if ( num == 1 ) {
        motor1.reverse(255);
      }
    });



    /*
    motor1.on("start", function () {
        console.log("Start M1", Date.now());
    });

    motor2.on("start", function () {
        console.log("Start M2", Date.now());
    });

    motor1.on("stop", function () {
        console.log("Stop M1", Date.now());
    });

    motor2.on("stop", function () {
        console.log("Stop M2", Date.now());
    });

    motor1.on("forward", function () {
        console.log("Forward M1", Date.now());

        board.wait(1000, function () {
            motor1.reverse(150);
        });
    });

    motor1.on("reverse", function () {
        console.log("Reverse M1", Date.now());

        board.wait(1000, function () {
            motor1.stop();
        });
    });

    motor2.on("forward", function () {
        console.log("Forward M2", Date.now());

        board.wait(1000, function () {
            motor2.reverse(150);
        });
    });

    motor2.on("reverse", function () {
        console.log("Reverse M2", Date.now());

        board.wait(1000, function () {
            motor2.stop();
        });
    });

    motor1.forward(150);
    motor2.forward(150);

    */
});

