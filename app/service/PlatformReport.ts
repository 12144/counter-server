import { Service } from 'egg';
import {
  Granularity,
  MetricType,
  NameValue,
  ReportAttributes,
  ReportFilters,
  ReportHeader,
  PlatformReportID,
  ReportID,
} from './type';
import { formatReportItems, parseAttributesToShow } from './util';

export type PlatformReportOption = {
  customer_id: string;
  begin_date: string;
  end_date: string;
  platform?: string;
  metric_type?: string;
  data_type?: string;
  access_method?: string;
  attributes_to_show?: string;
  granularity?: string
};

const ReportName = {
  PR: 'Platform Master Report',
  PR_P1: 'Platform Usage',
};

export default class PlatformReport extends Service {
  // 获取pr
  public async pr(option: PlatformReportOption) {
    const reportHeader = this.getReportHeader(option, PlatformReportID.PR);
    const reportItems = await this.getReportItems(option, PlatformReportID.PR);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.PR),
    };
  }

  // 获取pr_p1
  public async pr_p1(option: PlatformReportOption) {
    const reportHeader = this.getReportHeader(option, PlatformReportID.PR_P1);
    const reportItems = await this.getReportItems(option, PlatformReportID.PR_P1);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.PR),
    };
  }

  //   获取报告头
  getReportHeader(option: PlatformReportOption, reportID: PlatformReportID) {
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

    if (reportID === PlatformReportID.PR) {
      Report_Filters.push({
        Name: ReportFilters.Metric_Type,
        Value: option.metric_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Data_Type,
        Value: option.data_type || 'all',
      });

      Report_Filters.push({
        Name: ReportFilters.Access_Method,
        Value: option.access_method || 'all',
      });
    } else {
      Report_Filters.push({
        Name: ReportFilters.Access_Method,
        Value: 'Regular',
      });
    }
    reportHeader.Report_Filters = Report_Filters;

    // 生成report_attributes
    if (reportID === PlatformReportID.PR) {
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
  async getReportItems(option: PlatformReportOption, reportID: PlatformReportID) {
    if (reportID === PlatformReportID.PR) {
      return await this.getPRReportItems(option);
    }
    return await this.getPRP1ReportItems(option);
  }

  async getPRReportItems(option:PlatformReportOption) {
    const mysql = this.app.mysql;
    const granularity = option.granularity || 'Month';
    const attributes_to_show_arr = parseAttributesToShow(option.attributes_to_show!, ReportID.PR);
    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      MetricType.Total_Item_Investigations,
      MetricType.Unique_Item_Investigations,
      MetricType.Unique_Title_Investigations,
      MetricType.Total_Item_Requests,
      MetricType.Unique_Item_Requests,
      MetricType.Unique_Title_Requests,
      MetricType.No_License,
      MetricType.Limit_Exceeded,
    ]).map(str => str.toLocaleLowerCase());

    const columns = [ 'id', 'platform' ].concat(attributes_to_show_arr).concat(metric_type_arr);
    if (granularity === Granularity.MONTH) { columns.push('month'); }

    const query = `
    select
    ${columns.join(',')}
    from Counter.Platform, ${granularity === Granularity.MONTH ?
    `(
      select * from Counter.Platform_Metric
      where month >= '${option.begin_date}' and month < '${option.end_date}'
    ) as P` :
    `(
        select
        platform_id, access_method, ${metric_type_arr.map(str => `sum(${str}) as ${str}`).join(',')}
        from Counter.Platform_Metric
        where month >= '${option.begin_date}' and month < '${option.end_date}'
        group by platform_id, access_method
    ) as P`
}
    where
    Counter.Platform.id = P.platform_id
    ${option.platform ? `and platform = '${option.platform}'` : ''}
    ${option.data_type ? `and data_type = '${option.data_type}'` : ''}
    ${option.access_method ? `and access_method = '${option.access_method}'` : ''}
    `;

    const result = await mysql.query(query);
    return result;
  }

  async getPRP1ReportItems(option:PlatformReportOption) {
    const mysql = this.app.mysql;
    const query = `
        select
        id,
        platform,
        month,
        total_item_requests,
        unique_item_requests,
        unique_title_requests            
        from Counter.Platform, Counter.Platform_Metric
        where Counter.Platform.id = Counter.Platform_Metric.platform_id
        and month >= '${option.begin_date}' and month < '${option.end_date}'
        ${option.platform ? `and platform = '${option.platform}'` : ''}
        `;
    const result = await mysql.query(query);
    return result;
  }
}
