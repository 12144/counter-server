import { Service } from 'egg';

export type ReportsOption = {
  platform?: string;
  search?: string;
};

const Reports = {
  PR: {
    Report_Name: 'Platform Master Report',
    Report_ID: 'PR',
    Release: '5',
    Report_Description: 'A customizable report summarizing activity across a content provider’s platforms that allows the user to apply filters and select other configuration options.',
    Path: '/reports/pr',
  },
  PR_P1: {
    Report_Name: 'Platform Usage',
    Report_ID: 'PR_P1',
    Release: '5',
    Report_Description: 'Platform-level usage summarized by Metric_Type.',
    Path: '/reports/pr_p1',
  },
  TR: {
    Report_Name: 'Title Master Report',
    Report_ID: 'TR',
    Release: '5',
    Report_Description: 'A customizable report detailing activity at the title level (journal, book, etc.) that allows the user to apply filters and select other configuration options.',
    Path: '/reports/tr',
  },
  TR_B1: {
    Report_Name: 'Book Requests (Excluding OA_Gold)',
    Report_ID: 'TR',
    Release: '5',
    Report_Description: 'Reports on full-text activity for books, excluding Gold Open Access content, as Total_Item_Requests and Unique_Title_Requests. The Unique_Title_Requests provides comparable usage across book platforms. The Total_Item_Requests shows overall activity; however, numbers between sites will vary significantly based on how the content is delivered (e.g. delivered as a complete book or by chapter).',
    Path: '/reports/tr_b1',
  },
  TR_B2: {
    Report_Name: 'Book Access Denied',
    Report_ID: 'TR_B2',
    Release: '5',
    Report_Description: 'Reports on Access Denied activity for books where users were denied access because simultaneous-use licenses were exceeded or their institution did not have a license for the book.',
    Path: '/reports/tr_b2',
  },
  TR_B3: {
    Report_Name: 'Book Usage by Access Type',
    Report_ID: 'TR_B3',
    Release: '5',
    Report_Description: 'Reports on book usage showing all applicable Metric_Types broken down by Access_Type.',
    Path: '/reports/tr_b3',
  },
  IR: {
    Report_Name: 'Item Master Report',
    Report_ID: 'IR',
    Release: '5',
    Report_Description: 'A granular, customizable report showing activity at the level of the item (article, chapter, media object, etc.) that allows the user to apply filters and select other configuration options.',
    Path: '/reports/ir',
  },
};

export default class Report extends Service {
  public async index(option: ReportsOption) {
    const mysql = this.app.mysql;
    const where:any = {};
    option.platform && (where.platform = option.platform);
    option.search && (where.report_name = option.search);

    const res = await mysql.select('Counter.Reports', { where, columns: [ 'report_id' ] });

    const reports = new Set<string>();

    for (const item of res) {
      reports.add(item.report_id);
    }

    return Array.from(reports).map(id => Reports[id]);
  }
}
