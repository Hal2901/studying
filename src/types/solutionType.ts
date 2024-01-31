export interface solutionType {
    id?: number,
    idCategory: number,
    link: string,
    title: string,
    description: string,
    content: string,
    createdDate?: string
    active?:boolean,

}

export type solutionsData = {
  total: number,
  data : solutionType[]
}
