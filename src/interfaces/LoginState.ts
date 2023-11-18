export default interface LoginState {
  loggedIn: boolean,
  accessToken: string | undefined,
  refreshToken: string | undefined
}
