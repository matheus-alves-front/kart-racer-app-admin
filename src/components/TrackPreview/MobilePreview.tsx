import { AddressType, TrackType } from '@/@types/types'
import Image from 'next/image'

import styles from './mobilePreview.module.scss'
import { michromaClassName } from '@/constants/font'

type PreviewProps = {
  name: string,
  address: AddressType,
  availabilityStart: string,
  availabilityEnd: string,
  website: string,
  email: string
}


export const handleTime = (input: string) => {
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

export const MobilePreview = ({
  name,
  address,
  availabilityStart,
  availabilityEnd,
  website,
  email
}: PreviewProps) => {
  return (
    <div className={styles.mobilePreview}>
      <div className={styles.device}>
        <header>
          <h5>{name}</h5>
          <Image 
            src={'/assets/images/trackImage.png'}
            alt='Track Image'
            width={200}
            height={200}
          />
        </header>
        <nav>
          <button>Sobre</button>
        </nav>
        <article>
          <p>Descrição...</p>
          <p>Categorias:</p>
          <p>Horários: {handleTime(availabilityStart)}h - {handleTime(availabilityEnd)}h</p>
          <div>
            <span>Endereço:</span>
            <button className={michromaClassName}>Abrir no mapa</button>
          </div>
          <p>{address.street}, {address.city} - {address.state}, {address.zip}</p>
          <p>Email: {email}</p>
          <p>Site: {website}</p>
        </article>
        <button className={michromaClassName}>Whatsapp</button>
      </div>
    </div>
  )
}