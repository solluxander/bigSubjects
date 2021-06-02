kaboom({
    global: true,
    width: 640,
    height: 480,
    //canvas: document.getElementById("game"),
    clearColor: [0, 0, 0, 1],
  });

  const MOVE_SPEED = 150;
  var upAP = false;

  //loadSound("se_tan00", "littlesongs6.mp3");
  loadRoot('https://i.imgur.com/')
  loadSprite('leftArrow', '1Xq9biB.png')
  loadSprite('rightArrow', 'yZIb8O2.png')
  loadSprite('downArrow', 'r377FIM.png')
  loadSprite('upArrow', 'UkV0we0.png')
  loadSprite('left-wall', 'rfDoaa1.png')
  loadSprite('right-wall', 'SmHhgUn.png')
  loadSprite('lanterns', 'wiSiY09.png')
  /*loadSprite("leftArrow", "border.png");
  loadSprite("rightArrow", "zelda.png");
  loadSprite("downArrow", "zelda.png");
  loadSprite("upArrow", "zelda.png");
  loadSprite("left-wall", "zelda.png");
  loadSprite("right-wall", "zelda.png");*/
  
/*  scene("intro", () => {
    layers(["bg", "obj", "ui",], "obj");
  
    const zelda = add([
      sprite("left"),
      pos(10, 10),
    ]);


  
  });*/

  scene("ddr", () => { 
    layers(["bg", "obj", "ui",], "obj");
    var notes = [1, 1,
                 0, 1, 2, 3, 2, 1, 0,
                 0, 1, 2, 3, 2, 1, 0, 1,
                 0, 1, 2, 3];
    var rests = [0.3, 2,
                 9.1, 9.2, 9.4, 9.6, 9.8, 10, 10.3];

    const gameLevel = addLevel([
      '            ',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      'a          b',
      ], {
        width: 54,
        height: 48,
        'a': [sprite('left-wall'),],
        'b': [sprite("right-wall")],
        //'y': [sprite("lanterns"), layer('ui')],
        //'z': [sprite("leftArrow"), "arrow"],
        //'x': [sprite("upArrow"), "arrow"],
        //'c': [sprite("downArrow"), "arrow"],
        //'v': [sprite("rightArrow"), "arrow"],
        //'z': [sprite("leftArrow"), "beat"],
        //'$': [sprite("upArrow"), "beat"],
        //'c': [sprite("downArrow"), "beat"],
        //'v': [sprite("rightArrow"), "beat"],
    })

    const scoreLabel = add([
      text('0', 32),
      pos(10, 10),
      layer('ui'),
      {
        score: 0,
      },
    ]);
    const torch = add([
      sprite("lanterns"), 
      layer('ui'),
      pos(594, 0),
    ])

    var lvlSong = document.getElementById("music");
    function playAudio() {
      lvlSong.play();
    }
    function pauseAudio() {
      lvlSong.pause();
    } 

    const leftLink = add([
      sprite("leftArrow"), 
      pos(216, 384),
      "arrow",
    ]);
    const upLink = add([
      sprite("upArrow"), 
      pos(270, 384),
      //area(vec2(2), vec2(0.5)),
      "arrow",
    ]);
    const downLink = add([
      sprite("downArrow"), 
      pos(324, 384),
      "arrow",
    ]);
    const rightLink = add([
      sprite("rightArrow"), 
      pos(378, 384),
      "arrow",
    ]);
  /*  action("torch", (p) => {
      if (p.isClicked())
        playAudio();
    })*/
  //torch.onclick = playAudio();

  keyPress("space", () => {
    playAudio();
    for (let i = 0; i < notes.length; i++) {
      wait(rests[i], () => {
        switch(notes[i]) {
          case 0:
            add([
              sprite("leftArrow"),
              pos(216, 1),
              "beat"]);
            break;
          case 1:
            add([
              sprite("upArrow"),
              pos(270, 1),
              "beat"]);
            break;
          case 2:
            add([
              sprite("downArrow"), 
              pos(324, 1),
              "beat"]);
            break;
          case 3:
            add([
              sprite("rightArrow"), 
              pos(378, 1),
              "beat"]);
            break;
        }
      })
    }
  })


    /*const upBeat = add([
      sprite("upArrow"), 
      pos(270, 1),
    ]);*/

    action("beat", (a) => {
      a.move(0, MOVE_SPEED)
      if (a.pos.y > 480) {
        destroy(a);
        const neg = add([
          text("BOGUS!", 40),
          pos(250, 220),
          layer('bg'),
        ])
        camShake(12);
        wait(0.25, () => {
          destroy(neg);
        })
      }
    });
    keyDown("up", () => {
      upAP = true;
    });
    keyRelease("up", () => {
      upAP = false;
    });
if (upAP) {
      upLink.overlaps("beat", (a) => {
        destroy(a);
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
      });
    }
});
  
  start("ddr");