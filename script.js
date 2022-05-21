class Ship { 
    constructor(posX, posY) {
        
        this.posX = posX;
        this.posY = posY;
        this.speed = 5;
        this.width = 50;
        this.height = 50;

        document.addEventListener("keydown", this.buttonPush);
        document.addEventListener("keyup", this.buttonDrop);
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

            // ctx.fillStyle='yellow';
            // ctx.beginPath();
            // ctx.moveTo(element.posX+20,element.posY-30);
            // ctx.lineTo(element.posX+50,element.posY+50);
            // ctx.lineTo(element.posX-30,element.posY);
            // ctx.lineTo(element.posX+70,element.posY);
            // ctx.lineTo(element.posX-20,element.posY+50);
            // ctx.fill();

            ctx.fillStyle='red';
            ctx.beginPath();
            ctx.moveTo(element.posX+20,element.posY-30);
            ctx.lineTo(element.posX+50,element.posY+50);
            ctx.lineTo(element.posX-30,element.posY);
            ctx.lineTo(element.posX+70,element.posY);
            ctx.lineTo(element.posX-20,element.posY+50);
            ctx.fill();

            
            

            if (bullet.bulletPosX >= element.posX && bullet.bulletPosX <= element.posX + 40 && bullet.bulletPosY >= element.posY - 30 && bullet.bulletPosY <= element.posY + 30) {
                
                
                this.arrAliens.splice(index,1);
                bullet.bulletPosX = undefined;
                bullet.bulletPosY = undefined;
                bullet.speed = 0;
                bullet.isFire = false;
                countScore += 10;
            }
            if (element.posX >= ship.posX - element.width + 1 && element.posX <= ship.posX + ship.width - 5 && element.posY >= ship.posY - element.height + 10 && element.posY <= ship.posY + ship.height) {
                restart();
                
            }
            if (element.posY >= canvas.height - element.width + 10) {
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
                this.arrCoins.splice(index,1);
                countScore += 10;
            }
            if (element.posY >= canvas.height - element.width) {
                this.arrCoins.splice(index,1);
            }
        });
    }
}

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let coin = new Coin();
let ship = new Ship(canvas.width/2 - 15,canvas.height - 50);
let bullet = new Bullet();
let alien = new Alien();

let countTick = 0;
let countScore = 0;
let countLevel = 0;
let countRestart = 0;

let flagPause = false;
let flagTheme = false;
let flagSound = true;

let scoreText = document.querySelector('.score-number');
let levelText = document.querySelector('.level-number');
let scoreName = document.querySelector('.score-name');
let levelName = document.querySelector('.level-name');
let github = document.querySelector('.github');

let buttonPause = document.querySelector('.button-pause');
let buttomTheme = document.querySelector('.button-theme');
let buttomSound = document.querySelector('.button-sound');
let buttonLang = document.querySelector('.button-lang');
let buttonRules = document.querySelector('.button-rules');
let buttonRecords = document.querySelector('.button-records');

buttonPause.addEventListener('click', switchPause);
buttomTheme.addEventListener('click', switchTheme);
buttomSound.addEventListener('click', switchMute);
buttonLang.addEventListener('click', switchLang);
buttonRules.addEventListener('click', showRules);
buttonRecords.addEventListener('click', showRecords);

function switchPause() {
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
    buttomSound.classList.toggle('button-sound-tgl');
}

function switchLang() {

}

function showRules() {

}

function showRecords() {

}

function restart() {
    ctx.fillStyle='white';
    ctx.font='bold 40px Arial';
    ctx.fillText('GAME OVER',130,260);
    pause();
    countRestart++;
    console.log(countRestart)
    if (countRestart >= 120) {
        
        console.log('Сработка')
        cancelPause();
        coin.arrCoins.length = 0;
        alien.arrAliens.length = 0;
        countTick = 0;
        countScore = 0;
        countLevel = 0;
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

function tick() {
    countTick++;
    scoreText.innerHTML = countScore;
    levelText.innerHTML = countLevel;
    
   

    ctx.fillStyle = "darkblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    reverseCountText();

    

    coin.render(ctx);

    if (flagPause === false) {
        if (countTick%180 === 0) {
            coin.createNewCoin();
        }
        if (countTick%120 === 0) {
            alien.createNewAlien();
        }
    }
    bullet.render(ctx);
    ship.render(ctx);
    bullet.controlMove();
    alien.render(ctx);
    
    

    requestAnimationFrame(tick);
  }

requestAnimationFrame(tick);