import { Component } from "react";

import User from "../interfaces/User";
import { HumanCard } from "../components/HumanCard";

import './People.css'

type Props = {}
type State = {
  allUsers: Array<User>,
  filteredUsers: Array<User>,
  interests: Array<string>,
  
  filterName: string,
  filterInterests: Array<string>

}

export default class People extends Component<Props, State> {
  state: State = {
    allUsers: [],
    filteredUsers: [],
    interests: [],

    filterName: '',
    filterInterests: []
  }

  componentDidMount() {
      this.updateData()
  }


  updateData () {
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/profiles/').then((r) => {
      if (r.status == 200) {
        r.json().then((json) => {
            this.state.allUsers = []
            json.forEach((human: any) => {
            this.state.allUsers.push(
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
            this.state.filteredUsers = this.state.allUsers;
            this.setState(this.state)
        })
      }
    })
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/interests/').then((r) => {
      if (r.status == 200) {
        r.json().then((json) => {
            this.state.interests = []
            json.forEach((interest: any) => {
            this.state.interests.push(interest.name)
            this.setState(this.state)
          })
        })
      }
    })
  }

  filter_people(){
    const result_db: Array<User> = [];
    this.state.allUsers.forEach((v) => {
      const fullName1: String = (v.firstName + " " + v.lastName).toLowerCase();
      const fullName2: String = (v.lastName + " " + v.firstName).toLowerCase();
      if (this.state.filterName && !(fullName1.includes(this.state.filterName.toLowerCase())) && !(fullName2.includes(this.state.filterName.toLowerCase()))){
        return;
      }
  
      let flag_to_skip: boolean = false;
      for (let interest of this.state.filterInterests){
        // console.log(db[id_person].interests, interest);
        if (!(v.interests.includes(interest))){
          
          flag_to_skip = true;
          break;
        }
      }
      if (flag_to_skip){
        return
      }
      result_db.push(v);
    })
    this.state.filteredUsers = result_db
    this.setState(this.state)
  }
  render () {
    return (
      <div className='people'>
      <input onChange={(e) => {
        this.state.filterName = e.target.value
        this.setState(this.state)
        this.filter_people()
      }} placeholder="Ищите по имени"></input>
      <div className='interestFilters'>
        {this.state.interests.map((interest) => {
          return <p className='interestFilter'
            key={interest} onClick={(e) => {
              if (this.state.filterInterests.includes(interest)) {
                this.state.filterInterests = this.state.filterInterests.filter((e) => { return e != interest })
                e.currentTarget.id = 'clicked'
              } else {
                this.state.filterInterests.push(interest)
                e.currentTarget.id = ''
              }
              this.setState(this.state)
            }}>{interest}</p>
        })}
      </div>
      {this.state.filteredUsers.map((user) => {
        return <HumanCard user={user} key={user.username}></HumanCard>
        })}
      </div>
    )
  }
}
