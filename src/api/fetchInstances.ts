'use server'
import { getAllCookies } from "@/hooks/useTokenCookies"

const API_URL = process.env.API_URL

export async function fetchInstance(
  route: string,
  params: globalThis.RequestInit
) {
  console.log(`Fetch to: ${API_URL}${route}`)
  const fetchRequest = await fetch(`${API_URL}${route}`, {
    ...params,
    headers: {
      "Content-Type": 'application/json',
      ...params.headers
    },
  })

  if (!fetchRequest.ok) return null

  const fetchJson = await fetchRequest.json()

  return fetchJson
}

export async function fetchInstanceWithCookies(
  route: string,
  params: globalThis.RequestInit
) {
  try {
    const { loginToken } = await getAllCookies()

    const fetchRequest = await fetch(`${API_URL}${route}`, {
      ...params,
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `${loginToken}`,
        ...params.headers
      },
    })
  
    if (!fetchRequest.ok) return null
    
    const fetchJson = await fetchRequest.json()

    if (!fetchJson) {
      return fetchRequest
    }

    return fetchJson
  } catch (error) {
    console.error(error)
  }
}