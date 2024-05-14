"use client"
import { FormEvent, useState } from "react";
import { michromaClassName } from "@/constants/font";
import { fetchInstance } from "@/api/fetchInstances";
import { useRouter } from "next/navigation";
import { setCookies } from "@/hooks/useTokenCookies";
import { useLoading } from "@/contexts/LoadingContext";


export const LoginForm = () => {
  const router = useRouter()
  const {setIsLoading} = useLoading()

  async function onSubmitLogin (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const target = e.target as HTMLFormElement

    const emailInput = target.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = target.elements.namedItem("password") as HTMLInputElement;
    
    if (!emailInput.value || !emailInput.value) {
      return
    }

    const submitObject = {
      email: emailInput.value,
      password: passwordInput.value,
    }

    const loginResponse = await fetchInstance('/track-profile/login', {
      method: 'POST',
      body: JSON.stringify(submitObject)
    })

    if (loginResponse.token) {
      await setCookies('loginToken', loginResponse.token)
      await setCookies('trackId', loginResponse.trackProfile.id)
      router.push('/kart-space/race-schedule')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={onSubmitLogin}>
      <div>
        <label 
          htmlFor="email" 
          title="email-label"
        >
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          title="email" 
        />
      </div>
      <div>
        <label 
          htmlFor="password" 
          title="whatsapp-label"
        >
          Senha
        </label>
        <input 
          type="text" 
          name="password" 
          title="password" 
        />
      </div>
      <button className={michromaClassName} type="submit">Entrar</button> 
    </form>
  )
}