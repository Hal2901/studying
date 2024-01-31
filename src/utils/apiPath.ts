export const apiPath = {
    banners: "banners",
    solutions: "solutions",
    solution_categories: "solution-categories",
    product_categories: "product-categories",
    products: "products",
    guarantee: "guarantee",
    uploadImages: "upload-image",
    uploadFile:"upload-file",
    uploadVideo:"upload-video",
    topics: "topics",
    partners: "partners", // yeu cau tro thanh doi tac
    contacts: "contacts",
    partnerCompany: "partner-company",
}
export const serviceApp = {
    upload: "upload",
    core: "core-ls"
}
export const getPathOfService = (service:string, pathname: string, isAdmin?:boolean) => {
    if(isAdmin) return `${service}/api/admin/${pathname}`
    return `${service}/api/${pathname}`
}