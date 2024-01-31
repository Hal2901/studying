export type topicType =
  | 'DOC'
  | 'NEWS'
  | 'STUDY'
  | 'TRAINING'
  | 'VIDEO'
  | 'CERTIFICATE'
  | 'POLICY'
  | 'DOC'
  | 'PRODUCT'
  | 'INTRODUCE'
  | 'HISTORY'
  | 'EMPLOYEE'
  | 'SPORT_TOURNAMENT';
export type generalPageType = 'SOLUTION' | 'PRODUCT' | 'VIDEO' | 'NEWS';

export type initialTypeTopic = {
  id?: number | null;
  link?: string;
  title: string;
  videoLink1?: string;
  videoLink2?: string;
  description?: string;
  content?: string;
  file?: string;
  createdDate?: string;
};

export type topicsData = {
  total: number;
  data: initialTypeTopic[];
};
