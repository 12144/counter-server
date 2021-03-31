import { Service } from 'egg';
import {
  Granularity,
  NameValue,
  ReportHeader,
  ReportFilters,
  MetricType,
  TitleReportID,
  ReportID,
  AttributesToShow,
  ReportAttributes,
} from './type';
import {
  formatReportItems,
  parseAttributesToShow,
  parseItemID,
} from './util';

export type TitleReportOption = {
  customer_id: string;
  begin_date: string;
  end_date: string;
  platform?: string;
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

export default class TitleReport extends Service {
  public async tr(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR);
    const reportItems = await this.getReportItems(option, TitleReportID.TR);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.TR),
    };
  }

  public async tr_b1(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR_B1);
    const reportItems = await this.getReportItems(option, TitleReportID.TR_B1);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.TR),
    };
  }

  public async tr_b2(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR_B2);
    const reportItems = await this.getReportItems(option, TitleReportID.TR_B2);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.TR),
    };
  }

  public async tr_b3(option: TitleReportOption) {
    const reportHeader = this.getReportHeader(option, TitleReportID.TR_B3);
    const reportItems = await this.getReportItems(option, TitleReportID.TR_B3);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.TR),
    };
  }
  // 获取报告头
  getReportHeader(option: TitleReportOption, reportID: TitleReportID) {
    const now = new Date();
    const reportHeader:ReportHeader = {
      Created: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}Z`,
      Created_By: '',
      Customer_ID: option.customer_id,
      Report_ID: reportID,
      Release: '5',
      Report_Name: ReportName[reportID],
    };

    // 根据customer_id来生成created_by, institution_name, institution_id
    reportHeader.Institution_Name = '';
    reportHeader.Institution_ID = [];

    // 生成report_filters
    const Report_Filters: NameValue[] = [];

    Report_Filters.push({
      Name: ReportFilters.Begin_Date,
      Value: option.begin_date,
    });
    Report_Filters.push({
      Name: ReportFilters.End_Date,
      Value: option.end_date,
    });
    option.platform && Report_Filters.push({
      Name: ReportFilters.Platform,
      Value: option.platform,
    });

    if (reportID === TitleReportID.TR) {
      Report_Filters.push({
        Name: ReportFilters.Metric_Type,
        Value: option.metric_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Data_Type,
        Value: option.data_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Section_Type,
        Value: option.section_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.YOP,
        Value: option.yop || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Access_Type,
        Value: option.access_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Access_Method,
        Value: option.access_method || 'all',
      });

      option.item_id && Report_Filters.push({
        Name: ReportFilters.Item_ID,
        Value: option.item_id,
      });
    } else if (reportID === TitleReportID.TR_B1) {
      Report_Filters.push({
        Name: ReportFilters.Data_Type,
        Value: 'Book',
      });

      Report_Filters.push({
        Name: ReportFilters.Access_Type,
        Value: 'Controlled',
      });

      Report_Filters.push({
        Name: ReportFilters.Access_Method,
        Value: 'Regular',
      });

      Report_Filters.push({
        Name: ReportFilters.Metric_Type,
        Value: 'Total_Item_Requests|Unique_Title_Requests',
      });
    } else {
      Report_Filters.push({
        Name: ReportFilters.Data_Type,
        Value: 'Book',
      });

      Report_Filters.push({
        Name: ReportFilters.Access_Method,
        Value: 'Regular',
      });
      if (reportID === TitleReportID.TR_B2) {
        Report_Filters.push({
          Name: ReportFilters.Metric_Type,
          Value: 'Limit_Exceeded|No_License',
        });
      } else {
        Report_Filters.push({
          Name: ReportFilters.Metric_Type,
          Value: 'Total_Item_Investigations|Total_Item_Requests|Unique_Item_Investigations|Unique_Item_Requests|Unique_Title_Investigations|Unique_Title_Requests',
        });
      }
    }
    reportHeader.Report_Filters = Report_Filters;

    // 生成report_attributes
    if (reportID === TitleReportID.TR) {
      const Report_Attributes: NameValue[] = [];

      option.attributes_to_show && Report_Attributes.push({
        Name: ReportAttributes.Attributes_To_Show,
        Value: option.attributes_to_show,
      });

      Report_Attributes.push({
        Name: ReportAttributes.Granularity,
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
    const item_ids = parseItemID(option.item_id!);
    const attributes_to_show_arr = parseAttributesToShow(option.attributes_to_show!, ReportID.TR);

    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      MetricType.Unique_Item_Requests,
      MetricType.Unique_Item_Investigations,
      MetricType.Total_Item_Investigations,
      MetricType.Total_Item_Requests,
      MetricType.No_License,
      MetricType.Limit_Exceeded,
    ]).filter(str => str !== MetricType.Unique_Title_Requests && str !== MetricType.Unique_Title_Investigations)
      .map(str => str.toLocaleLowerCase());

    const columns = [ 'item as title', 'doi', 'id', 'isbn', 'print_issn', 'online_issn', 'uri', 'platform', 'publisher', 'publisher_id', 'section_type' ].concat(attributes_to_show_arr).concat(metric_type_arr);

    if (granularity === Granularity.MONTH) { columns.push('month'); }

    const query = `
    select
    ${columns.join(',')}
    from Counter.Item, ${granularity === Granularity.MONTH ?
    'Counter.Item_Metric' :
    `(
        select
        item_id, access_method, ${metric_type_arr.map(str => `sum(${str}) as ${str}`).join(',')}
        from Counter.Item_Metric
        where month >= '${option.begin_date}' and month < '${option.end_date}'
        group by item_id, access_method
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
    ${item_ids.map(item => `and ${item.Type} = '${item.Value}'`).join('\n')}
    `;

    const result = await mysql.query(query);
    return result;
  }

  async getTRReportItemsWithoutSectionType(option: TitleReportOption) {
    const mysql = this.app.mysql;
    const granularity = option.granularity || 'Month';
    const item_ids = parseItemID(option.item_id!);
    const attributes_to_show_arr = parseAttributesToShow(option.attributes_to_show!, ReportID.TR, [ AttributesToShow.section_type ]);
    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      MetricType.Unique_Title_Investigations,
      MetricType.Unique_Title_Requests,
    ]).filter(str => str === MetricType.Unique_Title_Requests || str === MetricType.Unique_Title_Investigations)
      .map(str => str.toLocaleLowerCase());

    const columns = [ 'title', 'doi', 'id', 'isbn', 'print_issn', 'online_issn', 'uri', 'platform', 'publisher', 'publisher_id' ].concat(attributes_to_show_arr).concat(metric_type_arr);

    if (granularity === Granularity.MONTH) { columns.push('month'); }

    const query = `
    select
    ${columns.join(',')}
    from Counter.Title, ${granularity === Granularity.MONTH ?
    'Counter.Title_Metric' :
    `(
        select
        title_id, access_method, ${metric_type_arr.map(str => `sum(${str}) as ${str}`).join(',')}
        from Counter.Title_Metric
        where  month >= '${option.begin_date}' and month < '${option.end_date}'
        group by title_id, access_method
      ) as T`
}
    where
    Counter.Title.id = ${granularity === Granularity.MONTH ? 'Counter.Title_Metric' : 'T'}.title_id
    ${option.platform ? `and platform = '${option.platform}'` : ''}
    ${option.data_type ? `and data_type = '${option.data_type}'` : ''}
    ${option.yop ? `and yop = '${option.yop}'` : ''}
    ${option.access_type ? `and access_type = '${option.access_type}'` : ''}
    ${option.access_method ? `and access_method = '${option.access_method}'` : ''}
    ${item_ids.map(item => `and ${item.Type} = '${item.Value}'`).join('\n')}
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
    id,
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
    id,
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
    id,
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
}
