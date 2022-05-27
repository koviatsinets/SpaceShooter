let mobileButtons = document.querySelectorAll('.mobile-btns')
console.log(mobileButtons)
class Ship { 
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.speed = 5;
        this.width = 50;
        this.height = 50;

        document.addEventListener("keydown", this.buttonPush);
        document.addEventListener("keyup", this.buttonDrop);

        document.addEventListener('touchstart', this.mobileButtonsMove);
        document.addEventListener('touchend', this.mobileButtonsStop);

    }

    mobileButtonsMove = (EO) => {
        if (EO.target.childNodes[0].innerText === 'arrow_back') {
            this.buttonLeft = true;
        }
        if (EO.target.childNodes[0].innerText === 'arrow_forward') {
            this.buttonRight = true;
        }
        if (EO.target.childNodes[0].innerText === 'arrow_upward') {
            this.buttonUp = true;
        }
        if (EO.target.childNodes[0].innerText === 'arrow_downward') {
            this.buttonDown = true;
        }
    }

    mobileButtonsStop = (EO) => {
        if (EO.target.childNodes[0].innerText === 'arrow_back') {
            this.buttonLeft = false;
        }
        if (EO.target.childNodes[0].innerText === 'arrow_forward') {
            this.buttonRight = false;
        }
        if (EO.target.childNodes[0].innerText === 'arrow_upward') {
            this.buttonUp = false;
        }
        if (EO.target.childNodes[0].innerText === 'arrow_downward') {
            this.buttonDown = false;
        }
    }

    buttonPush = (EO) => {
        if (EO.code === 'ArrowLeft') {
            this.buttonLeft = true;
        }
        if (EO.code === 'ArrowRight') {
            this.buttonRight = true;
        }
        if (EO.code === 'ArrowUp') {
            this.buttonUp = true;
        }
        if (EO.code === 'ArrowDown') {
            this.buttonDown = true;
        }
        if (EO.code === 'Space') {
            this.shot();
        }
    }

    buttonDrop = (EO) => {
        if (EO.code === 'ArrowLeft') {
            this.buttonLeft = false;
        }
        if (EO.code === 'ArrowRight') {
            this.buttonRight = false;
        }
        if (EO.code === 'ArrowUp') {
            this.buttonUp = false;
        }
        if (EO.code === 'ArrowDown') {
            this.buttonDown = false;
        }
        if (EO.code === 'Space') {
            this.buttonSpace = false;
        }
    }

    move() {
        if (this.buttonLeft) {
            this.posX += -this.speed;
        }
        if (this.buttonRight) {
            this.posX += this.speed;
        }
        if (this.buttonDown) {
            this.posY += this.speed;
        }
        if (this.buttonUp) {
            this.posY += -this.speed;
        }

        if (this.posX < 4) {
            this.posX = 5;
        }
        if (this.posX > canvas.width - this.width - 4) {
            this.posX = canvas.width - this.width - 5;
        }
        if (this.posY < 9) {
            this.posY = 10;
        }
        if (this.posY > canvas.height - this.height - 9) {
            this.posY = canvas.height - this.height - 10;
        }
    }

    shot() {
        if (bullet.isFire === false) {
            bullet.move();
            playShoot();
        }
    }

    stop() {
        this.speed = 0;
    }

    play() {
        this.speed = 5;
    }


    render(ctx) {
        this.move();
        let img = new Image();
            img.src = './assets/img/ship.png';
            ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
    }
    
}
class Bullet {
    constructor(bulletStartPosX,bulletStartPosY) {
        this.bulletPosX = bulletStartPosX;
        this.bulletPosY = bulletStartPosY;
        this.speed = 0;
        this.width = 4;
        this.height = 12;
        this.isFire = false
    }

    move() {
            this.bulletPosX = ship.posX + ship.width/2 - 2;
            this.bulletPosY = ship.posY - 6;
            this.speed = 8;
            this.isFire = true;
    }

    stop() {
        this.speed = 0;
    }

    play() {
        this.speed = 8;
    }

    render(ctx) {
        ctx.fillStyle = "red";
        this.bulletPosY += -this.speed;
        ctx.fillRect(this.bulletPosX, this.bulletPosY, this.width, this.height);
    }

    controlMove() {
        if (this.bulletPosY < 0) {
            this.bulletPosX = undefined;
            this.bulletPosY = undefined;
            this.speed = 0;
            this.isFire = false;
        }
    }
}

