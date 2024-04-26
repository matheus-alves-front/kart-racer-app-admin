"use client"
import { FormEvent, useEffect, useState } from "react";
import { michromaClassName } from "@/constants/font";
import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { useRouter } from "next/navigation";
import styles from './raceScheduleForm.module.scss'
import { TrackType } from "@/@types/types";

export const RaceScheduleForm = ({
  track
}: {
  track: TrackType
}) => {
  const router = useRouter()

  const [racesConfigs, setRacesConfigs] = useState({
    openTime: track.availabilityStart,
    closeTime: track.availabilityEnd,
    practiceMinutes: 0,
    qualyMinutes: 0,
    raceMinutes: 0,
    raceLaps: 0
  })

  const [raceInterval, setRaceInterval] = useState(0)

  async function onCreateSchedulesRaces (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (
      !raceInterval 
      || !racesConfigs.qualyMinutes
      || !racesConfigs.raceMinutes
    ) return

    const objectToSend = {
      ...racesConfigs,
      raceInterval,
      raceLaps: 0
    }

    const createRacesResponse = await fetchInstanceWithCookies(`/track/${track.id}/races`, {
      method: 'POST',
      body: JSON.stringify(objectToSend)
    })

    if (createRacesResponse.count) {
      router.refresh()
    }
  }

  useEffect(() => {
    setRaceInterval(
      racesConfigs.practiceMinutes + 
      racesConfigs.qualyMinutes + 
      racesConfigs.raceMinutes 
    )
  },[racesConfigs])

  return (
    <form className={styles.Form} onSubmit={onCreateSchedulesRaces}>
      <fieldset>
        <div>
          <label 
            htmlFor="availabilityStart" 
            title="availabilityStart-label"
          >
            Horário Início
          </label>
          <input 
            type="text" 
            name="availabilityStart" 
            title="availabilityStart" 
            value={racesConfigs.openTime}
            onChange={(e) => setRacesConfigs({...racesConfigs, openTime: e.target.value})}
          />
        </div>
        <div>
          <label 
            htmlFor="availabilityEnd" 
            title="availabilityEnd-label"
          >
            Horário Encerramento
          </label>
          <input 
            type="text" 
            name="availabilityEnd" 
            title="availabilityEnd" 
            value={racesConfigs.closeTime}
            onChange={(e) => setRacesConfigs({...racesConfigs, closeTime: e.target.value})}
          />
        </div>
        <div>
          <label 
            htmlFor="practiceTime" 
            title="practiceTime-label"
          >
            Minutos Treinos
          </label>
          <input 
            type="number" 
            name="practiceTime" 
            title="practiceTime" 
            value={racesConfigs.practiceMinutes}
            onChange={(e) => setRacesConfigs({...racesConfigs, practiceMinutes: Number(e.target.value)})}
          />
        </div>
        <div>
          <label 
            htmlFor="qualyTime" 
            title="qualyTime-label"
          >
            Minutos Qualy
          </label>
          <input 
            type="number" 
            name="qualyTime" 
            title="qualyTime"
            value={racesConfigs.qualyMinutes}
            onChange={(e) => setRacesConfigs({...racesConfigs, qualyMinutes: Number(e.target.value)})} 
          />
        </div>
        <div>
          <label 
            htmlFor="raceTime" 
            title="raceTime-label"
          >
            Minutos Corrida
          </label>
          <input 
            type="number" 
            name="raceTime" 
            title="raceTime" 
            value={racesConfigs.raceMinutes}
            onChange={(e) => setRacesConfigs({...racesConfigs, raceMinutes: Number(e.target.value)})} 
          />
        </div>
      </fieldset>
      <fieldset className={styles.resume}>
        <span>Corridas de {raceInterval} em {raceInterval} minutos:</span>
        <button className={michromaClassName} type="submit">Gerar Corridas</button> 
      </fieldset>
    </form>
  )
}