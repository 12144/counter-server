// 各个接口支持的参数，用于参数校验
export const Status_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
};

export const Member_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
};

export const Reports_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  search: {
    type: 'string',
    required: false,
  },
};

export const PR_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'string',
  end_date: 'string',
  metric_type: {
    type: 'string',
    required: false,
  },
  data_type: {
    type: 'string',
    required: false,
  },
  access_method: {
    type: 'string',
    required: false,
  },
  attributes_to_show: {
    type: 'string',
    required: false,
  },
  granularity: {
    type: 'string',
    required: false,
  },
};

export const PR_P1_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'string',
  end_date: 'string',
};

export const TR_Rule = {
  customer_id: 'string',
  begin_date: 'string',
  end_date: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  item_id: {
    type: 'string',
    required: false,
  },
  metric_type: {
    type: 'string',
    required: false,
  },
  data_type: {
    type: 'string',
    required: false,
  },
  section_type: {
    type: 'string',
    required: false,
  },
  yop: {
    type: 'string',
    required: false,
  },
  access_type: {
    type: 'string',
    required: false,
  },
  access_method: {
    type: 'string',
    required: false,
  },
  attributes_to_show: {
    type: 'string',
    required: false,
  },
  granularity: {
    type: 'string',
    required: false,
  },
};
// TR_B1, TR_B2, TR_B3的规则是相同的
export const TR_B1_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'string',
  end_date: 'string',
};

export const TR_B2_Rule = TR_B1_Rule;
export const TR_B3_Rule = TR_B1_Rule;

export const IR_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'string',
  end_date: 'string',
  item_id: {
    type: 'string',
    required: false,
  },
  item_contributor: {
    type: 'string',
    required: false,
  },
  metric_type: {
    type: 'string',
    required: false,
  },
  data_type: {
    type: 'string',
    required: false,
  },
  yop: {
    type: 'string',
    required: false,
  },
  access_type: {
    type: 'string',
    required: false,
  },
  access_method: {
    type: 'string',
    required: false,
  },
  attributes_to_show: {
    type: 'string',
    required: false,
  },
  include_component_details: {
    type: 'string',
    required: false,
  },
  include_parent_details: {
    type: 'string',
    required: false,
  },
  granularity: {
    type: 'string',
    required: false,
  },
};
