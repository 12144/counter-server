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

const View_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'begin_date',
  end_date: 'end_date',
};


export const PR_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'begin_date',
  end_date: 'end_date',
  metric_type: {
    type: 'metric_type',
    required: false,
  },
  data_type: {
    type: 'data_type',
    required: false,
  },
  access_method: {
    type: 'access_method',
    required: false,
  },
  attributes_to_show: {
    type: 'attributes_to_show',
    required: false,
  },
  granularity: {
    type: 'granularity',
    required: false,
  },
};

export const PR_P1_Rule = View_Rule;

export const DR_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'begin_date',
  end_date: 'end_date',
  database: {
    type: 'string',
    required: false,
  },
  metric_type: {
    type: 'metric_type',
    required: false,
  },
  data_type: {
    type: 'data_type',
    required: false,
  },
  access_method: {
    type: 'access_method',
    required: false,
  },
  attributes_to_show: {
    type: 'attributes_to_show',
    required: false,
  },
  granularity: {
    type: 'granularity',
    required: false,
  },
};

export const DR_D1_Rule = View_Rule;

export const DR_D2_Rule = View_Rule;

export const TR_Rule = {
  customer_id: 'string',
  begin_date: 'begin_date',
  end_date: 'end_date',
  platform: {
    type: 'string',
    required: false,
  },
  item_id: {
    type: 'string',
    required: false,
  },
  metric_type: {
    type: 'metric_type',
    required: false,
  },
  data_type: {
    type: 'data_type',
    required: false,
  },
  section_type: {
    type: 'section_type',
    required: false,
  },
  yop: {
    type: 'yop',
    required: false,
  },
  access_type: {
    type: 'access_type',
    required: false,
  },
  access_method: {
    type: 'access_method',
    required: false,
  },
  attributes_to_show: {
    type: 'attributes_to_show',
    required: false,
  },
  granularity: {
    type: 'granularity',
    required: false,
  },
};
// TR_B1, TR_B2, TR_B3的规则是相同的
export const TR_B1_Rule = View_Rule;
export const TR_B2_Rule = View_Rule;
export const TR_B3_Rule = View_Rule;

export const IR_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'begin_date',
  end_date: 'end_date',
  item_id: {
    type: 'string',
    required: false,
  },
  item_contributor: {
    type: 'string',
    required: false,
  },
  metric_type: {
    type: 'metric_type',
    required: false,
  },
  data_type: {
    type: 'data_type',
    required: false,
  },
  yop: {
    type: 'yop',
    required: false,
  },
  access_type: {
    type: 'access_type',
    required: false,
  },
  access_method: {
    type: 'access_method',
    required: false,
  },
  attributes_to_show: {
    type: 'attributes_to_show',
    required: false,
  },
  include_component_details: {
    type: 'include_component_details',
    required: false,
  },
  include_parent_details: {
    type: 'include_parent_details',
    required: false,
  },
  granularity: {
    type: 'granularity',
    required: false,
  },
};
