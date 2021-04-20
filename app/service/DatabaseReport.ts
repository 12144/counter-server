import { Service } from 'egg';
import {
  Granularity,
  MetricType,
  NameValue,
  ReportAttributes,
  ReportFilters,
  ReportHeader,
  DatabaseReportID,
  ReportID,
} from './type';
import { formatReportItems, parseAttributesToShow } from './util';

export type DatabaseReportOption = {
  customer_id: string;
  begin_date: string;
  end_date: string;
  platform?: string;
  database?: string;
  metric_type?: string;
  data_type?: string;
  access_method?: string;
  attributes_to_show?: string;
  granularity?: string
};

const ReportName = {
  DR: 'Database Master Report',
  DR_D1: 'Database Search and Item Usage',
  DR_D2: 'Database Access Denied',
};

export default class DatabaseReport extends Service {
  // 获取dr
  public async dr(option: DatabaseReportOption) {
    const reportHeader = this.getReportHeader(option, DatabaseReportID.DR);
    const reportItems = await this.getReportItems(option, DatabaseReportID.DR);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.DR),
    };
  }

  // 获取dr_d1
  public async dr_d1(option: DatabaseReportOption) {
    const reportHeader = this.getReportHeader(option, DatabaseReportID.DR_D1);
    const reportItems = await this.getReportItems(option, DatabaseReportID.DR_D1);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.DR),
    };
  }

  // 获取dr_d2
  public async dr_d2(option: DatabaseReportOption) {
    const reportHeader = this.getReportHeader(option, DatabaseReportID.DR_D2);
    const reportItems = await this.getReportItems(option, DatabaseReportID.DR_D2);
    return {
      Report_Header: reportHeader,
      Report_Items: await formatReportItems(reportItems, option, ReportID.DR),
    };
  }

  //   获取报告头
  getReportHeader(option: DatabaseReportOption, reportID: DatabaseReportID) {
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

    if (reportID === DatabaseReportID.DR) {
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

      Report_Filters.push({
        Name: ReportFilters.Database,
        Value: option.database || 'all',
      });
    } else {
      Report_Filters.push({
        Name: ReportFilters.Access_Method,
        Value: 'Regular',
      });

      if (reportID === DatabaseReportID.DR_D1) {
        Report_Filters.push({
          Name: ReportFilters.Metric_Type,
          Value: 'Total_Item_Investigations|Total_Item_Requests',
        });
      }

      if (reportID === DatabaseReportID.DR_D2) {
        Report_Filters.push({
          Name: ReportFilters.Metric_Type,
          Value: 'Limit_Exceeded|No_License',
        });
      }
    }
    reportHeader.Report_Filters = Report_Filters;

    // 生成report_attributes
    if (reportID === DatabaseReportID.DR) {
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
  async getReportItems(option: DatabaseReportOption, reportID: DatabaseReportID) {
    if (reportID === DatabaseReportID.DR) {
      return await this.getDRReportItems(option);
    } else if (reportID === DatabaseReportID.DR_D1) {
      return await this.getDRD1ReportItems(option);
    }
    return await this.getDRD2ReportItems(option);
  }

  async getDRReportItems(option:DatabaseReportOption) {
    const mysql = this.app.mysql;
    const granularity = option.granularity || 'Month';
    const attributes_to_show_arr = parseAttributesToShow(option.attributes_to_show!, ReportID.DR);
    const metric_type_arr = (option.metric_type ? option.metric_type.split('|') : [
      MetricType.Total_Item_Investigations,
      MetricType.Unique_Item_Investigations,
      MetricType.Unique_Title_Investigations,
      MetricType.Total_Item_Requests,
      MetricType.Unique_Item_Requests,
      MetricType.Unique_Title_Requests,
      MetricType.No_License,
      MetricType.Limit_Exceeded,
      MetricType.Searches_Regular,
      MetricType.Searches_Automated,
      MetricType.Searches_Federated,
    ]).map(str => str.toLocaleLowerCase());

    const columns = [ 'id', '`database`', 'platform', 'publisher', 'publisher_id' ].concat(attributes_to_show_arr).concat(metric_type_arr);
    if (granularity === Granularity.MONTH) { columns.push('month'); }

    const query = `
    select
    ${columns.join(',')}
    from Counter.\`Database\`, ${granularity === Granularity.MONTH ?
    `(
      select * from Counter.Database_Metric
      where month >= '${option.begin_date}' and month < '${option.end_date}'
    ) as D` :
    `(
        select
        database_id, access_method, ${metric_type_arr.map(str => `sum(${str}) as ${str}`).join(',')}
        from Counter.Database_Metric
        where month >= '${option.begin_date}' and month < '${option.end_date}'
        group by database_id, access_method
    ) as D`
}
    where
    Counter.\`Database\`.id = D.database_id
    ${option.platform ? `and platform = '${option.platform}'` : ''}
    ${option.data_type ? `and data_type = '${option.data_type}'` : ''}
    ${option.access_method ? `and access_method = '${option.access_method}'` : ''}
    ${option.database ? `and \`database\` = '${option.database}'` : ''}
    `;

    const result = await mysql.query(query);
    return result;
  }

  async getDRD1ReportItems(option:DatabaseReportOption) {
    const mysql = this.app.mysql;
    const query = `
        select
        id,
        \`database\`,
        platform,
        publisher,
        publisher_id,
        month,
        total_item_requests,
        total_item_investigations,
        searches_automated,
        searches_federated,
        searches_regular
        from Counter.\`Database\`, Counter.Database_Metric
        where Counter.\`Database\`.id = Counter.Database_Metric.database_id
        and month >= '${option.begin_date}' and month < '${option.end_date}'
        ${option.platform ? `and platform = '${option.platform}'` : ''}
        `;
    const result = await mysql.query(query);
    return result;
  }

  async getDRD2ReportItems(option:DatabaseReportOption) {
    const mysql = this.app.mysql;
    const query = `
        select
        id,
        \`database\`,
        platform,
        publisher,
        publisher_id,
        month,
        limit_exceeded,
        no_license
        from Counter.\`Database\`, Counter.Database_Metric
        where Counter.\`Database\`.id = Counter.Database_Metric.database_id
        and month >= '${option.begin_date}' and month < '${option.end_date}'
        ${option.platform ? `and platform = '${option.platform}'` : ''}
        `;
    const result = await mysql.query(query);
    return result;
  }
}
