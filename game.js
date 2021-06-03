kaboom({
    global: true,
    width: 640,
    height: 480,
    //canvas: document.getElementById("game"),
    clearColor: [0, 0, 0, 1],
  });

  const MOVE_SPEED = 150;

  loadRoot('https://i.imgur.com/')
  loadSprite('leftArrow', '1Xq9biB.png')
  loadSprite('rightArrow', 'yZIb8O2.png')
  loadSprite('downArrow', 'r377FIM.png')
  loadSprite('upArrow', 'UkV0we0.png')
  loadSprite('left-wall', 'rfDoaa1.png')
  loadSprite('right-wall', 'SmHhgUn.png')
  loadSprite('lanterns', 'wiSiY09.png')

  scene("ddr", () => { 
    layers(["bg", "obj", "ui",], "obj");
    var notes = [1, 1, 0, 3, 0, 3, 
                 0, 1, 2, 3, 2, 1, 0, 1, 
                 0, 1, 2, 3, 2, 1, 0, 1,
                 2, 1, 2, 1,
                 3, 2, 1, 0, 1, 2, 3, 2,
                 0, 1, 2, 3,
                 1, 2, 1, 2, 3, 0, 1, 2, 1, 2, 1, 2,
                 0, 3, 0, 3,
                 0, 1, 2, 3, 2, 1, 0, 1,
                 0, 3, 0, 3, 0, 3,
                 0, 3, 0, 3, 0, 3,
                 0, 3, 0, 3, 0, 3,
                 0, 3, 0, 3, 0, 3,
                 5];
    var rests = [0.23, 1.94, 3.55, 4.5, 5.3, 6.1, 
                 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.5,
                 12.45, 12.6, 12.8, 13, 13.2, 13.4, 13.6, 13.9,
                 15.5, 16, 17.5, 17.8,
                 19.6, 19.8, 20, 20.2, 20.4, 20.6, 20.8, 21,
                 22.75, 23, 23.2, 23.45,
                 24.4, 25.3, 26.25, 26.95, 28, 28.9, 29.9, 29.9, 30.2, 30.2, 30.5, 30.5,
                 31.65, 32.45, 33.4, 33.9,
                 37, 37.2, 37.4, 37.6, 37.8, 38, 38.2, 38.45,
                 41.95, 42.75, 43.75, 44.5, 45.4, 46.2,
                 47.2, 47.2, 47.5, 47.5, 47.8, 47.8,
                 52.5, 53.3, 54.25, 55, 56, 56.7,
                 57.75, 57.75, 58.05, 58.05, 58.3, 58.3,
                 65];

    const gameLevel = addLevel([
      '           y',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a   zxcv   b',
      'a          b',
      ], {
        width: 54,
        height: 48,
        'a': [sprite('left-wall')],
        'b': [sprite("right-wall")],
        'y': [sprite("lanterns"), layer('ui')],
        'z': [sprite("leftArrow")],
        'x': [sprite("upArrow")],
        'c': [sprite("downArrow")],
        'v': [sprite("rightArrow")],
    })

    const scoreLabel = add([
      text('0', 32),
      pos(10, 10),
      layer('ui'),
      {
        score: 0,
      },
    ]);
    const intro = add([
      text("press spacebar\n   to start", 32),
      pos(100, 120),
      layer('ui'),
    ]);
    /*const torch = add([
      sprite("lanterns"), 
      layer('ui'),
      pos(594, 0),
    ])*/

    var lvlSong = document.getElementById("music");
    function playAudio() {
      lvlSong.play();
    }
    function pauseAudio() {
      lvlSong.pause();
    } 
    function nice() {
      scoreLabel.score++;
      scoreLabel.text = scoreLabel.score;
      const pep = add([
        text("NICE", 40),
        pos(250, 220),
        layer('bg'),
      ])
      wait(0.25, () => {
        destroy(pep);
      })
    }

  keyPress("space", () => {
    destroy(intro);
    playAudio();
    for (let i = 0; i < notes.length; i++) {
      wait(rests[i], () => {
        switch(notes[i]) {
          case 0:
            add([
              sprite("leftArrow"),
              pos(216, 1),
              color(rgb(0.564705882, 0.752941176, 0.97254902)),
              {tempo: true,},
              "beat", 
              "leftbeat"]);
            break;
          case 1:
            add([
              sprite("upArrow"),
              pos(270, 1),
              color(rgb(0.97254902, 0.97254902, 0.53)),
              {tempo: true,},
              "beat", 
              "upbeat"]);
            break;
          case 2:
            add([
              sprite("downArrow"), 
              pos(324, 1),
              color(rgb(0.596078431, 0.470588235, 0.62745098)),
              {tempo: true,},
              "beat", 
              "downbeat"]);
            break;
          case 3:
            add([
              sprite("rightArrow"), 
              pos(378, 1),
              color(rgb(1, 0.71372549, 0.756862745)),
              {tempo: true,},
              "beat", 
              "rightbeat"]);
            break;
          case 5:
            go("gameover", scoreLabel.score);
            break;
        }
      })
    }
  })

    action("beat", (a) => {
      a.move(0, MOVE_SPEED)
      if (a.pos.y > 480) {
        destroy(a);
        const neg = add([
          text("BOGUS!", 40),
          pos(250, 220),
          layer('bg'),
        ])
        //camShake(12);
        wait(0.25, () => {
          destroy(neg);
        })
      }
    });

 
  action("leftbeat", (a) => {
    keyPress("left", () => {
      if (a.pos.y < 440 && a.pos.y > 340 && a.tempo == true) {
        a.tempo = false;
        destroy(a);
        nice();
        }
    })
  })    
  action("upbeat", (a) => {
    keyPress("up", () => {
      if (a.pos.y < 440 && a.pos.y > 340 && a.tempo == true) {
        a.tempo = false;
        destroy(a);
        nice();
        }
    })
  })    
  action("downbeat", (a) => {
    keyPress("down", () => {
      if (a.pos.y < 440 && a.pos.y > 340 && a.tempo == true) {
        a.tempo = false;
        destroy(a);
        nice();
        }
    })
  })    
  action("rightbeat", (a) => {
    keyPress("right", () => {
      if (a.pos.y < 440 && a.pos.y > 340 && a.tempo == true) {
        a.tempo = false;
        destroy(a);
        nice();
        }
    })
  })  

});

scene("gameover", (score) => {
  add([
      text("Score: " + score + "/86", 32),
      pos(130, 200),
  ]);
});
  
  start("ddr");