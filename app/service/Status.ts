import { Service } from 'egg';

export type StatusOption = {
  platform?: string;
};

export default class ItemReport extends Service {
  public async index(option: StatusOption) {
    const mysql = this.app.mysql;
    const where = option.platform ? { platform: option.platform } : {};

    const basic = await mysql.select('Counter.Platform_Status', { where });
    const alert = await mysql.select('Counter.Platform_Status_Alert', { where });

    const basicMap = new Map<string, any>();
    for (const item of basic) {
      basicMap.set(item.platform, {
        Description: item.description,
        Service_Active: Boolean(item.service_active),
        Registry_URL: item.registry_url,
        Note: item.note,
        Alerts: [],
      });
    }

    for (const item of alert) {
      const date = new Date(item.date_time);
      basicMap.get(item.platform).Alerts.push({
        Date_Time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}: ${date.getHours()}:${date.getMinutes()}`,
        Alert: item.alert,
      });
    }

    return Array.from(basicMap.values());
  }
}
