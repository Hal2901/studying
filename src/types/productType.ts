export interface productType {
    id?: number, 
    title: string,
    description: string,
    imageLink: string,
    price: number
}
export interface productSupportsType {
    id?:number,
    title: string,
    pathLink: string
}
export interface productKeys {
    id?:number,
    name: string,
    filter: boolean
}
export interface productSpecDetails {
    id?:number,
    nameSpec: string,
    value1: string,
    value2: string
}
export interface productSpecs {
    id?:number,
    nameSpec: string,
    column1: string,
    column2: string,
    column3: string,
    productSpecDetails: productSpecDetails[]
}
export interface productFilter {
    id: number,
    name: string,
    list:  {
        value: string
      }[]
}
export interface listProductVarian {
        id?: number,
        idProduct?:number,
        price?: number,
        productValues:{
            id?: number,
            value: string,
            keys?: productKeys
          }[]
}

export interface baseInfo{
    id?:number,
    link: string,
    nameProduct: string,
    infoProduct: string,
    price: string,
    status: boolean,
    linkFile1: string,
    linkPath1: string,
    linkFile2: string,
    linkPath2: string,
    linkFile3: string,
    linkPath3: string,
    linkFile4: string,
    linkPath4: string,
    categories: {
        id: number
    },
    companies: {
        id: number
    }[],
    productImages: {
        id?:number,
        link: string,
    }[],
    productKeys: productKeys[],
    productVariants: listProductVarian[]
    createdDate?: string
}
export interface productTypeRoot extends baseInfo {
    productSupports:productSupportsType[],
    productSpecs: productSpecs[],
 }
 export interface listProductVarianRes {
    total: number,
    data: listProductVarian[]
}


 export interface PrdRes {
    total: number,
    data: productTypeRoot[]
 }