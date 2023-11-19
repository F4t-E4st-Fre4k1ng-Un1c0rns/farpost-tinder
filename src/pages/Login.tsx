import { Component } from 'react'
import LoginState from '../interfaces/LoginState'

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
      <div>
        <label htmlFor='username'>Email</label>
        <input id='username' onChange={
          e => {
            this.state.username = e.target.value;
            this.setState(this.state)
          }
        }/>
        <label htmlFor='password'>Пароль</label>
        <input type='password' id='password' onChange={
          e => {
            this.state.password = e.target.value;
            this.setState(this.state)
          }
        }/>
        <input type='checkbox' id='remember' />
        <label htmlFor='remember'>Запомнить меня</label>
        <button onClick={() => { this.checkAuth() }}>Вход</button>
        <p>Или через</p>
        <a>farpost</a>
        <a>drom</a>
        <a>vl.ru</a>
      </div>
        )
  }
}
