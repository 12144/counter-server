import {
  AttributesToShow,
  Item_ID_Fields,
  Item_ID_Map,
  Metric_Type_Fields,
  Metric_Type_Map,
  ReportID,
  TypeValue,
} from './type';

const PRAttrs = new Set([
  AttributesToShow.data_type,
  AttributesToShow.access_method,
]);

const TRAttrs = new Set([
  AttributesToShow.data_type,
  AttributesToShow.section_type,
  AttributesToShow.yop,
  AttributesToShow.access_type,
  AttributesToShow.access_method,
]);

const DRAttrs = new Set([
  AttributesToShow.data_type,
  AttributesToShow.access_method,
]);

const IRAttrs = new Set([
  AttributesToShow.authors,
  AttributesToShow.publication_date,
  AttributesToShow.article_version,
  AttributesToShow.data_type,
  AttributesToShow.yop,
  AttributesToShow.access_type,
  AttributesToShow.access_method,
]);

export function parseItemID(str: string): TypeValue[] {
  if (!str) return [];
  return str.split('|').map(item => {
    const arr = item.split('=');
    return {
      Type: arr[0].toLocaleLowerCase() === 'proprietary_id' ? 'id' : arr[0],
      Value: arr[1],
    };
  });
}

// 根据attributes_to_show的值，返回一个数组，元素是attributes_to_show指定的列
export function parseAttributesToShow(str: string, reportID: ReportID, exclude?: string[]): string[] {
  if (!str) return [];
  const excludeAttrs = new Set(exclude || []);
  //   todo根据不同的报告筛选其所需的列
  const attrs = str.split('|').map(item => item.toLocaleLowerCase());
  switch (reportID) {
    case ReportID.PR:
      return attrs.filter(attr => PRAttrs.has(attr));
    case ReportID.DR:
      return attrs.filter(attr => DRAttrs.has(attr));
    case ReportID.TR:
      return attrs.filter(attr => TRAttrs.has(attr) && !excludeAttrs.has(attr));
    case ReportID.IR:
      return attrs.filter(attr => IRAttrs.has(attr));
    default: return [];
  }
}

const formatValue = {
  Item_ID(item: any) {
    return Item_ID_Fields.filter(field => item[field]).map(field => ({
      Type: Item_ID_Map[field],
      Value: item[field],
    }));
  },
  Publisher_ID(str: string) {
    return str.split('; ').map(item => {
      const arr = item.split('=');
      return {
        Type: arr[0],
        Value: arr[1],
      };
    });
  },
  Item_Contributors(authors:string) {
    return [{
      Type: 'Author',
      Name: authors,
      Identifier: '',
    }];
  },
  Publication_Date(publication_date:string) {
    return [{
      Type: 'Publication_Date',
      Value: publication_date,
    }];
  },
  Article_Version(article_version: string) {
    return [{
      Type: 'Article_Version',
      Value: article_version,
    }];
  },
};

