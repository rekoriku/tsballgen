const SETTINGS = {
  SPEED: 5,
  AMOUNT: 10,
  MINSIZE: 30,
  MAXSIZE: 30,
  FPS: 60
}

class Canvas {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  constructor() {
    let canvas = document.querySelector('canvas') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.canvas = canvas;
    this.ctx = ctx;
  }
}

let canvasInfo = new Canvas;

let random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min as number;
let randomRGB = () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})` as string;



class Ball {
  constructor(public x: number, public y: number, public velX: number, public velY: number, public size: number, public color: string, public id: number = 0, public maxspeed: number = 1) {

  }

  draw = () => {
    canvasInfo.ctx.beginPath()
    canvasInfo.ctx.fillStyle = this.color
    canvasInfo.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    canvasInfo.ctx.fill()
  }

  update() {
    if ((this.x + this.size) >= canvasInfo.width) {
      this.velX = -random(1, this.maxspeed);//-this.velX
    }

    if ((this.x - this.size) <= 0) {
      this.velX = random(1, this.maxspeed);//-this.velX;
    }

    if ((this.y + this.size) >= canvasInfo.height) {
      this.velY = -random(1, this.maxspeed);//-this.velY;
    }

    if ((this.y - this.size) <= 0) {
      this.velY = random(1, this.maxspeed);//-this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

}



class Animaatio {
  public balls: Ball[] = [];
  public color: string;
  constructor(public fps: number = 60, public minsize: number = 0, public maxsize: number = 10, public amount: number = 1, public maxspeed: number = 1) {
    //
    //this.start()
    this.color = "rgb(100,100,100)"
    this.getBallocation()
  }

  clear() {
    canvasInfo.ctx.fillStyle = '#000';
    canvasInfo.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
  }

  //https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
  getBallocation() {
    canvasInfo.canvas.addEventListener('click', (event: any) => {
      let rect: ClientRect = canvasInfo.canvas.getBoundingClientRect()
      let x: number = (event.x - rect.left) / (rect.right - rect.left) * canvasInfo.canvas.width
      let y: number = (event.y - rect.top) / (rect.bottom - rect.top) * canvasInfo.canvas.height

      this.balls.forEach(ball => {
        if (Math.sqrt((x - ball.x) * (x - ball.x) + (y - ball.y) * (y - ball.y)) < ball.size) {
          console.log(`Ball x: ${ball.x} and Ball y: ${ball.y} Ball id: ${ball.id}`)
          //ball.size += 10
          ball.color = "rgb(0,255,0)"; //set ball color green
        }
      })
    })
  }

  start() {
    this.clear()

    while (this.balls.length < this.amount) {
      let ball = new Ball(random(0 + this.maxsize, canvasInfo.width - this.maxsize), random(0 + this.maxsize, canvasInfo.height - this.maxsize), this.maxspeed, this.maxspeed, random(this.minsize, this.maxsize), this.color, this.balls.length, this.maxspeed);
      this.balls.push(ball);
    }

    for (let i = 0, len = this.balls.length; i < len; i++) {
      let ball = this.balls[i];
      ball.draw();
      ball.update()

    }
    setTimeout(this.start.bind(this), 1000 / this.fps)
  }

}



let balls = document.getElementById('balls') as HTMLParagraphElement;
let speed = document.getElementById('speed') as HTMLParagraphElement;



let loop = new Animaatio()

loop.fps = SETTINGS.FPS
loop.minsize = SETTINGS.MINSIZE
loop.maxsize = SETTINGS.MAXSIZE
loop.amount = SETTINGS.AMOUNT
loop.maxspeed = SETTINGS.SPEED
loop.color = "rgb(100,100,100)"
loop.start()

balls.innerHTML = String("Number of balls is: " + loop.amount);
speed.innerHTML = String("Speed is : 1 - " + loop.maxspeed); 




