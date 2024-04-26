'use client'
import { RacesType } from "@/@types/types"
import styles from './RaceScheduleTabs.module.scss'
import { michromaClassName } from "@/constants/font"
import { useState } from "react"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { useRouter } from "next/navigation"

export const RaceScheduleTabs = ({
  races,
  trackId
}: {
  races: RacesType[],
  trackId: string
}) => {
  const [activeRaceTab, setActiveRaceTab] = useState(races[0])
  return (
    <div className={styles.Section}>
      <nav>
        {races.map((race) => (
          <button 
            key={race.id}
            className={michromaClassName} 
            onClick={() => setActiveRaceTab(race)}
          >
            {race.time}
          </button>
        ))}
      </nav>
      {races.length ? 
        <RaceTab trackId={trackId} race={activeRaceTab} />
      : null}
    </div>
  )
}

export const RaceTab = ({
  race,
  trackId
}: {
  race: RacesType,
  trackId: string
}) => {
  return (
    <div className={styles.RaceTab}>
      <div className={styles.resume}>
        <h2>Corrida: <small>{race.time}</small></h2>
        <div>
          <span>Categoria:</span>
          <select name="categories" id="categoriesSelect">
            <option value="">13hp</option>
          </select>
        </div>
        <div>
          <span>Treino:</span>
          <span className={styles.values}>{race.sessions.practiceMinutes}min</span>
        </div>
        <div>
          <span>Qualy:</span>
          <span className={styles.values}>{race.sessions.qualyMinutes}min</span>
        </div>
        <div>
          <span>Corrida:</span>
          <span className={styles.values}>{race.sessions.raceMinutes}min</span>
        </div>
        <div>
          <span>Reserva:</span>
          <span className={styles.values}>{race.racerHost ? race.racerHost.name : null}</span>
        </div>
        <button className={michromaClassName}>Confirmar</button>
      </div>
      <div className={styles.drivers}>
        <h2>Pilotos:</h2>
        {race.racersProfiles ? 
          <>
            {race.racersProfiles.map((racerProfile) => (
              <RacerTableRow 
                key={racerProfile.id}
                trackId={trackId}
                raceId={race.id}
                racerProfile={{
                  id: racerProfile.id,
                  name: racerProfile.name,
                  whatsapp: racerProfile.whatsapp
                }} 
              />
            ))}
          </>
        : null}
      </div>
    </div>
  )
}

type SimpleRacerProfile = {
  id: string,
  name: string,
  whatsapp: string
}

const RacerTableRow = ({
  racerProfile,
  trackId,
  raceId
}: {
  racerProfile: SimpleRacerProfile,
  trackId: string,
  raceId: string
}) => {
  const router = useRouter()

   const removeRacerProfileFromRace = async () => {
    const removeRacerResponse = await fetchInstanceWithCookies(`/track/${trackId}/races/${raceId}/removeRacer/${racerProfile.id}`, {
      method: 'POST'
    })

    if (removeRacerResponse) router.refresh()
  }
  return (
    <div className={styles.racerProfile}>
      <span>{racerProfile.name}</span>
      <span>Whatsapp: {racerProfile.whatsapp}</span>
      <button 
        onClick={removeRacerProfileFromRace}
        className={michromaClassName}
      >
        Remover
      </button>
    </div>
  )
}