import { Service } from 'egg';
import { NameValue, ReportHeader } from './type';

export type TitleReportOption = {
  customer_id: string;
  begin_date: string;
  end_date: string;
  platform: string;
  item_id?: string;
  metric_type?: string;
  data_type?: string;
  section_type?: string;
  yop?: number;
  access_type?: string;
  access_method?: string;
  attributes_to_show?: string;
  granularity?: string
};

const ReportName = {
  TR: 'Title Master Report',
  TR_B1: 'Book Requests (Excluding OA_Gold)',
  TR_B2: 'Book Access Denied',
  TR_B3: 'Book Usage by Access Type',
};

enum TitleReportID {
  TR = 'TR',
  TR_B1 = 'TR_B1',
  TR_B2 = 'TR_B2',
  TR_B3 = 'TR_B3'
}

enum Granularity {
  MONTH = 'Month',
  TOTAL = 'Total'
}

const Item_ID_Fields = [ 'doi', 'proprietary_id', 'isbn', 'print_issn', 'online_issn', 'uri' ];
const Item_ID_Map = {
  doi: 'DOI',
  proprietary_id: 'Proprietary_ID',
  isbn: 'ISBN',
  print_issn: 'Print_ISSN',
  online_issn: 'Online_ISSN',
  uri: 'URI',
};

const Metric_Type_Fields = [
  'total_item_investigations',
  ' unique_item_investigations',
  'unique_title_investigations',
  'total_item_requests',
  'unique_item_requests',
  'unique_title_requests',
  'no_license',
  'limit_exceeded',
];
const Metric_Type_Map = {
  total_item_investigations: 'Total_Item_Investigations',
  unique_item_investigations: 'Unique_Item_Investigations',
  unique_title_investigations: 'Unique_Title_Investigations',
  total_item_requests: 'Total_Item_Requests',
  unique_item_requests: 'Unique_Item_Requests',
  unique_title_requests: 'Unique_Title_Requests',
  no_license: 'No_License',
  limit_exceeded: 'Limit_Exceeded',
};

