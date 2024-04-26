import { RacesType, TrackType } from "@/@types/types";
import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { RaceScheduleTabs } from "@/components/Races/RaceScheduleTabs";
import { RaceScheduleForm } from "@/components/RaceScheduleForm/RaceScheduleForm";
import { getAllCookies } from "@/hooks/useTokenCookies";

export default async function RaceSchedulePage() {
  const { trackId } = await getAllCookies() 
  const track: TrackType = await fetchInstanceWithCookies(`/track-profile/${trackId}`, {
    method: 'GET'
  })

  const races: RacesType[] = await fetchInstanceWithCookies(`/track/${trackId}/races`, {
    method: 'GET',
  })

  return (
    <section>
      <h1 style={{textAlign: 'center'}}>Cronograma do dia</h1>
      <RaceScheduleForm track={track} />
      <RaceScheduleTabs trackId={track.id} races={races} />
    </section>
  )
}