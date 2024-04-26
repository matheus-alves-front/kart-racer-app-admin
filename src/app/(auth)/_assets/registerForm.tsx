"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./auth.module.scss";
import { MobilePreview } from "@/components/TrackPreview/MobilePreview";
import { michromaClassName } from "@/constants/font";
import { fetchInstance } from "@/api/fetchInstances";
import { useRouter } from "next/navigation";

export const handleTime = async (input: string) => {
  let formattedTime;

  // Verifica se o input é um número e menor que 24 (horas em um dia)
  if (input !== '' && !isNaN(Number(input)) && parseInt(input, 10) < 24) {
    // Formata o número para garantir que seja exibido como "09:00" se for menor que 10
    formattedTime = `${parseInt(input, 10) < 10 ? '0' + parseInt(input, 10) : input}:00`;
  } else {
    formattedTime = '';
  }

  return formattedTime
};

export const RegisterForm = () => {
  const router = useRouter()
  const [address, setAddress] = useState({
    street: '',
    city:   '',
    state: '',
    zip:    '',
  })
  const [previewInfos, setPreviewInfos] = useState({
    name: '',
    address,
    availabilityStart: '',
    availabilityEnd: '',
    website: '',
    email: ''
  })


  async function onSubmitRegister (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.target as HTMLFormElement

    const nameInput = target.elements.namedItem("name") as HTMLInputElement;
    const emailInput = target.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = target.elements.namedItem("password") as HTMLInputElement;
    const availabilityStartInput = target.elements.namedItem("availabilityStart") as HTMLInputElement;
    const availabilityEndInput = target.elements.namedItem("availabilityEnd") as HTMLInputElement;
    const addressGoogleURLInput = target.elements.namedItem("addressGoogleURL") as HTMLInputElement;
    const streetInput = target.elements.namedItem("street") as HTMLInputElement;
    const cityInput = target.elements.namedItem("city") as HTMLInputElement;
    const stateInput = target.elements.namedItem("state") as HTMLInputElement;
    const zipInput = target.elements.namedItem("zip") as HTMLInputElement;
    const whatsappInput = target.elements.namedItem("whatsapp") as HTMLInputElement;
    const websiteInput = target.elements.namedItem("website") as HTMLInputElement;

    const availabilityStart = await handleTime(availabilityStartInput.value)
    const availabilityEnd = await handleTime(availabilityEndInput.value)

    
    if (!availabilityStart || !availabilityEnd) {
      throw new Error('Valor Inválido para horário')
    }

    const submitObject = {
      email: emailInput.value,
      password: passwordInput.value,
      name: nameInput.value,
      availabilityStart,
      availabilityEnd,
      raceIntervals: 0,
      addressGoogleURL: addressGoogleURLInput.value,
      address: {
          street: streetInput.value,
          city: cityInput.value,
          state: stateInput.value,
          zip: zipInput.value
      },
      whatsapp: whatsappInput.value,
      website: websiteInput.value
    }

    const registerResponse = await fetchInstance('/track-profile', {
      method: 'POST',
      body: JSON.stringify(submitObject)
    })


    if (registerResponse) {
      router.push('/')
    }
  }

  return (
    <>
      <form onSubmit={onSubmitRegister}>
        <fieldset>
          <div>
            <label 
              htmlFor="name" 
              title="name-label"
            >
              Nome do Kartódromo
            </label>
            <input 
              type="text" 
              name="name" 
              title="name" 
              onChange={(e) => setPreviewInfos({...previewInfos, name: e.target.value})}
              value={previewInfos.name}
            />
          </div>
          <div className={styles.half}>
            <label 
              htmlFor="availabilityStart" 
              title="availabilityStart-label"
            >
              Horário Abertura
            </label>
            <input 
              type="number" 
              name="availabilityStart" 
              title="availabilityStart" 
              onChange={(e) => setPreviewInfos({...previewInfos, availabilityStart: e.target.value})}
              value={previewInfos.availabilityStart}
            />
          </div>
          <div className={styles.half}>
            <label 
              htmlFor="availabilityEnd" 
              title="availabilityEnd-label"
            >
              Encerramento
            </label>
            <input 
              type="number" 
              name="availabilityEnd" 
              title="availabilityEnd" 
              onChange={(e) => setPreviewInfos({...previewInfos, availabilityEnd: e.target.value})}
              value={previewInfos.availabilityEnd}
            />
          </div>
          <div>
            <label 
              htmlFor="street" 
              title="street-label"
            >
              Endereço
            </label>
            <input 
              type="text" 
              name="street" 
              title="street" 
              onChange={(e) => setAddress({...address, street: e.target.value})}
              value={address.street}
            />
          </div>
          <div className={styles.half}>
            <label 
              htmlFor="city" 
              title="city-label"
            >
              Cidade
            </label>
            <input 
              type="text" 
              name="city" 
              title="city" 
              onChange={(e) => setAddress({...address, city: e.target.value})}
              value={address.city}
            />
          </div>
          <div className={styles.half}>
            <label 
              htmlFor="state" 
              title="state-label"
            >
              Estado
            </label>
            <input 
              type="text" 
              name="state" 
              title="state" 
              onChange={(e) => setAddress({...address, state: e.target.value})}
              value={address.state}
            />
          </div>
          <div className={styles.half}>
            <label 
              htmlFor="zip" 
              title="zip-label"
            >
              Cep
            </label>
            <input 
              type="text" 
              name="zip" 
              title="zip" 
              onChange={(e) => setAddress({...address, zip: e.target.value})}
              value={address.zip}
            />
          </div>
          <div className={styles.half}>
            <label 
              htmlFor="addressGoogleURL" 
              title="addressGoogleURL-label"
            >
              Link Google Maps
            </label>
            <input 
              type="text" 
              name="addressGoogleURL" 
              title="addressGoogleURL" 
            />
          </div>
          <div>
            <label 
              htmlFor="website" 
              title="website-label"
            >
              Website
            </label>
            <input 
              type="text" 
              name="website" 
              title="website" 
              onChange={(e) => setPreviewInfos({...previewInfos, website: e.target.value})}
              value={previewInfos.website}
            />
          </div>
        </fieldset>
        <fieldset className={styles.loginCredentials}>
          <div>
            <div>
              <label 
                htmlFor="whatsapp" 
                title="whatsapp-label"
              >
                Whatsapp para contato
              </label>
              <input 
                type="text" 
                name="whatsapp" 
                title="whatsapp" 
              />
            </div>
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
                onChange={(e) => setPreviewInfos({...previewInfos, email: e.target.value})}
                value={previewInfos.email} 
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
          </div>
          <button className={michromaClassName} type="submit">Inscrever-se</button> 
        </fieldset>
        <fieldset>
        </fieldset>
      </form>
      <MobilePreview  
        email={previewInfos.email} 
        name={previewInfos.name} 
        availabilityStart={previewInfos.availabilityStart} 
        availabilityEnd={previewInfos.availabilityEnd}
        address={address} 
        website={previewInfos.website}
      />
    </>
  )
}