'use client'
import { michromaClassName } from '@/constants/font'
import styles from './trackProfile.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import { RaceCategories } from '@/@types/types'
import { fetchInstanceWithCookies } from '@/api/fetchInstances'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/contexts/LoadingContext'

export const CategoriesForm = ({
  categories,
  trackId
}: {
  categories: RaceCategories[],
  trackId: string
}) => {
  const router = useRouter()
  const {setIsLoading} = useLoading()
  const [isCreateNew, setIsCreateNew] = useState(false)

  const createNewCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const target = e.target as HTMLFormElement
    const nameInput = target.elements.namedItem("name") as HTMLInputElement;
    const priceInput = target.elements.namedItem("price") as HTMLInputElement;
    const equipmentPriceInput = target.elements.namedItem("equipmentPrice") as HTMLInputElement;
    
    const sendCategories = await fetchInstanceWithCookies(`/track-profile/${trackId}/categories`, {
      method: 'POST',
      body: JSON.stringify({
        name: nameInput.value,
        price: priceInput.value,
        equipmentPrice: equipmentPriceInput.value
      })
    })

    console.log(sendCategories)

    router.refresh()
  }

  const updateCategory = async (categoryId: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const target = e.target as HTMLFormElement
    const nameInput = target.elements.namedItem("name") as HTMLInputElement;
    const priceInput = target.elements.namedItem("price") as HTMLInputElement;
    const equipmentPriceInput = target.elements.namedItem("equipmentPrice") as HTMLInputElement;
    
    await fetchInstanceWithCookies(`/track-profile/${trackId}/categories/${categoryId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: nameInput.value,
        price: priceInput.value,
        equipmentPrice: equipmentPriceInput.value
      })
    })

    router.refresh()
  }

  useEffect(() => {
    if (categories && categories.length) setIsLoading(false)
  }, [categories])

  return (
    <div className={styles.categories}>
      <h2>Categorias:</h2>
      {categories.map((category) => (
        <form className={styles.update} key={category.id} onSubmit={(e) => updateCategory(category.id, e)}>
          <fieldset>
            <label htmlFor="name">Nome</label>
            <input defaultValue={category.name} type="text" name="name" />
          </fieldset>
          <fieldset>
            <label htmlFor="price">Preço</label>
            <input defaultValue={category.price} type="text" maxLength={6} name="price" />
          </fieldset>
          <fieldset>
            <label htmlFor="equipmentPrice">Preço equipamento</label>
            <input defaultValue={category.equipmentPrice} type="text" maxLength={6} name="equipmentPrice" />
          </fieldset>
          <button className={michromaClassName}>Atualizar</button>
        </form>
      ))}
      <button onClick={() => setIsCreateNew(!isCreateNew)} className={michromaClassName}>
        Adicionar Categoria <span>+</span>
      </button>
      {isCreateNew ? 
        <form onSubmit={createNewCategory}>
          <fieldset>
            <label htmlFor="name">Nome</label>
            <input defaultValue={'6,5hp'} type="text" name="name" />
          </fieldset>
          <fieldset>
            <label htmlFor="price">Preço</label>
            <input defaultValue={90.00} type="text" maxLength={6} name="price" />
          </fieldset>
          <fieldset>
            <label htmlFor="equipmentPrice">Preço equipamento</label>
            <input defaultValue={20.00} type="text" maxLength={6} name="equipmentPrice" />
          </fieldset>
          <button className={michromaClassName}>Criar</button>
        </form>
      : null}
    </div>
  )
}