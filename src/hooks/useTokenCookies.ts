"use server"
import { cookies } from 'next/headers'

export async function setCookies(
  label: string,
  loginToken: string,
) {
  const cookie = cookies()

  cookie.set(label, loginToken)  
} 

export async function clearAllCookies() {
  const cookie = cookies()
  cookie.set('loginToken', '')  
  cookie.set('trackId', '')  
}

export async function getAllCookies() {
  const cookie = cookies()

  const loginToken = cookie.get('loginToken')  
  const trackId = cookie.get('trackId')  

  const tokens = {
    loginToken: loginToken?.value,
    trackId: trackId?.value
  }

  return tokens
} 