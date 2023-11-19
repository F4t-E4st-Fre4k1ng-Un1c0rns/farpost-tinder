import { Component } from 'react'
import LoginState from '../interfaces/LoginState'
import './Login.css'
import farpostBig from '../assets/farpost_big.svg'

enum CurrentState {
  Input,
  Sending,
  Ok,
  Error
}

type Props = {}
type State = {
  logging: CurrentState,
  username: string,
  password: string,
  errorMessage: string | undefined
}

export default class Login extends Component<Props, State> {
  state: State = {
    logging: CurrentState.Input,
    username: '',
    password: '',
    errorMessage: undefined
  }
  
  checkAuth() {
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      switch (response.status) {
        case 200: {
          response.json().then((json) => {
            const loginState: LoginState = {
              loggedIn: true, 
              accessToken: json.access, 
              refreshToken: json.refresh
            }
            console.log(loginState)
            window.localStorage.setItem("loginState", JSON.stringify(loginState));
            window.localStorage.setItem("access", json.access)
            window.localStorage.setItem("refresh", json.refresh)
            window.location.href = '/canvas'
          })
          break
        }
        case 401: {
          this.state.errorMessage = 'Неверное имя пользователя или пароль'
          this.state.logging = CurrentState.Error
          break
        }
        default: {
          this.state.errorMessage = 'Проверьте данные'
          this.state.logging = CurrentState.Error
          break
        }
      }
    })
  }

  render() {
    return (
      <div className='loginForm'>
        <img src={farpostBig}></img>
        <h1>Добро пожаловать</h1>
        <p className='moto'>Найдите своих единомышленников по интересам и раскройте новые горизонты вместе с нами</p>
        <input id='username' className='loginText' onChange={
          e => {
            this.state.username = e.target.value;
            this.setState(this.state)
          }
        } placeholder='Имя пользователя в telegram'/>
        <input type='password' className='loginText' onChange={
          e => {
            this.state.password = e.target.value;
            this.setState(this.state)
          }
        } placeholder='Пароль'/>
        <div id='remember'>
          <input type='checkbox' id='remember' />
          <label htmlFor='remember'>Запомнить меня</label>
        </div>
        <button onClick={() => { this.checkAuth() }}>Вход</button>
      </div>
        )
  }
}
