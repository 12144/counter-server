import { Service } from 'egg';
import {
  Granularity,
  NameValue,
  ReportHeader,
  ItemReportID,
  ReportFilters,
  ReportAttributes,
  MetricType,
  ReportID,
} from './type';
import { formatReportItems, parseAttributesToShow } from './util';

export type ItemReportOption = {
  customer_id: string;
  begin_date: string;
  end_date: string;
  platform?: string;
  item_id?: string;
  item_contributor?: string; // 就是authors
  metric_type?: string;
  data_type?: string;
  yop?: number;
  access_type?: string;
  access_method?: string;
  attributes_to_show?: string;
  include_component_details: boolean;
  include_parent_details?: boolean;
  granularity?: string;
};

const ReportName = {
  IR: 'Item Master Report',
  IR_A1: 'Journal Article Requests',
  IR_M1: 'Multimedia Item Requests',
};

export default class ItemReport extends Service {
  public async ir(option: ItemReportOption) {
    const mysql = this.app.mysql;
    option.include_component_details = String(option.include_component_details || '0') === '1';
    option.include_parent_details = String(option.include_parent_details || '0') === '1';
    const reportHeader = this.getReportHeader(option, ItemReportID.IR);
    const reportItems = await this.getReportItems(option, ItemReportID.IR);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.IR, mysql),
    };
  }

  // 获取报告头
  getReportHeader(option: ItemReportOption, reportID: ItemReportID) {
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

    if (reportID === ItemReportID.IR) {
      option.item_id && Report_Filters.push({
        Name: ReportFilters.Item_ID,
        Value: option.item_id,
      });

      Report_Filters.push({
        Name: ReportFilters.Item_Contributor,
        Value: option.item_contributor || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Metric_Type,
        Value: option.metric_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Data_Type,
        Value: option.data_type || 'all',
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
    }
    reportHeader.Report_Filters = Report_Filters;

    // 生成report_attributes
    if (reportID === ItemReportID.IR) {
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
  async getReportItems(option: ItemReportOption, reportID: ItemReportID) {
    if (reportID === ItemReportID.IR) {
      return await this.getIRReportItems(option);
    }
  }

  async getIRReportItems(option: ItemReportOption) {
    const mysql = this.app.mysql;
    const granularity = option.granularity || 'Month';
    const attributes_to_show_arr = parseAttributesToShow(option.attributes_to_show!, ReportID.IR);

    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      MetricType.Unique_Item_Requests,
      MetricType.Unique_Item_Investigations,
      MetricType.Total_Item_Requests,
      MetricType.Total_Item_Investigations,
      MetricType.No_License,
      MetricType.Limit_Exceeded,
    ]).filter(str => str !== MetricType.Unique_Title_Requests && str !== MetricType.Unique_Title_Investigations)
      .map(str => str.toLocaleLowerCase());

    let columns = [ 'item', 'publisher', 'publisher_id', 'platform', 'doi', 'id', 'isbn', 'print_issn', 'online_issn', 'uri', 'parent_id' ].concat(attributes_to_show_arr);

    if (granularity === Granularity.MONTH) { columns.push('month'); }

    columns = columns.concat(metric_type_arr);

    const where: string[] = [];
    option.platform && where.push(`platform = '${option.platform}'`);
    option.data_type && where.push(`data_type = '${option.data_type}'`);
    option.yop && where.push(`yop = '${option.yop}'`);
    option.access_type && where.push(`access_type = '${option.access_type}'`);
    option.access_method && where.push(`access_method = '${option.access_method}'`);
    option.item_contributor && where.push(`authors like %${option.item_contributor}%`);

    const query = `
    select
    ${columns.join(',')}
    from Counter.Item 
    inner join ${granularity === Granularity.MONTH ?
    `
      Counter.Item_Metric
      on Counter.Item.id = Counter.Item_Metric.item_id 
    ` :
    `
      (
        select
        item_id, access_method, ${metric_type_arr.map(str => `sum(${str}) as ${str}`).join(',')}
        from Counter.Item_Metric
        where month >= '${option.begin_date}' and month < '${option.end_date}'
        group by item_id, access_method
      ) as I
      on Counter.Item.id = I.item_id
    `
}
    ${where.length ? `
      where
      ${where.join(' and ')}
    ` : ''}
    `;
    const result = await mysql.query(query);
    return result;
  }
}
