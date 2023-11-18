import { Component } from 'react'

enum CurrentState {
  Input,
  Sending,
  Ok,
  Error
}

type Props = {}
type State = {
  logging: CurrentState
}

export default class Login extends Component<Props, State> {
  state: State = {
    logging: CurrentState.Input
  }
  render() {
    return (
      <form>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' />
        <label htmlFor='password'>Пароль</label>
        <input type='password' id='password' />
        <input type='checkbox' id='remember' />
        <label htmlFor='remember'>Запомнить меня</label>
        <button>Вход</button>
        <p>Или через</p>
        <a>farpost</a>
        <a>drom</a>
        <a>vl.ru</a>
      </form>
        )
  }
}
