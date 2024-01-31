export interface CategoryParent {
  id?: number
  link: string,
  title: string,
  description: string;
  children: {
    id?: number
    title: string,
      children?: {
        id?:number,
        title: string
      }[];
    }[];
  }
  

  export type CategorySolution = {
      id?: number
      link: string,
      title: string,
      description: string,
      children:  {
        id?:number,
        title: string
      }[]
    }

  export  interface PrCategory {
      id: number;
      link: string;
      title: string;
      description: string;
      children: {
        id: number;
        title: string;
        products: {
          id: number;
          nameProduct: string;
        }[];
      }[];
    }
export type PrCategoryRes = {
  total: number,
  data : PrCategory[]
}
export type categoriesData = {
  total: number,
  data : CategorySolution[]
}
