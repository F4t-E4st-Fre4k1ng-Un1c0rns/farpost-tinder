import { Component } from "react";

import User from "../interfaces/User";

type Props = {}
type State = {
  users: Array<User>
}

export default class People extends Component<Props, State> {
  state: State = {
    users: []
  }

  componentDidMount() {
      this.updateData()
  }


  updateData () {
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/profiles/').then((r) => {
      if (r.status == 200) {
        r.json().then((json) => {
            this.state.users = []
            json.forEach((human: any) => {
            this.state.users.push(
              {
                username: human.username,
                profilePicture: human.profile_picture,
                firstName: human.first_name,
                lastName: human.last_name,
                city: human.city,
                bio: human.bio,
                interests: human.interests
              })
            })
            this.setState(this.state)
        })
      }
    })
  }

  render () {
    return (
      <div>
        {this.state.users.map((user) => {
          return <p>{ user.firstName } { user.lastName }</p>
        })}
      </div>
    )
  }
}