const getFormattedItem = {
  [ReportID.PR](item: any) {
    const formattedItem: any = { };
    item.platform && (formattedItem.Platform = item.platform);
    item.data_type && (formattedItem.Data_Type = item.data_type);
    item.access_method && (formattedItem.Access_Method = item.access_method);
    formattedItem.Performance = [];
    return formattedItem;
  },

  [ReportID.DR](item:any) {
    const formattedItem: any = { };

    item.database && (formattedItem.Database = item.database);
    formattedItem.Item_ID = formatValue.Item_ID(item);
    item.platform && (formattedItem.Platform = item.platform);
    item.publisher && (formattedItem.Publisher = item.publisher);
    item.publisher_id && (formattedItem.Publisher_ID = formatValue.Publisher_ID(item.publisher_id));
    item.data_type && (formattedItem.Data_Type = item.data_type);
    item.access_method && (formattedItem.Access_Method = item.access_method);
    formattedItem.Performance = [];
    return formattedItem;
  },

  [ReportID.TR](item: any) {
    const formattedItem: any = { };

    item.title && (formattedItem.Title = item.title);
    formattedItem.Item_ID = formatValue.Item_ID(item);
    item.platform && (formattedItem.Platform = item.platform);
    item.publisher && (formattedItem.Publisher = item.publisher);
    item.publisher_id && (formattedItem.Publisher_ID = item.publisher_id);
    item.data_type && (formattedItem.Data_Type = item.data_type);
    item.section_type && (formattedItem.Section_Type = item.section_type);
    item.yop && (formattedItem.YOP = item.yop);
    item.access_type && (formattedItem.Access_Type = item.access_type);
    item.access_method && (formattedItem.Access_Method = item.access_method);
    formattedItem.Performance = [];
    return formattedItem;
  },

  [ReportID.IR](item: any, option?: any) {
    const formattedItem: any = { };

    item.item && (formattedItem.Item = item.item);
    formattedItem.Item_ID = formatValue.Item_ID(item);
    item.platform && (formattedItem.Platform = item.platform);
    item.publisher && (formattedItem.Publisher = item.publisher);
    item.publisher_id && (formattedItem.Publisher_ID = formatValue.Publisher_ID(item.publisher_id));
    item.authors && (formattedItem.Item_Contributors = formatValue.Item_Contributors(item.authors));
    item.publication_date && (formattedItem.Item_Dates = formatValue.Publication_Date(item.publication_date));
    item.article_version && (formattedItem.Item_Attributes = formatValue.Article_Version(item.article_version));

    option && option.include_parent_details && (formattedItem.Item_Parent = item.parent_id);
    option && option.include_component_details && (formattedItem.Item_Component = null);
    formattedItem.Performance = [];
    return formattedItem;
  },

  formatItemParent(parent: any[]) {
    const formattedParent = getFormattedItem[ReportID.IR](parent[0]);
    delete formattedParent.Item_Parent;
    delete formattedParent.Item_Component;
    delete formattedParent.Performance;
    return formattedParent;
  },

  async addParentOrComponentDetail(itemMap: Map<string, any>, relationMap: Map<string, string[]>, option: any, mysql: any) {
    const parentMap = new Map<string, any>();
    const result:any[] = [];

    for (const [ key, value ] of itemMap) {
      const item = { ...value };
      if (option.include_parent_details && item.Item_Parent) {
        const parent = parentMap.get(item.Item_Parent) || getFormattedItem.formatItemParent(await mysql.select('Counter.Item', {
          where: { id: item.Item_Parent },
          columns: [ 'item', 'authors', 'publication_date', 'article_version', 'data_type', 'doi', 'id', 'isbn', 'print_issn', 'online_issn', 'uri' ],
        }));
        parentMap.set(item.Item_Parent, parent);
        item.Item_Parent = parent;
      } else delete item.Item_Parent;

      if (option.include_component_details) {
        const components = relationMap.get(key);
        if (components && components.length) {
          item.Item_Component = components.map(id => {
            const item = { ...itemMap.get(id) };
            delete item.Item_Parent;
            delete item.Item_Component;
            return item;
          });
        } else {
          delete item.Item_Component;
        }
      } else delete item.Item_Component;

      result.push(item);
    }
    return result;
  },
};

export async function formatReportItems(items: any[], option: any, reportID: ReportID, mysql?:any) {
  const itemMap = new Map<string, any>();
  const relationMap = new Map<string, string[]>();

  items.forEach(item => {
    const key = item.id;

    if (itemMap.has(key) === false) {
      const formattedItem = getFormattedItem[reportID](item, option);
      itemMap.set(key, formattedItem);
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

    if (Instance.length) {
      itemMap.get(key).Performance.push({ Period, Instance });
    }

    if (reportID === ReportID.IR && item.parent_id) {
      const parentRecord = relationMap.get(item.parent_id) || [];
      parentRecord.push(item.id);
      relationMap.set(item.parent_id, parentRecord);
    }
  });

  if (reportID === ReportID.IR && (option.include_component_details || option.include_parent_details)) {
    return await getFormattedItem.addParentOrComponentDetail(itemMap, relationMap, option, mysql);
  }

  return Array.from(itemMap.values()).filter(item => item.Performance.length);
}
