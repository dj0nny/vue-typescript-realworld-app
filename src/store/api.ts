import axios from 'axios'
import { ArticlesResponse, UserSubmit, UserResponse, User, Profile, ProfileResponse } from './models';

export const conduitAPI = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
})

export function setJWT(jwt: string) {
  conduitAPI.defaults.headers.common['Authorization'] = `Token ${jwt}`
}

export function clearJWT() {
  delete conduitAPI.defaults.headers.common['Authorization']
}

export async function loginUser(user: UserSubmit): Promise<User> {
  const res = await conduitAPI.post('/users/login', {
    user
  })
  // const loggedUser = (res.data as UserResponse).user
  // setJWT(loggedUser.token)
  return (res.data as UserResponse).user
}

export async function fetchProfile(username: string): Promise<Profile> {
  const res = await conduitAPI.get(`/profiles/${username}`)
  return (res.data as ProfileResponse).profile
}

export async function fetchFeed() {
  const res = await conduitAPI.get('/articles')
  return res.data as ArticlesResponse
}