import {Component, createRef } from 'react'

import './Canvas.css'

const colors: Array<string> = [
  '#FFC5C5',
  '#FFEBD8',
  '#C7DCA7',
  '#BEADFA',
  '#B0D9B1',
  '#FFF3DA',
  '#FFF6DC',
  '#FFCACC',
  '#DBC4F0'
]

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
  xx: number | undefined
  yy: number | undefined
  author: number
  title: Array<string>
  text: Array<string>

  constructor(x: number, y: number, title: string, text: string, author: number,
              ctx: CanvasRenderingContext2D | null | undefined) {
    super(x, y)
    this.author = author
    this.title = title.split(/(?![^\n]{1,20}$)([^\n]{1,20})\s/g).filter((v) => { return v != '' })
    this.text = text.split(/(?![^\n]{1,30}$)([^\n]{1,30})\s/g).filter((v) => { return v != '' })
    if (ctx != null) {
      this.getSize(ctx)
    }
  }

  getSize(ctx: CanvasRenderingContext2D) {
    let width = 0
    ctx.font = '30px sans'
    this.title.forEach((v) => {
      width = Math.max(width, ctx.measureText(v).width)
    })
    ctx.font = '20px sans'
    this.text.forEach((v) => {
      width = Math.max(width, ctx.measureText(v).width)
    })
    this.xx = width + 40
    this.yy = 40 + 32 * this.title.length + 22 * this.text.length
  }

  render (ctx: CanvasRenderingContext2D, dx: number, dy: number) {
    let colorId = this.title[0].charCodeAt(0) % colors.length
    ctx.fillStyle = colors[colorId]
    if (this.xx == undefined || this.yy == undefined) {
      return;
    }
    ctx.fillRect(this.x + dx - 10, this.y + dy - 20, this.xx, this.yy)
    ctx.fillStyle = 'black'
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
  drawings: Array<Text>
  mouseClicked: boolean,
  dx: number
  dy: number,
  touchStartX: number,
  touchStartY: number,
}

export default class Canvas extends Component<Props, State> {
  state: State = {
    drawings: [],
    mouseClicked: false,
    dx: 0,
    dy: 0,
    touchStartX: 0,
    touchStartY: 0,
  }
  canvasRef = createRef<HTMLCanvasElement>()
  linkRef = createRef<HTMLAnchorElement>()
  
  componentDidMount () {
    this.updateEverything()
  }

  updateData () {
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/adverts/', {headers: {'Access-Control-Allow-Origin': 'localhost:5173'}}).then((r) => {
      if (r.status == 200) {
        r.json().then((json) => {
            this.state.drawings = []
            json.forEach((drawing: any) => {
            this.state.drawings.push(
              new Text(
                drawing.x_coordinates, drawing.y_coordinates, 
                drawing.title, drawing.text, drawing.author,
                this.canvasRef.current?.getContext('2d')
              ))
            })
            this.setState(this.state)
            this.updateCanvas()
        })
      }
    })
  }

  checkIsAdvertisment (e: any) {
    this.state.drawings.forEach((drawing) => {
      if (drawing.xx == undefined || drawing.yy == undefined) {
        return
      }
      if ((e.clientX - this.state.dx) > drawing.x && (e.clientY - this.state.dy) > drawing.y &&
          (e.clientX - this.state.dx) < drawing.x + drawing.xx &&
          (e.clientY - this.state.dy) < drawing.y + drawing.yy) {
        console.log(drawing)
        window.location.pathname = '/user/' + drawing.author
      }
    })
  }

  createNew () {
    window.location.href = '/canvas/new?x=' + (this.state.dx + window.innerHeight / 2) + '&y='+ (this.state.dy + window.innerWidth / 2) 
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
    ctx.fillStyle = 'black'
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
      <div className='upperDiv' onTouchStart={(e) => {
              this.state.touchStartX = e.touches[0].clientX;
              this.state.touchStartY = e.touches[0].clientY;
              this.setState(this.state)
            }}
            onTouchMove={(e) => {
            console.log(e)
              let deltaX = e.changedTouches[0].clientX - this.state.touchStartX;
              let deltaY = e.changedTouches[0].clientY - this.state.touchStartY;

              this.state.dx += deltaX
              this.state.dy += deltaY
              this.updateCanvas()

              this.state.touchStartX = e.touches[0].clientX;
              this.state.touchStartY = e.touches[0].clientY;
              this.setState(this.state)
            }}>
        <canvas ref={this.canvasRef} style={{width: '100vw', height: '100vh'}} 
            onClick={(e) => { this.checkIsAdvertisment(e) }} 
            onMouseMove={(e) => { this.moveElements(e) }}
            onMouseDown={() => {
              this.state.mouseClicked = true
              this.setState(this.state)
            }}
            onMouseUp={() => {
              this.state.mouseClicked = false
              this.setState(this.state)
            }}></canvas>
          { window.localStorage.getItem('loginState') && <button className='fab' onClick={() => { this.createNew() }}>+</button> }
        </div>
    )
  }
}
