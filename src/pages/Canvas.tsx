import {Component, createRef } from 'react'

class Drawing {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  render (ctx: CanvasRenderingContext2D, dx: number, dy: number) {}
}

class Text extends Drawing {
  text: string
  color: string
  font: string

  constructor(x: number, y: number, text: string, color: string, font: string) {
    super(x, y)
    this.text = text
    this.color = color
    this.font = font
  }

  render (ctx: CanvasRenderingContext2D, dx: number, dy: number) {
    ctx.font = this.font
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.x + dx, this.y + dy)
  }
}


type Props = {}
type State = {
  drawings: Array<Drawing>
  mouseClicked: boolean,
  dx: number
  dy: number
}

export default class Canvas extends Component<Props, State> {
  state: State = {
    drawings: [
      new Text(10, 10, 'Hi!', 'white', '12px serif'),
      new Text(10, 600, 'meow', 'yellow', '500px monospace'),
    ],
    mouseClicked: false,
    dx: 0,
    dy: 0
  }
  canvasRef = createRef<HTMLCanvasElement>()

  updateCanvas () {
    console.log(this.canvasRef)
    if (this.canvasRef.current == undefined) {
      return;
    }
    const ctx = this.canvasRef.current.getContext('2d');
    if (ctx == null) {
      return;
    }
    ctx.clearRect(0,0, 1000, 1000);
    this.state.drawings.forEach(drawing => {
      drawing.render(ctx, this.state.dx, this.state.dy)
    })
  }

  moveElements(e: any) {
    if (!this.state.mouseClicked) {
      return
    }
    this.state.dx += e.movementX
    this.state.dy += e.movementY
    this.updateCanvas()
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width='1000' height='1000' 
          //onClick={() => {this.updateCanvas()}} 
          onPointerMove={(e) => { this.moveElements(e) }}
          onMouseDown={() => {
            this.state.mouseClicked = true
            this.setState(this.state)
          }}
          onMouseUp={() => {
            this.state.mouseClicked = false
            this.setState(this.state)
          }}
        ></canvas>
    )
  }
}
