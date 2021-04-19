import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/status', controller.counter.getAPIStatus);
  router.get('/member', controller.counter.getConsortiumMembers);
  router.get('/reports', controller.counter.getReports);
  router.get('/reports/pr', controller.counter.getReportsPR);
  router.get('/reports/pr_p1', controller.counter.getReportsPR1);
  router.get('/reports/dr', controller.counter.getReportsDR);
  router.get('/reports/dr_d1', controller.counter.getReportsDR1);
  router.get('/reports/dr_d2', controller.counter.getReportsDR2);
  router.get('/reports/tr', controller.counter.getReportsTR);
  router.get('/reports/tr_b1', controller.counter.getReportsTRB1);
  router.get('/reports/tr_b2', controller.counter.getReportsTRB2);
  router.get('/reports/tr_b3', controller.counter.getReportsTRB3);
  router.get('/reports/ir', controller.counter.getReportsIR);
};
