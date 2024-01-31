export type TypeBanner ={
       id: number,
       imageLink: string,
       type:"IMAGE"
}
export type ResultBanner = {
    data: TypeBanner[],
    total: number
}