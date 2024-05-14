import Image from 'next/image'
import styles from './Loader.module.scss'

export const Loader = ({
  isLoading
}: {
  isLoading: boolean
}) => {
  return (
    <dialog 
      open={isLoading}
      className={isLoading ? styles.Dialog : styles.Closed}
    >
      <Image 
        src="/assets/loading.gif" 
        alt="Kart Loader"
        width={350} 
        height={200} 
      />
    </dialog>
  )
}