class Alien {
    arrAliens = [];
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.width = 40;
        this.height = 30;
        this.speed = 1;
    }

    createNewAlien() {
        let ali = new Alien(Math.floor((Math.random()*440)) + 10, 0);
        this.arrAliens.push(ali);
    }

    stop() {
        this.speed = 0;
    }

    play() {
        this.speed = 1;
    }


    render(ctx) {
        this.arrAliens.forEach((element, index) => {
            let img = new Image();
            img.src = './assets/img/ufo.png';
            element.posY += this.speed;
            ctx.drawImage(img, element.posX, element.posY, element.width, element.height); //рисуем картинку в канвас

            if (bullet.bulletPosX >= element.posX && bullet.bulletPosX <= element.posX + 40 && bullet.bulletPosY >= element.posY - 30 && bullet.bulletPosY <= element.posY + 30) {   
                this.arrAliens.splice(index,1);
                playBang();
                bullet.bulletPosX = undefined;
                bullet.bulletPosY = undefined;
                bullet.speed = 0;
                bullet.isFire = false;
                countScore += 10;
            }
            if (element.posX >= ship.posX - element.width + 1 && element.posX <= ship.posX + ship.width - 5 && element.posY >= ship.posY - element.height + 10 && element.posY <= ship.posY + ship.height) {
                
                console.log(element.speed)
                restart();

            }
            if (element.posY >= canvas.height - element.width) {

                console.log(element.speed)
                restart();
            }
        });
    }

}

class Coin {
    arrCoins = [];
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.width = 10;
        this.height = 10;
        this.speed = 1;
    }

    createNewCoin() {
        let coin = new Coin(Math.floor((Math.random()*480)) + 10, 0);
        this.arrCoins.push(coin);
    }

    stop() {
        this.speed = 0;
    }

    play() {
        this.speed = 1;
    }

    render(ctx) {
        this.arrCoins.forEach((element, index) => {
            element.posY += this.speed;
            ctx.fillStyle='yellow';
            ctx.beginPath();
            ctx.arc(element.posX+5, element.posY+5, 5, 0, Math.PI*2, false);
            ctx.fill();
            if (element.posX >= ship.posX - element.width + 1 && element.posX <= ship.posX + ship.width && element.posY >= ship.posY - element.width && element.posY <= ship.posY + ship.width) {
                element.speed = 0;                
                this.arrCoins.splice(index,1);
                playCoins();
                countScore += 20;
            }
            if (element.posY >= canvas.height - element.width) {
                element.speed = 0;  
                this.arrCoins.splice(index,1);
            }
        });
    }
}

window.onbeforeunload=befUnload;

  function befUnload(EO) {
    EO=EO||window.event;
      EO.returnValue='А у вас есть несохранённые изменения!';
  };

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let coin = new Coin();
let ship = new Ship(canvas.width/2 - 15,canvas.height - 50);
let bullet = new Bullet();
let alien = new Alien();
let audioMusic = new Audio();
let audioBang = new Audio();
let audioShoot = new Audio();
let audioCoins = new Audio();
// let audioGameover = new Audio();
let audioStartGame = new Audio();
let audioButton = new Audio();

let countTick = 0;
let countScore = 0;
let countRestart = 0;
let levelSpeed = 1;

let flagPause = false;
let flagTheme = false;
let flagSound = true;

let scoreText = document.querySelector('.score-number');
let levelText = document.querySelector('.level-number');
let scoreName = document.querySelector('.score-name');
let levelName = document.querySelector('.level-name');
let github = document.querySelector('.github');
let userName = document.querySelector('#user-name');
let currentUser = '';

let buttonPause = document.querySelector('.button-pause');
let buttomTheme = document.querySelector('.button-theme');
let buttomSound = document.querySelector('.button-sound');
let buttonLang = document.querySelector('.button-lang');
let buttonRules = document.querySelector('.button-rules');
let buttonRecords = document.querySelector('.button-records');
let buttonCloseRules = document.querySelector('.button-close-rules');
let buttonCloseRecods = document.querySelector('.button-close-records');
let rules = document.querySelector('.rules');
let records = document.querySelector('.records');
let buttonStart = document.querySelector('.button-start');
let helloWindow = document.querySelector('.hello-window');



// let buttonUp = document.querySelector('.button-up');
// let buttonLeft = document.querySelector('.button-left');
// let buttonRight = document.querySelector('.button-right');
// let buttonDown = document.querySelector('.button-down');
// let buttonSpace = document.querySelector('.button-space');


