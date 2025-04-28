export interface IGroup {
  id: string
  group_name: string
  active: boolean
  index: number
}

export interface IProduct {
  id: string 
  productsGroupsId: string 
  image: string 
  imageId: string 
  name: string 
  summary: string 
  description: string 
  whatsapp: string 
  route: string 
  link: string
  index: number
}

export interface IInterfaceProducts {
  id: string
  group_name: string
  products_list: IProduct[]
}

export interface ISupplier {
  id: string
  image: string
  name: string,
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

export interface ICatalog {
  link: string
  fileName: string
}