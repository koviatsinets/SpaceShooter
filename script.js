class Ship { 
    constructor(posX, posY) {
        
        this.posX = posX;
        this.posY = posY;
        this.speed = 5;
        this.width = 30;
        this.height = 30;

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

        if (this.posX < 9) {
            this.posX = 10;
        }
        if (this.posX > canvas.width - this.width - 9) {
            this.posX = canvas.width - this.width - 10;
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
        this.speed = 0
    }

    render(ctx) {
        this.move();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
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
        this.width = 30;
        this.height = 30;
        this.speed = 1;
    }

    createNewAlien() {
        let ali = new Alien(Math.floor((Math.random()*450)) + 10, 0);
        this.arrAliens.push(ali);
    }

    stop() {
        this.speed = 0
    }

    render(ctx) {
        this.arrAliens.forEach((element, index) => {
            ctx.fillStyle = "green";
            element.posY += this.speed;
            ctx.fillRect(element.posX, element.posY, element.width, element.height);
            if (bullet.bulletPosX >= element.posX && bullet.bulletPosX <= element.posX + 30 && bullet.bulletPosY >= element.posY - 30 && bullet.bulletPosY <= element.posY + 30) {
                this.arrAliens.splice(index,1);
                bullet.bulletPosX = undefined;
                bullet.bulletPosY = undefined;
                bullet.speed = 0;
                bullet.isFire = false;
                countScore += 10;
            }
            if (element.posX >= ship.posX - element.width + 1 && element.posX <= ship.posX + ship.width && element.posY >= ship.posY - element.width && element.posY <= ship.posY + ship.width) {
                gameOver();
               
                
            }
            if (element.posY >= canvas.height - element.width) {
                gameOver();
               
                
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
        this.speed = 0
    }

    render(ctx) {
        this.arrCoins.forEach((element, index) => {
            ctx.fillStyle = "yellow";
            element.posY += this.speed;
            ctx.fillRect(element.posX, element.posY, element.width, element.height);
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

function gameOver() {
    console.log('Score: ' + countScore);
    flagGameOver = true;
    bullet.isFire = true;
    ship.stop()
    coin.stop();
    alien.stop();
    bullet.stop();
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

let flagGameOver = false;


function tick() {
    countTick++;
    ctx.fillStyle = "darkblue"
    // if (countTick <= 600) {
    //     ctx.fillStyle = "darkblue";
    // } else if (countTick > 600) {
    //     ctx.fillStyle = "black";
    // }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    coin.render(ctx);

    if (flagGameOver === false) {
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