'use client'
import Link from "next/link"
import styles from './header.module.scss'
import { usePathname } from "next/navigation"

export const Header = () => {
  const pathName = usePathname()

  return (
    <header className={styles.Header}>
      <nav>
        <Link 
          href={'/kart-space/events'}
          className={pathName === '/kart-space/events' ? styles.active : ''}
        >
          Eventos
        </Link>
        <Link 
          href={'/kart-space/racers-profiles'}
          className={pathName === '/kart-space/racers-profiles' ? styles.active : ''}
        >
          Pilotos
        </Link>
        <Link 
          href={'/kart-space/race-schedule'}
          className={pathName === '/kart-space/race-schedule' ? styles.active : ''}
        >
          Cronograma do dia
        </Link>
        <Link 
          href={'/kart-space/scheduled-races'}
          className={pathName === '/kart-space/scheduled-races' ? styles.active : ''}
        >
          Reservas
        </Link>
        <Link 
          href={'/kart-space/all-races'}
          className={pathName === '/kart-space/all-races' ? styles.active : ''}
        >
          Histórico de Corridas
        </Link>
        <Link 
          href={'/kart-space/track-profile'}
          className={pathName === '/kart-space/track-profile' ? styles.active : ''}
        >
          Kartódromo
        </Link>
      </nav>
    </header>
  )
}