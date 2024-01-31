
export interface ContactRequestType {
    id?: number;
    name: string;
    imageLink: string;
    description: string;
    categoryChild: {
      id?: number;
      name: string;
      categoryChild?: {
        id?: number;
        name: string;
      }[];
    }[];
  }