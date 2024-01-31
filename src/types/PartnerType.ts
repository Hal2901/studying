export interface PartnerTypeRes {
    data: PartnerType[],
    total: number
}
export interface PartnerCompanyRes {
    data: PartnerCompanyType[]
    total: number
}


export interface PartnerCompanyType {
    id?: number | string
    distributor: string
    vat: string
    link: string
    email: string
    phone: string
    map: string
    nation: string,
    city: string,
    namePartner: string
    address: string
    nameContact: string
}

export interface PartnerType {
    id?: number | string
    feedback: string
    company: {
        nameCompany: string
        representative: string
        web: string
        nation: string
        city: string
        address: string
    }
    person: {
        namePerson: string
        phone: string
        fax: string
        email: string
        position: string
        part: string
    }
}

export interface PartnerTypeMock {
    id: number | string  
    distributor: string
    fullName: string
    address: string
    taxNumber: string 
    contactPerson: string
    phoneNumber: string 
    email: string
    imageLink: string
    mapLink: string
}

export interface PartnerCompanies  {
   id?:number,
   lsi:string,
   vat:string,
   link:string,
   email:string,
   phone:string,
   map:string,
   namePartner:string,
   address:string,
   nameContact:string
  }

  export interface PartnerCompaniesRes {
    data: PartnerCompanies[],
    total: number
}