export interface WarrantyTypeRes {
  data: WarrantyType[];
  total: number;
}

export interface WarrantyType {
  id?: number | string;
  code: string;
  startDate: string; // startTime
  endDate: string;
  nameCompany: string; // installation company
  fullname: string; // investorName
  address: string;
  namePackage: string;
  codeLSI: string;
  vatLSI: string; // tax number

  nameLSI: string; // ???

  numDistributor: string; // orderNumber
  dateDistributor: string; // orderDate
  nameDistributor: string;

  // endTime: string
  // projectName: string
}
export interface WarrantyTypeMock {
  warrantyNumber: string;
  startTime: string;
  endTime: string;
  projectName: string;
  investorName: string;
  address: string;
  package: string;
  lsiNumber: string;
  installationCompany: string;
  taxNumber: string;
  supplierName: string;
  orderNumber: string;
  orderDate: string;
}