export default class TitleReport extends Service {
  // 获取TR
  public async tr(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR);
    const reportItems = await this.getReportItems(option, TitleReportID.TR);
    return {
      Report_Header: reportHeader,
      Report_Items: this.formatReportItems(reportItems, option),
    };
  }
  //   获取TR_B1
  public async tr_b1(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR_B1);
    const reportItems = await this.getReportItems(option, TitleReportID.TR_B1);
    return {
      Report_Header: reportHeader,
      Report_Items: this.formatReportItems(reportItems, option),
    };
  }
  //   获取TR_B2
  public async tr_b2(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR_B2);
    const reportItems = await this.getReportItems(option, TitleReportID.TR_B2);
    return {
      Report_Header: reportHeader,
      Report_Items: this.formatReportItems(reportItems, option),
    };
  }
  //   获取TR_B3
  public async tr_b3(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR_B3);
    const reportItems = await this.getReportItems(option, TitleReportID.TR_B3);
    return {
      Report_Header: reportHeader,
      Report_Items: this.formatReportItems(reportItems, option),
    };
  }
  // 获取报告头
  getReportHeader(option: TitleReportOption, reportID: TitleReportID) {
    const now = new Date();
    const reportHeader:ReportHeader = {
      Created: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}Z`,
      Customer_ID: option.customer_id,
      Report_ID: reportID,
      Release: '5',
      Report_Name: ReportName[reportID],
    };

    // 根据customer_id来生成created_by, institution_name, institution_id

    // 生成report_filters
    const Report_Filters: NameValue[] = [];

    Report_Filters.push({
      Name: 'Begin_Date',
      Value: option.begin_date,
    });
    Report_Filters.push({
      Name: 'End_Date',
      Value: option.end_date,
    });

    if (reportID === TitleReportID.TR) {
      Report_Filters.push({
        Name: 'Metric_Type',
        Value: option.metric_type || 'all',
      });

      option.platform && Report_Filters.push({
        Name: 'Platform',
        Value: option.platform,
      });

      Report_Filters.push({
        Name: 'Data_Type',
        Value: option.data_type || 'all',
      });

      Report_Filters.push({
        Name: 'Section_Type',
        Value: option.section_type || 'all',
      });

      Report_Filters.push({
        Name: 'YOP',
        Value: option.yop || 'all',
      });

      Report_Filters.push({
        Name: 'Access_Type',
        Value: option.access_type || 'all',
      });

      Report_Filters.push({
        Name: 'Access_Method',
        Value: option.access_method || 'all',
      });
    } else if (reportID === TitleReportID.TR_B1) {
      Report_Filters.push({
        Name: 'Data_Type',
        Value: 'Book',
      });

      Report_Filters.push({
        Name: 'Access_Type',
        Value: 'Controlled',
      });

      Report_Filters.push({
        Name: 'Access_Method',
        Value: 'Regular',
      });
    } else {
      Report_Filters.push({
        Name: 'Data_Type',
        Value: 'Book',
      });

      Report_Filters.push({
        Name: 'Access_Method',
        Value: 'Regular',
      });
    }

    reportHeader.Report_Filters = Report_Filters;
    // 生成report_attributes
    if (reportID === TitleReportID.TR) {
      const Report_Attributes: NameValue[] = [];

      option.attributes_to_show && Report_Attributes.push({
        Name: 'Attributes_To_Show',
        Value: option.attributes_to_show,
      });

      Report_Attributes.push({
        Name: 'Granularity',
        Value: option.granularity || 'Month',
      });

      reportHeader.Report_Attributes = Report_Attributes;
    }

    // exceptions根据实际生成中产生的异常最后生成
    return reportHeader;
  }
  // 获取报告项
  async getReportItems(option: TitleReportOption, reportID: TitleReportID) {
    if (reportID === TitleReportID.TR) {
      return await this.getTRReportItems(option);
    } else if (reportID === TitleReportID.TR_B1) {
      return await this.getTRB1ReportItems(option);
    } else if (reportID === TitleReportID.TR_B2) {
      return await this.getTRB2ReportItems(option);
    }
    return await this.getTRB3ReportItems(option);
  }

  async getTRReportItems(option: TitleReportOption) {
    const resultWithSectionType = await this.getTRReportItemsWithSectionType(option);
    const resultWithoutSectionType = option.section_type ? [] : await this.getTRReportItemsWithoutSectionType(option);
    return resultWithSectionType.concat(resultWithoutSectionType);
  }

  async getTRReportItemsWithSectionType(option: TitleReportOption) {
    const mysql = this.app.mysql;
    const granularity = option.granularity || 'Month';

    const attributes_to_show_arr = (option.attributes_to_show ? option.attributes_to_show.split('|') : []).map(str => str.toLocaleLowerCase());

    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      'Unique_Item_Requests',
      'Unique_Item_Investigations',
      'Total_Item_Requests',
      'Total_Item_Investigations',
      'No_License',
      'Limit_Exceeded',
    ]).filter(str => str !== 'Unique_Title_Requests' && str !== 'Unique_Title_Investigations')
      .map(str => str.toLocaleLowerCase());

    const columns = [ 'item as title', 'doi', 'id as proprietary_id', 'isbn', 'print_issn', 'online_issn', 'uri', 'platform', 'publisher', 'publisher_id', 'section_type', 'unique_item_requests', 'unique_item_investigations' ].concat(attributes_to_show_arr).concat(metric_type_arr);

    if (granularity === Granularity.MONTH) { columns.push('month'); }

    const query = `
    select
    ${columns.join(',')}
    from Counter.Item, ${granularity === Granularity.MONTH ?
    'Counter.Item_Metric' :
    `(
        select
        item_id, ${metric_type_arr.map(str => `sum(${str})`).join(',')}
        from Counter.Item_Metric
        where month >= '${option.begin_date}' and month < '${option.end_date}'
        group by item_id
      ) as I`
}
    where
    Counter.Item.id = ${granularity === Granularity.MONTH ? 'Counter.Item_Metric' : 'I'}.item_id
    ${option.platform ? `and platform = '${option.platform}'` : ''}
    ${option.data_type ? `and data_type = '${option.data_type}'` : ''}
    ${option.section_type ? `and section_type = '${option.section_type}'` : ''}
    ${option.yop ? `and yop = '${option.yop}'` : ''}
    ${option.access_type ? `and access_type = '${option.access_type}'` : ''}
    ${option.access_method ? `and access_method = '${option.access_method}'` : ''}
    ${option.item_id ? `and id = '${option.item_id}'` : ''}
    `;
    const result = await mysql.query(query);
    return result;
  }

  async getTRReportItemsWithoutSectionType(option: TitleReportOption) {
    const mysql = this.app.mysql;
    const granularity = option.granularity || 'Month';

    const attributes_to_show_arr = (option.attributes_to_show ? option.attributes_to_show.split('|') : []).map(str => str.toLocaleLowerCase());

    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      'Unique_Title_Requests',
      'Unique_Title_Investigations',
    ]).filter(str => str === 'Unique_Title_Requests' || str === 'Unique_Title_Investigations')
      .map(str => str.toLocaleLowerCase());

    const columns = [ 'title', 'doi', 'id as proprietary_id', 'isbn', 'print_issn', 'online_issn', 'uri', 'platform', 'publisher', 'publisher_id' ].concat(attributes_to_show_arr).concat(metric_type_arr);

    if (granularity === Granularity.MONTH) { columns.push('month'); }

    const query = `
    select
    ${columns.join(',')}
    from Counter.Title, ${granularity === Granularity.MONTH ?
    'Counter.Title_Metric' :
    `(
        select
        item_id, ${metric_type_arr.map(str => `sum(${str})`).join(',')}
        from Counter.Title_Metric
        where  month >= '${option.begin_date}' and month < '${option.end_date}'
        group by title_id
      ) as T`
}
    where
    Counter.Title.id = ${granularity === Granularity.MONTH ? 'Counter.Title_Metric' : 'T'}.title_id
    ${option.platform ? `and platform = '${option.platform}'` : ''}
    ${option.data_type ? `and data_type = '${option.data_type}'` : ''}
    ${option.yop ? `and yop = '${option.yop}'` : ''}
    ${option.access_type ? `and access_type = '${option.access_type}'` : ''}
    ${option.access_method ? `and access_method = '${option.access_method}'` : ''}
    `;

    const result = await mysql.query(query);
    return result;
  }

  async getTRB1ReportItems(option: TitleReportOption) {
    const mysql = this.app.mysql;
    const query = `
    select
    title,
    doi,
    id as proprietary_id,
    isbn,
    print_issn,
    online_issn,
    uri,
    platform,
    publisher,
    publisher_id,
    yop,
    month,
    total_item_requests,
    unique_title_requests
    from Counter.Title, Counter.Title_Metric
    where
    Counter.Title.id = Counter.Title_Metric.title_id
    and month >= '${option.begin_date}' and month < '${option.end_date}'
    ${option.platform ? `and platform = ${option.platform}` : ''}
    and data_type = 'book'
    and access_type = 'Controlled'
    and access_method = 'Regular';
  `;
    const result = await mysql.query(query);
    return result;
  }

  async getTRB2ReportItems(option: TitleReportOption) {
    const mysql = this.app.mysql;
    const query = `
    select
    title,
    doi,
    id as proprietary_id,
    isbn,
    print_issn,
    online_issn,
    uri,
    platform,
    publisher,
    publisher_id,
    yop,
    month,
    limit_exceeded,
    no_license
    from Counter.Title, Counter.Title_Metric
    where
    Counter.Title.id = Counter.Title_Metric.title_id
    and month >= '${option.begin_date}' and month < '${option.end_date}'
    ${option.platform ? `and platform = ${option.platform}` : ''}
    and data_type = 'book'
    and access_method = 'Regular';
  `;
    const result = await mysql.query(query);
    return result;
  }

  async getTRB3ReportItems(option: TitleReportOption) {
    const mysql = this.app.mysql;
    const query = `
    select
    title,
    doi,
    id as proprietary_id,
    isbn,
    print_issn,
    online_issn,
    uri,
    platform,
    publisher,
    publisher_id,
    access_type,
    yop,
    month,
    total_item_investigations,
    unique_item_investigations,
    unique_title_investigations,
    total_item_requests,
    unique_item_requests,
    unique_title_requests
    from Counter.Title, Counter.Title_Metric
    where
    Counter.Title.id = Counter.Title_Metric.title_id
    and month >= '${option.begin_date}' and month < '${option.end_date}'
    ${option.platform ? `and platform = ${option.platform}` : ''}
    and data_type = 'book'
    and access_method = 'Regular';
  `;
    const result = await mysql.query(query);
    return result;
  }
  // 格式转换
  formatReportItems(items: any[], option: TitleReportOption) {
    const titleMap = new Map();

    items.forEach(item => {
      const key = item.proprietary_id + item.title;
      if (titleMap.has(key) === false) {
        const formattedItem: any = {
          Title: item.title,
          Item_ID: Item_ID_Fields.filter(field => item[field]).map(field => ({
            Type: Item_ID_Map[field],
            Value: item[field],
          })),
          Platform: item.platform,
          Publisher: item.publisher,
          Publisher_ID: item.publisher_id.split('; ').map(item => {
            const arr = item.split(':');
            return {
              Type: arr[0],
              Value: arr[1],
            };
          }),
          Performance: [],
        };

        item.data_type && (formattedItem.Data_Type = item.data_type);
        item.section_type && (formattedItem.Section_Type = item.section_type);
        item.yop && (formattedItem.YOP = item.yop);
        item.access_type && (formattedItem.Access_Type = item.access_type);
        item.access_method && (formattedItem.Access_Method = item.access_method);
        titleMap.set(key, formattedItem);
      }

      const Period = {
        Begin_Date: '',
        End_Date: '',
      };

      if (item.month) {
        const begin_date = new Date(item.month);
        const end_date = new Date(begin_date.getFullYear(), begin_date.getMonth() + 1, 0);
        Period.Begin_Date = `${begin_date.getFullYear()}-${begin_date.getMonth() + 1}-${begin_date.getDate()}`;
        Period.End_Date = `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`;
      } else {
        Period.Begin_Date = option.begin_date;
        Period.End_Date = option.end_date;
      }

      const Instance = Metric_Type_Fields.filter(field => item[field]).map(field => ({
        Metric_Type: Metric_Type_Map[field],
        Count: item[field],
      }));

      titleMap.get(key).Performance.push({ Period, Instance });
    });

    return Array.from(titleMap.values());
  }
}
