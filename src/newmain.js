"use strict";
const SETTINGS = {
    SPEED: 5,
    AMOUNT: 10,
    MINSIZE: 30,
    MAXSIZE: 30,
    FPS: 60
};
class Canvas {
    constructor() {
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
        this.canvas = canvas;
        this.ctx = ctx;
    }
}
let canvasInfo = new Canvas;
let random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let randomRGB = () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
class Ball {
    constructor(x, y, velX, velY, size, color, id = 0, maxspeed = 1) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
        this.color = color;
        this.id = id;
        this.maxspeed = maxspeed;
        this.draw = () => {
            canvasInfo.ctx.beginPath();
            canvasInfo.ctx.fillStyle = this.color;
            canvasInfo.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            canvasInfo.ctx.fill();
        };
    }
    update() {
        if ((this.x + this.size) >= canvasInfo.width) {
            this.velX = -random(1, this.maxspeed); //-this.velX
        }
        if ((this.x - this.size) <= 0) {
            this.velX = random(1, this.maxspeed); //-this.velX;
        }
        if ((this.y + this.size) >= canvasInfo.height) {
            this.velY = -random(1, this.maxspeed); //-this.velY;
        }
        if ((this.y - this.size) <= 0) {
            this.velY = random(1, this.maxspeed); //-this.velY;
        }
        this.x += this.velX;
        this.y += this.velY;
    }
}
class Animaatio {
    constructor(fps = 60, minsize = 0, maxsize = 10, amount = 1, maxspeed = 1) {
        this.fps = fps;
        this.minsize = minsize;
        this.maxsize = maxsize;
        this.amount = amount;
        this.maxspeed = maxspeed;
        this.balls = [];
        //
        //this.start()
        this.color = "rgb(100,100,100)";
        this.getBallocation();
    }
    clear() {
        canvasInfo.ctx.fillStyle = '#000';
        canvasInfo.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
    }
    //https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
    getBallocation() {
        canvasInfo.canvas.addEventListener('click', (event) => {
            let rect = canvasInfo.canvas.getBoundingClientRect();
            let x = (event.x - rect.left) / (rect.right - rect.left) * canvasInfo.canvas.width;
            let y = (event.y - rect.top) / (rect.bottom - rect.top) * canvasInfo.canvas.height;
            this.balls.forEach(ball => {
                if (Math.sqrt((x - ball.x) * (x - ball.x) + (y - ball.y) * (y - ball.y)) < ball.size) {
                    console.log(`Ball x: ${ball.x} and Ball y: ${ball.y} Ball id: ${ball.id}`);
                    //ball.size += 10
                    ball.color = "rgb(0,255,0)"; //set ball color green
                }
            });
        });
    }
    start() {
        this.clear();
        while (this.balls.length < this.amount) {
            let ball = new Ball(random(0 + this.maxsize, canvasInfo.width - this.maxsize), random(0 + this.maxsize, canvasInfo.height - this.maxsize), this.maxspeed, this.maxspeed, random(this.minsize, this.maxsize), this.color, this.balls.length, this.maxspeed);
            this.balls.push(ball);
        }
        for (let i = 0, len = this.balls.length; i < len; i++) {
            let ball = this.balls[i];
            ball.draw();
            ball.update();
        }
        setTimeout(this.start.bind(this), 1000 / this.fps);
    }
}
let balls = document.getElementById('balls');
let speed = document.getElementById('speed');
let loop = new Animaatio();
loop.fps = SETTINGS.FPS;
loop.minsize = SETTINGS.MINSIZE;
loop.maxsize = SETTINGS.MAXSIZE;
loop.amount = SETTINGS.AMOUNT;
loop.maxspeed = SETTINGS.SPEED;
loop.color = "rgb(100,100,100)";
loop.start();
balls.innerHTML = String("Number of balls is: " + loop.amount);
speed.innerHTML = String("Speed is : 1 - " + loop.maxspeed);
