import User from "../interfaces/User"
type HumanCardProps = {
  user: User
}

function HumanCard(props: HumanCardProps) {
  return (
    <div>
      <img src={props.user.profilePicture}></img>
      <p>{props.user.firstName} {props.user.lastName}</p>
      <p>{props.user.bio}</p>
    </div>
  )
}

export { HumanCard }
