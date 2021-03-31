import { Service } from 'egg';

export type MemberOption = {
  platform?: string;
};

function format(items: any[]) {
  const res: any[] = [];
  for (const item of items) {
    const tmp = {
      Customer_ID: item.customer_id,
      Requestor_ID: item.requestor_id,
      Name: item.Name,
      Notes: item.notes,
      Institution_ID: [{
        Type: item.platform,
        Value: item.id,
      }],
    };

    item.isil && (tmp.Institution_ID.push({
      Type: 'ISIL',
      Value: item.isil,
    }));
    item.isni && (tmp.Institution_ID.push({
      Type: 'ISNI',
      Value: item.isni,
    }));
    item.oclc && (tmp.Institution_ID.push({
      Type: 'OCLC',
      Value: item.oclc,
    }));
    res.push(tmp);
  }
  return res;
}

export default class Member extends Service {
  public async index(option: MemberOption) {
    const mysql = this.app.mysql;

    const where = option.platform ? { platform: option.platform } : {};

    const res = await mysql.select('Counter.Member', { where });

    return format(res);
  }
}
