import { Controller } from 'egg';
import {
  Member_Rule,
  Reports_Rule,
  Status_Rule,
  PR_Rule,
  PR_P1_Rule,
  DR_Rule,
  DR_D1_Rule,
  DR_D2_Rule,
  TR_Rule,
  TR_B1_Rule,
  TR_B2_Rule,
  TR_B3_Rule,
  IR_Rule,
} from './type';

export default class CounterController extends Controller {
  async getAPIStatus() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(Status_Rule, query);

    const report = await ctx.service.status.index(query);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getConsortiumMembers() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(Member_Rule, query);

    const report = await ctx.service.member.index(query);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReports() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(Reports_Rule, query);

    const report = await ctx.service.reports.index(query);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsPR() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(PR_Rule, query);

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

    ctx.validate(PR_P1_Rule, query);

    const report = await ctx.service.platformReport.pr_p1(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsDR() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(DR_Rule, query);

    const report = await ctx.service.databaseReport.dr(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsDR1() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(DR_D1_Rule, query);

    const report = await ctx.service.databaseReport.dr_d1(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsDR2() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(DR_D2_Rule, query);

    const report = await ctx.service.databaseReport.dr_d2(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }

  async getReportsTR() {
    const { ctx } = this;
    const query = ctx.query;

    ctx.validate(TR_Rule, query);

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

    ctx.validate(TR_B1_Rule, query);

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

    ctx.validate(TR_B2_Rule, query);

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

    ctx.validate(TR_B3_Rule, query);

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

    ctx.validate(IR_Rule, query);

    const report = await ctx.service.itemReport.ir(query as any);

    ctx.body = {
      code: 200,
      message: 'ok!',
      data: report,
    };
  }


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
