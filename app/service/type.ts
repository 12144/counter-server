export type TypeValue = {
  Type: string;
  Value: string;
};

export type NameValue = {
  Name: string;
  Value: string | number;
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