buttonPause.addEventListener('click', switchPause);
buttomTheme.addEventListener('click', switchTheme);
buttomSound.addEventListener('click', switchMute);
buttonLang.addEventListener('click', switchLang);
buttonRules.addEventListener('click', showRules);
buttonRecords.addEventListener('click', showRecords);
buttonCloseRecods.addEventListener('click', showRecords);
buttonCloseRules.addEventListener('click', showRules);
buttonStart.addEventListener('click', startGame);


// let userN = 'Igor';
// let userA = '312';



// var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
// var updatePassword;
// var stringName='LOKTEV_TEST_INFO';

// storeInfo();

// function storeInfo() {
//     updatePassword=Math.random();
//     $.ajax( {
//             url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
//             data : { f : 'LOCKGET', n : stringName, p : updatePassword },
//             success : lockGetReady, error : errorHandler
//         }
//     );
// }

// function lockGetReady(callresult) {
//     if ( callresult.error!=undefined )
//         alert(callresult.error);
//     else {
//         // нам всё равно, что было прочитано -
//         // всё равно перезаписываем
//         var info={
//             name : userN,
//             age : userA
//         };
//         $.ajax( {
//                 url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
//                 data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
//                 success : updateReady, error : errorHandler
//             }
//         );
//     }
// }

// function updateReady(callresult) {
//     if ( callresult.error!=undefined )
//         alert(callresult.error);
// }

// function restoreInfo() {
//     $.ajax(
//         {
//             url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
//             data : { f : 'READ', n : stringName },
//             success : readReady, error : errorHandler
//         }
//     );
// }

// function readReady(callresult) {
//     if ( callresult.error!=undefined )
//         alert(callresult.error);
//     else if ( callresult.result!="" ) {
//         var info=JSON.parse(callresult.result);
//         userN=info.name;
//        userA.value=info.age;
//     }
// }

// function errorHandler(jqXHR,statusStr,errorStr) {
//     alert(statusStr+' '+errorStr);
// }

// restoreInfo();






function playMusic() {
    audioMusic.src = './assets/audio/highway.mp3';
    audioMusic.volume = 0.4;
    audioMusic.currentTime = 0;
    audioMusic.play();
}

function playBang() {
    audioBang.src = './assets/audio/bang.wav';
    audioBang.volume = 1;
    audioBang.currentTime = 0;
    audioBang.play();
}

function playShoot() {
    audioShoot.src = './assets/audio/shoot.wav';
    audioShoot.volume = .30;
    audioShoot.currentTime = 0;
    audioShoot.play();
}

function playCoins() {
    audioCoins.src = './assets/audio/coins.wav';
    audioCoins.volume = 1;
    audioCoins.currentTime = 0;
    audioCoins.play();
}

// function playGameover() {
//     audioGameover.src = './assets/audio/gameover.wav';
//     audioGameover.volume = 1;
//     audioGameover.currentTime = 0;
//     audioGameover.play();
// }

function playStartGame() {
    audioStartGame.src = './assets/audio/startgame.wav';
    audioStartGame.volume = 1;
    audioStartGame.currentTime = -0.9;
    audioStartGame.play();
}

function playButton() {
    audioButton.src = './assets/audio/button.wav';
    audioButton.volume = 1;
    audioButton.currentTime = 0;
    audioButton.play();
}



function switchPause() {
    playButton()
    if (flagPause === false) {
        pause();
    } else if (flagPause === true) {
        cancelPause();
    }
    buttonPause.classList.toggle('button-pause-tgl');
}

function pause() {
    flagPause = true;
    bullet.isFire = true;
    ship.stop()
    coin.stop();
    alien.stop();
    bullet.stop();
}

function cancelPause() {
    flagPause = false;
    bullet.isFire = false;
    ship.play()
    coin.play();
    alien.play();
    bullet.play();
}

function switchTheme() {
    playButton()
    if (flagTheme === false) {
        document.body.style.backgroundColor = 'whitesmoke';
        flagTheme = true;
        scoreText.style.color = 'black';
        scoreText.style.fontWeight = 'bold'
        levelText.style.color = 'black';
        levelText.style.fontWeight = 'bold';
        scoreName.style.color = 'black';
        scoreName.style.fontWeight = 'bold';
        levelName.style.color = 'black';
        levelName.style.fontWeight = 'bold';
        github.style.color = 'black';
        github.style.fontWeight = 'bold';
    } else if (flagTheme === true) {
        document.body.style.backgroundColor = 'black';
        flagTheme = false;
        scoreText.style.color = 'yellow';
        scoreText.style.fontWeight = 'normal'
        levelText.style.color = 'red';
        levelText.style.fontWeight = 'normal';
        scoreName.style.color = 'white';
        scoreName.style.fontWeight = 'normal';
        levelName.style.color = 'white';
        levelName.style.fontWeight = 'normal';
        github.style.color = 'white';
        github.style.fontWeight = 'normal';
    }
    buttomTheme.classList.toggle('button-theme-tgl');
}

