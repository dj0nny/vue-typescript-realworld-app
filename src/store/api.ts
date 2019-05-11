import axios from 'axios'
import { ArticlesResponse } from './models';

export const conduitAPI = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
})

export function setJWT(jwt: string) {
  conduitAPI.defaults.headers.common['Authorization'] = `Token ${jwt}`
}

export function clearJWT() {
  delete conduitAPI.defaults.headers.common['Authorization']
}

export async function fetchFeed() {
  const res = await conduitAPI.get('/articles')
  return res.data as ArticlesResponse
}