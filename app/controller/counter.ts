import { Controller } from 'egg';
import { PR_Rule, PR_P1_Rule, TR_Rule, TR_B1_Rule, TR_B2_Rule, TR_B3_Rule, IR_Rule } from './type';

export default class CounterController extends Controller {
  async getReportsPR() {
    const { ctx } = this;
    const query = ctx.query;
    try {
      ctx.validate(PR_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.platformReport.pr(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsPR1() {
    const { ctx } = this;
    const query = ctx.query;
    try {
      ctx.validate(PR_P1_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.platformReport.pr_p1(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

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
      ctx.validate(TR_B2_Rule, query);
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
      ctx.validate(TR_B3_Rule, query);
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

  async getReportsIR() {
    const { ctx } = this;
    const query = ctx.query;
    query.include_parent_details = query.include_parent_details || '0';
    query.include_component_details = query.include_component_details || '0';

    try {
      ctx.validate(IR_Rule, query);
    } catch (err) {
      ctx.body = {
        code: 500,
        message: err.errors,
      };
      return;
    }
    const report = await ctx.service.itemReport.ir(query as any);

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
