import { RaceCategories, TrackType } from "@/@types/types"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { getAllCookies } from "@/hooks/useTokenCookies"
import { EditForm } from "./_assets/editForm"
import styles from './_assets/trackProfile.module.scss'
import { CategoriesForm } from "./_assets/categoriesForm"

export default async function TrackProfilePage() {
  const { trackId } = await getAllCookies() 
  const track: TrackType = await fetchInstanceWithCookies(`/track-profile/${trackId}`, {
    method: 'GET'
  })

  const categories: RaceCategories[] = await fetchInstanceWithCookies(`/track-profile/${trackId}/categories`, {
    method: 'GET'
  })

  return (
    <section className={styles.EditPage}>
      <h1>Kartódromo</h1>
      <EditForm track={track} />
      <CategoriesForm trackId={String(trackId)} categories={categories} />
    </section>
  )
}