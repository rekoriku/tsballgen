"use strict"
canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')
width = canvas.width = window.innerWidth
height = canvas.height = window.innerHeight

canvas.addEventListener('click', () ->
  console.log('click')
)
  

random = (min, max) ->
  num = Math.floor(Math.random() * (max - min + 1)) + min

randomRGB = () ->
  "rgb(#{random(0, 255)}, #{random(0, 255)}, #{random(0, 255)})"

SETTINGS = {
  FPS: 60
  MINSIZE: 0
  MAXSIZE: 25
  BALLS: 5
  MINSPEED: 10
  MAXSPEED: 10
}

class Ball
  constructor: (@x = 0, @y = 0, @velX = 0, @velY = 0, @size, @color) ->

  draw: () ->
    ctx.beginPath()
    ctx.fillStyle = @color
    ctx.arc(@x, @y, @size, 0, 2 * Math.PI)
    ctx.fill()

  update: () ->
    if (@x + @size) >= width
      @velX = -@velX

    if (@x - @size) <= 0
      @velX = -@velX

    if (@y + @size) >= height
      @velY = -@velY

    if (@y - @size) <= 0
      @velY = -@velY

    @x += @velX
    @y += @velY

balls = []

class Animation
  constructor: () ->
    
  log: () ->
    console.log(@balls)

  looppi: () ->
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, width, height)
    
    
    while balls.length < SETTINGS.BALLS
      size = random(10, 20)
      ball = new Ball(random(0, width),
      random(0, height),
      random(SETTINGS.MINSPEED, SETTINGS.MAXSPEED),
      random(SETTINGS.MINSPEED, SETTINGS.MAXSPEED),
      random(SETTINGS.MINSIZE, SETTINGS.MAXSIZE), randomRGB())
      balls.push(ball)
      
    for ball in balls
      ball.draw()
      ball.update()
      #console.log("hi")

    #setTimeout(@looppi, 1000 / SETTINGS.FPS)

  run: () ->
    setTimeout(@looppi, 1000 / SETTINGS.FPS)
    

    


bal = new Animation()
#bal.log()
bal.run()
#bal.run()
#bal.looppi()
#setTimeout(bal.looppi, 1000 / SETTINGS.FPS)


SETTINGS.FPS = 60
SETTINGS.MINSIZE = 15
SETTINGS.MAXSIZE = 35
SETTINGS.BALLS = 10
SETTINGS.MINSPEED = 1
SETTINGS.MAXSPEED = 4





#pallo.location(25, 5)
#pallo.draw()
#console.log(pallo)