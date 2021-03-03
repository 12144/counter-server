import { Controller } from 'egg';

const TR_Rule = {
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

const TR_B1_Rule = {
  customer_id: 'string',
  platform: {
    type: 'string',
    required: false,
  },
  begin_date: 'string',
  end_date: 'string',
};

export default class CounterController extends Controller {
  async getReportsTR() {
    const { ctx } = this;
    const query = ctx.query;
    try {
      ctx.validate(TR_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.titleReport.tr(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsTRB1() {
    const { ctx } = this;
    const query = ctx.query;
    try {
      ctx.validate(TR_B1_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.titleReport.tr_b1(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsTRB2() {
    const { ctx } = this;
    const query = ctx.query;
    try {
      ctx.validate(TR_B1_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.titleReport.tr_b2(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsTRB3() {
    const { ctx } = this;
    const query = ctx.query;
    try {
      ctx.validate(TR_B1_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.titleReport.tr_b3(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }
  //   async getAPIStatus() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getAPIStatus(customer_id, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getConsortiumMembers() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getConsortiumMembers(customer_id, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReports() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const platform = req.swagger.params.platform.value;
  //     const search = req.swagger.params.search.value;
  //     Default.getReports(customer_id, platform, search)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsDR() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     const database = req.swagger.params.database.value;
  //     const metric_type = req.swagger.params.metric_type.value;
  //     const data_type = req.swagger.params.data_type.value;
  //     const access_method = req.swagger.params.access_method.value;
  //     const attributes_to_show = req.swagger.params.attributes_to_show.value;
  //     const granularity = req.swagger.params.granularity.value;
  //     Default.getReportsDR(customer_id, begin_date, end_date, platform, database, metric_type, data_type, access_method, attributes_to_show, granularity)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsDR1() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsDR1(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsDR2() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsDR2(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsIR() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     const item_id = req.swagger.params.item_id.value;
  //     const item_contributor = req.swagger.params.item_contributor.value;
  //     const metric_type = req.swagger.params.metric_type.value;
  //     const data_type = req.swagger.params.data_type.value;
  //     const yop = req.swagger.params.yop.value;
  //     const access_type = req.swagger.params.access_type.value;
  //     const access_method = req.swagger.params.access_method.value;
  //     const attributes_to_show = req.swagger.params.attributes_to_show.value;
  //     const include_component_details = req.swagger.params.include_component_details.value;
  //     const include_parent_details = req.swagger.params.include_parent_details.value;
  //     const granularity = req.swagger.params.granularity.value;
  //     Default.getReportsIR(customer_id, begin_date, end_date, platform, item_id, item_contributor, metric_type, data_type, yop, access_type, access_method, attributes_to_show, include_component_details, include_parent_details, granularity)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsIRA1() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsIRA1(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsIRM1() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsIRM1(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsPR() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     const metric_type = req.swagger.params.metric_type.value;
  //     const data_type = req.swagger.params.data_type.value;
  //     const access_method = req.swagger.params.access_method.value;
  //     const attributes_to_show = req.swagger.params.attributes_to_show.value;
  //     const granularity = req.swagger.params.granularity.value;
  //     Default.getReportsPR(customer_id, begin_date, end_date, platform, metric_type, data_type, access_method, attributes_to_show, granularity)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsPR1() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsPR1(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }


  //   async getReportsTRJ1() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsTRJ1(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsTRJ2() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsTRJ2(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

  //   async getReportsTRJ3() {
  //     const customer_id = req.swagger.params.customer_id.value;
  //     const begin_date = req.swagger.params.begin_date.value;
  //     const end_date = req.swagger.params.end_date.value;
  //     const platform = req.swagger.params.platform.value;
  //     Default.getReportsTRJ3(customer_id, begin_date, end_date, platform)
  //       .then(function(response) {
  //         utils.writeJson(res, response);
  //       })
  //       .catch(function(response) {
  //         utils.writeJson(res, response);
  //       });
  //   }

//   async getReportsTRJ4() {
//     const customer_id = req.swagger.params.customer_id.value;
//     const begin_date = req.swagger.params.begin_date.value;
//     const end_date = req.swagger.params.end_date.value;
//     const platform = req.swagger.params.platform.value;
//     Default.getReportsTRJ4(customer_id, begin_date, end_date, platform)
//       .then(function(response) {
//         utils.writeJson(res, response);
//       })
//       .catch(function(response) {
//         utils.writeJson(res, response);
//       });
//   }
}
