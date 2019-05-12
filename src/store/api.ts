import axios from 'axios'
import { ArticlesResponse, UserSubmit, UserResponse, User, Profile, ProfileResponse, UserForUpdate } from './models';

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

export async function fetchUser(): Promise<User> {
  const res = await conduitAPI.get('/user')
  return (res.data as UserResponse).user
}

export async function updateUser(user: UserForUpdate) {
  const res = await conduitAPI.put('/user', user)
  return res.data as User
}