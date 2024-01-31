export interface ContactType {
  id?: number | string;
  fullname: string;
  phone: string;
  email: string;
  address: string;
  content: string;

  feedback?: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export interface ContactTypeRes {
  data: ContactType[];
  total: number;
}
