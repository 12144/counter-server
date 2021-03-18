import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/report/pr', controller.counter.getReportsPR);
  router.get('/report/pr_p1', controller.counter.getReportsPR1);
  router.get('/report/tr', controller.counter.getReportsTR);
  router.get('/report/tr_b1', controller.counter.getReportsTRB1);
  router.get('/report/tr_b2', controller.counter.getReportsTRB2);
  router.get('/report/tr_b3', controller.counter.getReportsTRB3);
  router.get('/report/ir', controller.counter.getReportsIR);
};
