export interface ICategory {
  id: string
  name: string
  productsGroupsId: string
  index: number
  active: boolean
}

export interface IGroups {
  id: string
  group_name: string
  active: boolean,
  index: number,
  categories: ICategory[]
}

export interface IProduct {
  id: string
  index: number,
  image: string
  imageId: string
  route: string
  name: string
  favorit: boolean
  subTitle: string
  link: string
  summary: string
  whatsapp: string
  description: string
  active: boolean,
  productsGroupsId: string
  categoryId: string
  category: ICategory
  group: string
}

export interface IInterfaceProducts {
  id: string
  group_name: string
  products_list: IProduct[]
}

export interface ISupplier {
  id: string
  image: string
  imageId: string
  name: string,
  index: number
}

export interface IClient {
  id: string
  image: string
  imageId: string
  name: string
  index: number
}

export interface IAboutUs_History_Banners {
  id: string
  image: string
  description: string
}

export interface IAboutUs_History {
  title: string
  text: string
  enable: boolean 
}

export interface IAboutUs_Banners {
  id: string
  image: string
  imageId: string
}

export interface IPostImage {
  link: string
  file_name: string
}

export interface IAboutUs_History {
  title: string
  text: string
}

export interface IAboutUs_Team {
  title: string
  text: string
  image: string
  imageId: string
  enable: boolean
}

export interface IAboutUs_Values {
  id: string
  image: string
  imageId: string
  title: string
  text: string
}

export interface ISuppliers_Screen {
  id: string
  image: string
  imageId: string
  title: string
  text: string
  secound_title: string
}

export interface IContact {
  link: string
}

export interface IContactEmail {
  email: string
}

export interface IUsers {
  id: string
  email: string
  userName: string
  password: string
}

export interface IHomeProductsList {
  id: string,
  name: string
}

export interface IHomeProduct {
  title: string
  image: string
  imageId: string
  button_text: string
  button_link: string
}

export interface IPrivacyPolicy {
  title: string
  text: string
}

export interface ILogos {
  logoColorId: string
  logoColor: string
  logoWhiteId: string
  logoWhite: string

}
export interface IProductsBanners {
  faviritFirst: string
  faviritFirstId: string
  faviritSecound: string
  faviritSecoundId: string
  faviritFirstMobile: string
  faviritFirstMobileId: string
  faviritSecoundMobile: string
  faviritSecoundMobileId: string
  detailsFirst: string
  detailsFirstId: string
  detailsSecound: string
  detailsSecoundId: string
}

export interface ICatalog {
  link: string
  fileName: string
}


export interface IAddress {
  link: string
  address: string
}