'use client'
import Link from "next/link"
import styles from './header.module.scss'
import { usePathname } from "next/navigation"

export const Header = () => {
  const pathName = usePathname()
  console.log(pathName)
  return (
    <header className={styles.Header}>
      <nav>
        <Link 
          href={'/'}
          className={pathName === '/kart-space/events' ? styles.active : ''}
        >
          Eventos
        </Link>
        <Link 
          href={'/'}
          className={pathName === '/kart-space/racers-profiles' ? styles.active : ''}
        >
          Pilotos
        </Link>
        <Link 
          href={'/'}
          className={pathName === '/kart-space/race-schedule' ? styles.active : ''}
        >
          Cronograma do dia
        </Link>
        <Link 
          href={'/'}
          className={pathName === '/kart-space/scheduled-races' ? styles.active : ''}
        >
          Reservas
        </Link>
        <Link 
          href={'/'}
          className={pathName === '/kart-space/all-races' ? styles.active : ''}
        >
          Histórico de Corridas
        </Link>
        <Link 
          href={'/'}
          className={pathName === '/kart-space/all-races' ? styles.active : ''}
        >
          Kartódromo
        </Link>
      </nav>
    </header>
  )
}