function switchMute() {
    playButton()
    
    if (flagSound === true) {
        audioMusic.muted = true;
        audioBang.muted = true;
        audioShoot.muted = true;
        audioCoins.muted = true;
        audioStartGame.muted = true;
        audioButton.muted = true;
        flagSound = false;
    } else if (flagSound === false) {
        audioMusic.muted = false;
        audioBang.muted = false;
        audioShoot.muted = false;
        audioCoins.muted = false;
        audioStartGame.muted = false;
        audioButton.muted = false;
        flagSound = true;
    }
    buttomSound.classList.toggle('button-sound-tgl');
}

function switchLang() {
    playButton()

}

function showRules() {
    playButton()
    if (flagPause === false) {
        pause();
    } else {
        cancelPause();
    }
    rules.classList.toggle('rules-tgl');
}

function showRecords() {
    playButton();
    if (flagPause === false) {
        pause();
    } else {
        cancelPause();
    }
    records.classList.toggle('records-tgl');
}

function restart() {
    ship.stop()
    coin.stop();
    alien.stop();
    bullet.stop();
    ctx.fillStyle='white';
    ctx.font='bold 40px Arial';
    ctx.fillText('GAME OVER',130,260);
    bullet.isFire = true;
    levelSpeed = 1;
    bullet.speed = 8;
    countRestart++;
    if (countRestart >= 110) {
        cancelPause();
        coin.arrCoins.length = 0;
        alien.arrAliens.length = 0;
        countTick = 0;
        countScore = 0;
        countRestart = 0;
        ship.posX = canvas.width/2 - 15;
        ship.posY = canvas.height - 50;
    }
}

function reverseCountText() {
    if (countTick >= 0 && countTick <= 30) {
        ctx.fillStyle='white';
        ctx.font='bold 60px Arial';
        ctx.fillText('3',230,260);
    }
    if (countTick > 30 && countTick <= 60) {
        ctx.fillStyle='white';
        ctx.font='bold 60px Arial';
        ctx.fillText('2',230,260);
    }
    if (countTick > 60 && countTick <= 90) {
        ctx.fillStyle='white';
        ctx.font='bold 60px Arial';
        ctx.fillText('1',230,260);
    }
    if (countTick > 90 && countTick <= 120) {
        ctx.fillStyle='white';
        ctx.font='bold 60px Arial';
        ctx.fillText('GO!',200,260);
    }
}

function startGame() {

    playStartGame()
    playMusic();
    helloWindow.setAttribute('style', 'display: none');
    function tick() {
        countTick++;
        scoreText.innerHTML = countScore;
        levelText.innerHTML = 1;
        
        if (countScore > 200 && countScore < 399) {
            alien.speed = 2;
            levelText.innerHTML = 2;
        }

        if (countScore > 400 && countScore < 599) {
            levelSpeed = 2;
            levelText.innerHTML = 3;
        }

        if (countScore > 600 && countScore < 799) {
            levelSpeed = 3;
            levelText.innerHTML = 4;
        }

         if (countScore > 800) {
            levelSpeed = 4;
            bullet.speed = 16;
            levelText.innerHTML = 5;
        }

        if (countScore > 1000) {
            levelSpeed = 5;
            ship.speed = 8;
            levelText.innerHTML = 6;
        }

        ctx.fillStyle = "darkblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        reverseCountText();
    
        coin.render(ctx);
    
        if (flagPause === false) {
            if (countTick%180 === 0) {
                coin.createNewCoin();
            }
            if (countTick%(120 - (levelSpeed - 1)*20) === 0) {
                alien.createNewAlien();
            }
        }
        bullet.render(ctx);
        ship.render(ctx);
        bullet.controlMove();
        alien.render(ctx);
    
        if (flagPause === true) {
            ctx.fillStyle='white';
            ctx.font='bold 40px Arial';
            ctx.fillText('PAUSE',190,260);
        }
        requestAnimationFrame(tick);
      }
    
    requestAnimationFrame(tick);
}

