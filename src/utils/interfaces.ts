export interface IGroup {
  id: string
  group_name: string
}

export interface ISupplier {
  id: string
  image: string
  imageId: string
  name: string
}

export interface IClient {
  id: string
  image: string
  imageId: string
  name: string
}

export interface IAboutUs_History_Banners {
  id: string
  image: string
  description: string
}

export interface IAboutUs_History {
  title: string
  text: string
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