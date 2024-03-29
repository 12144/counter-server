

export enum PlatformReportID {
  PR = 'PR',
  PR_P1 = 'PR_P1',
}

export enum DatabaseReportID {
  DR = 'DR',
  DR_D1 = 'DR_D1',
  DR_D2 = 'DR_D2'
}

export enum TitleReportID {
  TR = 'TR',
  TR_B1 = 'TR_B1',
  TR_B2 = 'TR_B2',
  TR_B3 = 'TR_B3'
}

export enum ItemReportID {
  IR = 'IR',
  IR_A1 = 'IR_A1',
  IR_M1 = 'IR_M1',
}

export enum ReportID {
  PR = 'PR',
  PR_P1 = 'PR_P1',
  DR = 'DR',
  DR_D1 = 'DR_D1',
  DR_D2 = 'DR_D2',
  TR = 'TR',
  TR_B1 = 'TR_B1',
  TR_B2 = 'TR_B2',
  TR_B3 = 'TR_B3',
  IR = 'IR',
  IR_A1 = 'IR_A1',
  IR_M1 = 'IR_M1',
}

export type TypeValue = {
  Type: string;
  Value: string;
};

export type NameValue = {
  Name: string;
  Value: string | number | boolean;
};

export type Exception = {
  Code: number;
  Severity: string;
  Message: string;
  Help_URL: string;
  Data: string;
};

export type ReportHeader = {
  Created?: string;
  Created_By?: string;
  Customer_ID?: string;
  Report_ID?: string;
  Release?: string;
  Report_Name?: string;
  Institution_Name?: string;
  Institution_ID?: TypeValue[];
  Report_Filters?: NameValue[];
  Report_Attributes?: NameValue[];
  Exceptions?: Exception[]
};

export enum ReportFilters {
  Access_Method = 'Access_Method',
  Access_Type = 'Access_Type',
  Begin_Date = 'Begin_Date',
  End_Date = 'End_Date',
  Database = 'Database',
  Data_Type = 'Data_Type',
  Item_Contributor = 'Item_Contributor',
  Item_ID = 'Item_ID',
  Metric_Type = 'Metric_Type',
  Platform = 'Platform',
  Section_Type = 'Section_Type',
  YOP = 'YOP'
}

export enum ReportAttributes {
  Attributes_To_Show = 'Attributes_To_Show',
  Granularity = 'Granularity',
  Include_Component_Details = 'Include_Component_Details',
  Include_Parent_Details = 'Include_Parent_Details'
}

export enum Granularity {
  MONTH = 'Month',
  TOTAL = 'Total'
}

export enum MetricType {
  Total_Item_Investigations = 'Total_Item_Investigations',
  Unique_Item_Investigations = 'Unique_Item_Investigations',
  Unique_Title_Investigations = 'Unique_Title_Investigations',
  Total_Item_Requests = 'Total_Item_Requests',
  Unique_Item_Requests = 'Unique_Item_Requests',
  Unique_Title_Requests = 'Unique_Title_Requests',
  No_License = 'No_License',
  Limit_Exceeded = 'Limit_Exceeded',
  Searches_Platform = 'Searches_Platform',
  Searches_Regular = 'Searches_Regular',
  Searches_Automated = 'Searches_Automated',
  Searches_Federated = 'Searches_Federated'
}

export const Metric_Type_Fields = [
  'total_item_investigations',
  'unique_item_investigations',
  'unique_title_investigations',
  'total_item_requests',
  'unique_item_requests',
  'unique_title_requests',
  'no_license',
  'limit_exceeded',
  'searches_platform',
  'searches_regular',
  'searches_automated',
  'searches_federated',
];

export const Metric_Type_Map = {
  total_item_investigations: 'Total_Item_Investigations',
  unique_item_investigations: 'Unique_Item_Investigations',
  unique_title_investigations: 'Unique_Title_Investigations',
  total_item_requests: 'Total_Item_Requests',
  unique_item_requests: 'Unique_Item_Requests',
  unique_title_requests: 'Unique_Title_Requests',
  no_license: 'No_License',
  limit_exceeded: 'Limit_Exceeded',
  searches_platform: 'Searches_Platform',
  searches_regular: 'Searches_Regular',
  searches_automated: 'Searches_Automated',
  searches_federated: 'Searches_Federated',
};

export const Item_ID_Fields = [
  'doi',
  'id',
  'isbn',
  'print_issn',
  'online_issn',
  'uri',
];

export const Item_ID_Map = {
  doi: 'DOI',
  id: 'Proprietary_ID',
  isbn: 'ISBN',
  print_issn: 'Print_ISSN',
  online_issn: 'Online_ISSN',
  uri: 'URI',
};

export const AttributesToShow = {
  data_type: 'data_type',
  access_method: 'access_method',
  section_type: 'section_type',
  yop: 'yop',
  access_type: 'access_type',
  authors: 'authors',
  publication_date: 'publication_date',
  article_version: 'article_version',
};

export const Access_Type_Fields = [
  'controlled',
  'oa_gold',
  'oa_delayed',
  'other_free_to_read',
];

export const Section_Type_Fields = [
  'article',
  'book',
  'chapter',
  'other',
  'section',
];

export const Data_Type_Fields = [
  'article',
  'book',
  'book_segment',
  'database',
  'dataset',
  'journal',
  'multimedia',
  'newspaper_or_newsletter',
  'ohter',
  'platform',
  'report',
  'repository_item',
  'thesis_or_dissertation',
];

export const Access_Method_Fields = [
  'regular',
  'tdm',
];

export const Granularity_Fields = [
  'month',
  'total',
];

export const Attributes_To_Show_Fields = [
  'data_type',
  'access_method',
  'section_type',
  'yop',
  'access_type',
  'authors',
  'publication_date',
  'article_version',
];
