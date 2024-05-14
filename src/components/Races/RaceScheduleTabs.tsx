'use client'
import { RaceCategories, RacesType } from "@/@types/types"
import styles from './RaceScheduleTabs.module.scss'
import { michromaClassName } from "@/constants/font"
import { ChangeEvent, useState } from "react"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { useRouter } from "next/navigation"
import { useLoading } from "@/contexts/LoadingContext"

export const RaceScheduleTabs = ({
  races,
  trackId,
  categories
}: {
  races: RacesType[],
  trackId: string,
  categories: RaceCategories[]
}) => {
  const [activeRaceTab, setActiveRaceTab] = useState(races[0])

  console.log(races)
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
        <RaceTab categories={categories} trackId={trackId} race={activeRaceTab} />
      : null}
    </div>
  )
}

export const RaceTab = ({
  race,
  trackId,
  categories
}: {
  race: RacesType,
  trackId: string,
  categories: RaceCategories[]
}) => {
  const {setIsLoading} = useLoading()
  const [isScheduled, setIsScheduled] = useState(race.isScheduled)
  
  const onReservedChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    const isReserved = e.target.value === 'true'

    await fetchInstanceWithCookies(`/track/${trackId}/races/${race.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isReserved: isReserved
      })
    })
    setIsLoading(false)
  }

  const onRacerHostChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    const newRacerHost = e.target.value
    await fetchInstanceWithCookies(
      `track/${trackId}/races/changeHost/${race.id}/from/${race.racerHostProfile.id}/to/${newRacerHost}`, {
      method: 'POST',
    })
    setIsLoading(false)
  }

  const scheduleRace = async (isScheduled: boolean) => {
    setIsLoading(true)
    await fetchInstanceWithCookies(`/track/${trackId}/races/${race.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isScheduled
      })
    })
    setIsScheduled(isScheduled)
    setIsLoading(false)
  }

  const handleCategoryRace = async (e: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    const categoryId = e.target.value

    if (!race.category) {
      await fetchInstanceWithCookies(`/track/${trackId}/races/${race.id}/addCategory/${categoryId}`, {
        method: 'POST'
      })

      setIsLoading(false)
      return
    }

    await fetchInstanceWithCookies(
      `/track/${trackId}/races/${race.id}/changeCategory/from/${race.category.id}/to/${categoryId}`, {
      method: 'POST'
    })
    setIsLoading(false)
  }

  return (
    <div className={styles.RaceTab}>
      <div className={styles.resume}>
        <h2>Corrida: <small>{race.time}</small></h2>
        <div>
          <span>Categoria:</span>
          <select onChange={handleCategoryRace} className={michromaClassName} name="categories" id="categoriesSelect">
            <option 
                value={race.category ? race.category.id : ''}
            >
              {race.category ? race.category.name : null}
            </option>
            {categories.map((category) => (
              <option defaultChecked={category.id === race.category?.id} key={category.id} value={category.id}>{category.name}</option>
            ))}
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
          <span>Reservado:</span>
          <select onChange={onReservedChange} className={michromaClassName} name="isReserved" id="isReservedSelect">
              {race.isReserved 
              ? 
              <>
                <option defaultChecked={race.isReserved} value="true">Sim</option>
                <option value="false">Não</option>
              </>
              :
              <>
                <option defaultChecked={race.isReserved} value="false">Não</option>
                <option value="true">Sim</option>
              </>
              }
          </select>
        </div>
        <div>
          <span>Organizador:</span>
          <select onChange={onRacerHostChange} className={michromaClassName} name="racerHost" id='racerHost'>
            <option 
              value={race.racerHostProfile ? race.racerHostProfile.id : ''}
            >
              {race.racerHostProfile ? race.racerHostProfile.name : null}
            </option>
            {race.racersProfiles ? 
            <>
              {race.racersProfiles.map((racerProfile) => {
                if (racerProfile.id === race.racerHostProfile.id) return null
                return(
                  <option value={racerProfile.id}>{racerProfile.name}</option>
                )
              }
              )}
            </>
            : null}
          </select>
        </div>
        {isScheduled 
        ? <button onClick={() => scheduleRace(false)} className={`${michromaClassName} ${styles.cancel}`}>Cancelar Corrida</button>
        : <button onClick={() => scheduleRace(true)} className={michromaClassName}>Confirmar Corrida</button>
        }
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