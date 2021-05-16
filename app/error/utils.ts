import {
  Access_Method_Fields,
  Access_Type_Fields,
  Attributes_To_Show_Fields,
  Data_Type_Fields,
  Granularity_Fields,
  Metric_Type_Fields,
  ReportAttributes,
  ReportFilters,
  Section_Type_Fields,
} from '../service/type';
import { Serverity } from './type';

// 检测起始日期是不是月的第一天
export function checkBeginDate(_rule:any, value:any) {
  try {
    const date = new Date(value);
    if (date.getDate() !== 1) {
      throw new Error();
    }
  } catch (err) {
    return `invalid ${ReportFilters.Begin_Date} value`;
  }
}
// 检测结束日期是不是月的最后一天
export function checkEndDate(_rule:any, value:any) {
  try {
    const date = new Date(value);
    const afterday = new Date(date.getTime() + 1000 * 60 * 60 * 24);
    if (afterday.getDate() !== 1) {
      throw new Error();
    }
  } catch (err) {
    return `invalid ${ReportFilters.End_Date} value`;
  }
}

export function checkMetricType(_rule:any, value:any) {
  const list: string[] = value.split('|');
  for (const item of list) {
    if (Metric_Type_Fields.indexOf(item.toLowerCase()) === -1) {
      return `invalid ${ReportFilters.Metric_Type} value`;
    }
  }
}

export function checkAccessType(_rule:any, value:any) {
  const list: string[] = value.split('|');
  for (const item of list) {
    if (Access_Type_Fields.indexOf(item.toLowerCase()) === -1) {
      return `invalid ${ReportFilters.Access_Type} value`;
    }
  }
}

export function checkSectionType(_rule:any, value:any) {
  const list: string[] = value.split('|');
  for (const item of list) {
    if (Section_Type_Fields.indexOf(item.toLowerCase()) === -1) {
      return `invalid ${ReportFilters.Section_Type} value`;
    }
  }
}

export function checkDataType(_rule:any, value:any) {
  const list: string[] = value.split('|');
  for (const item of list) {
    if (Data_Type_Fields.indexOf(item.toLowerCase()) === -1) {
      return `invalid ${ReportFilters.Data_Type} value`;
    }
  }
}

export function checkAccessMethod(_rule:any, value:any) {
  const list: string[] = value.split('|');
  for (const item of list) {
    if (Access_Method_Fields.indexOf(item.toLowerCase()) === -1) {
      return `invalid ${ReportFilters.Access_Method} value`;
    }
  }
}

export function checkGranularity(_rule:any, value:any) {
  if (Granularity_Fields.indexOf(value.toLowerCase()) === -1) {
    return `invalid ${ReportAttributes.Granularity} value`;
  }
}

export function checkYOP(_rule:any, value:any) {
  const yop = Number(value);
  if (isNaN(yop) || (yop < 1 || yop > 9999)) {
    return `invalid ${ReportFilters.YOP} value`;
  }
}

export function checkIncludeParentDetails(_rule:any, value:any) {
  console.log(typeof value, value);
  if (value !== '1' && value !== '0') {
    return `invalid ${ReportAttributes.Include_Parent_Details}`;
  }
}

export function checkIncludeComponentDetails(_rule:any, value:any) {
  if (value !== '1' && value !== '0') {
    return `invalid ${ReportAttributes.Include_Component_Details}`;
  }
}

export function checkAttributesToShow(_rule:any, value:any) {
  const list: string[] = value.split('|');
  for (const item of list) {
    if (Attributes_To_Show_Fields.indexOf(item.toLowerCase()) === -1) {
      return `invalid ${ReportAttributes.Attributes_To_Show} value`;
    }
  }
}

export const ExceptionCreator = {
  Invalid_ReportAttribute_Value(attr: string, serverity = Serverity.Warning, data = '') {
    return {
      Code: 3062,
      Serverity: serverity,
      Message: `Attribute ${attr} is invalid.`,
      Data: data,
      Help_URL: 'https://app.swaggerhub.com/apis/COUNTER/counter-sushi_5_0_api/1.0.0',
    };
  },
  Required_ReportAttribute_Missing(attr: string, serverity = Serverity.Warning, data = '') {
    return {
      Code: 3071,
      Serverity: serverity,
      Message: `Attribute ${attr} is required.`,
      Data: data,
      Help_URL: 'https://app.swaggerhub.com/apis/COUNTER/counter-sushi_5_0_api/1.0.0',
    };
  },
  Invalid_ReportFilter_Value(filter: string, serverity = Serverity.Warning, data = '') {
    return {
      Code: 3060,
      Serverity: serverity,
      Message: `Filter ${filter} is invalid`,
      Data: data,
      Help_URL: 'https://app.swaggerhub.com/apis/COUNTER/counter-sushi_5_0_api/1.0.0',
    };
  },
};

