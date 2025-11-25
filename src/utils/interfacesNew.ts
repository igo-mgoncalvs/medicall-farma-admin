export interface ICategories {
  id: string
  categoryName: string
  categoryLink: string
  products: IProduct[]
  gruopId: string
  active: boolean
  Gruop: IGroup
}

export interface IGroup {
  id: string
  groupName: string
  groupLink: string
  active: boolean
  isTop: boolean
  categories: ICategories[]
}

export interface IProduct {
  id: string
  name: string
  description: string
  link: string
  shortDescription: string
  contactLink: string
  groupName: string
  isTop: boolean
  featured: boolean
  active: boolean
  sizes: {
    id: number
    src: string
    alt: string
    isMain: boolean
    size: string
  }[]
}
