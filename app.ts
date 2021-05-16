import { Application } from 'egg';
import {
  checkAccessMethod,
  checkAccessType,
  checkAttributesToShow,
  checkBeginDate,
  checkDataType,
  checkEndDate,
  checkGranularity,
  checkIncludeComponentDetails,
  checkIncludeParentDetails,
  checkMetricType,
  checkSectionType,
  checkYOP,
} from './app/error/utils';

export default class AppBootHook {
  app: Application;
  constructor(app) {
    this.app = app;
  }

  didReady() {
    this.app.validator.addRule('begin_date', checkBeginDate);
    this.app.validator.addRule('end_date', checkEndDate);
    this.app.validator.addRule('metric_type', checkMetricType);
    this.app.validator.addRule('access_type', checkAccessType);
    this.app.validator.addRule('section_type', checkSectionType);
    this.app.validator.addRule('data_type', checkDataType);
    this.app.validator.addRule('access_method', checkAccessMethod);
    this.app.validator.addRule('granularity', checkGranularity);
    this.app.validator.addRule('yop', checkYOP);
    this.app.validator.addRule('include_parent_details', checkIncludeParentDetails);
    this.app.validator.addRule('include_component_details', checkIncludeComponentDetails);
    this.app.validator.addRule('attributes_to_show', checkAttributesToShow);
  }
}
