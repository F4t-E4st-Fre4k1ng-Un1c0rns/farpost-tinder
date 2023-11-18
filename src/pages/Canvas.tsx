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
  title: Array<string>
  text: Array<string>

  constructor(x: number, y: number, title: string, text: string) {
    super(x, y)
    this.title = title.split(/(?![^\n]{1,20}$)([^\n]{1,20})\s/g).filter((v) => { return v != '' })
    this.text = text.split(/(?![^\n]{1,30}$)([^\n]{1,30})\s/g).filter((v) => { return v != '' })

  }

  render (ctx: CanvasRenderingContext2D, dx: number, dy: number) {
    ctx.font = '30px sans'
    this.title.forEach((v, i) => {
      ctx.fillText(v, this.x + dx, this.y + dy + 32 * i)
    })
    ctx.font = '20px sans'
    this.text.forEach((v, i) => {
      ctx.fillText(v, this.x + dx, this.y + dy + 32 * this.title.length + 22 * i)
    })
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
    drawings: [],
    mouseClicked: false,
    dx: 0,
    dy: 0
  }
  canvasRef = createRef<HTMLCanvasElement>()

  componentDidMount () {
    this.updateEverything()
  }

  updateData () {
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/adverts').then((r) => {
      if (r.status == 200) {
        r.json().then((json) => {
            this.state.drawings = []
            json.forEach((drawing: any) => {
            this.state.drawings.push(
              new Text(
                drawing.x_coordinates, drawing.y_coordinates, 
                drawing.title, drawing.text
              ))
            })
            this.setState(this.state)
            this.updateCanvas()
        })
      }
    })
  }

  updateCanvas () {
    if (this.canvasRef.current == undefined) {
      return;
    }
    const ctx = this.canvasRef.current.getContext('2d');
    if (ctx == null) {
      return;
    }
    ctx.clearRect(0,0, 1000, 1000);
    ctx.fillStyle = 'white'
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

  updateEverything(): void {
    this.updateData()
    if (this.canvasRef.current == undefined) {
      return;
    }
    this.canvasRef.current.width = window.innerWidth
    this.canvasRef.current.height = window.innerHeight
  }

  render() {
    return (
      <canvas ref={this.canvasRef} style={{width: '100vw', height: '100vh'}} 
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
