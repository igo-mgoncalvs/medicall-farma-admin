export interface ICategories {
  id: string
  categoryName: string
  categoryLink: string
  products: IProduct[]
  Gruop: IGroup
}

export interface IGroup {
  id: string
  groupName: string
  groupLink: string
  isTop: boolean
  categories: ICategories[]
}

export interface IProduct {
  id: number
  name: string
  description: string
  link: string
  shortDescription: string
  contactLink: string
  groupName: string
  isTop: boolean
  sizes: {
    id: number
    src: string
    alt: string
    isMain: boolean
    size: string
  }[]
}
