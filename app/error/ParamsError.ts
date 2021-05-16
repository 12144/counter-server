import { Access_Method_Fields, Access_Type_Fields, Attributes_To_Show_Fields, Data_Type_Fields, Granularity_Fields, Metric_Type_Fields, ReportAttributes as ReportAttributesUpper, ReportFilters as ReportFiltersUpper, Section_Type_Fields } from '../service/type';
import { Serverity } from './type';
import { ExceptionCreator } from './utils';

const ReportFilters = (() => {
  const obj:any = {};
  for (const key in ReportFiltersUpper) {
    obj[key] = ReportFiltersUpper[key].toLowerCase();
  }
  return obj;
})();

const ReportAttributes = (() => {
  const obj:any = {};
  for (const key in ReportAttributesUpper) {
    obj[key] = ReportAttributesUpper[key].toLowerCase();
  }
  return obj;
})();

// 参数相关的异常处理
export function handleParamsError(err:any) {
  if (err.code === 'missing_field') { // 参数缺失
    switch (err.field) {
      case 'customer_id':
        return ExceptionCreator.Required_ReportAttribute_Missing('customer_id', Serverity.Error);
      case ReportFilters.Begin_Date:
        return ExceptionCreator.Required_ReportFilter_Missing(ReportFilters.Begin_Date, Serverity.Error);
      case ReportFilters.End_Date:
        return ExceptionCreator.Required_ReportFilter_Missing(ReportFilters.End_Date, Serverity.Error);
      default:
        return err;
    }
  } else if (err.code === 'invalid') { // 参数格式错误
    switch (err.field) {
      case ReportFilters.Begin_Date:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.Begin_Date, Serverity.Error,
          `${ReportFilters.Begin_Date} must be the first day of the month`);
      case ReportFilters.End_Date:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.End_Date, Serverity.Error,
          `${ReportFilters.End_Date} must be the last day of the month`);
      case ReportFilters.Metric_Type:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.Metric_Type, Serverity.Error,
          `${ReportFilters.Metric_Type} must be sperated by "|" and be one of the following values: ${Metric_Type_Fields.join(', ')}`);
      case ReportFilters.Access_Type:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.Access_Type, Serverity.Error,
          `${ReportFilters.Access_Type} must be sperated by "|" and be one of the following values: ${Access_Type_Fields.join(', ')}`);
      case ReportFilters.Section_Type:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.Section_Type, Serverity.Error,
          `${ReportFilters.Section_Type} must be sperated by "|" and be one of the following values: ${Section_Type_Fields.join(', ')}`);
      case ReportFilters.Data_Type:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.Data_Type, Serverity.Error,
          `${ReportFilters.Data_Type} must be sperated by "|" and be one of the following values: ${Data_Type_Fields.join(', ')}`);
      case ReportFilters.Access_Method:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.Access_Method, Serverity.Error,
          `${ReportFilters.Access_Method} must be sperated by "|" and be one of the following values: ${Access_Method_Fields.join(', ')}`);
      case ReportAttributes.Granularity:
        return ExceptionCreator.Invalid_ReportAttribute_Value(ReportAttributes.Granularity, Serverity.Error,
          `${ReportAttributes.Granularity} must be one of the following values: ${Granularity_Fields.join(', ')}`);
      case ReportFilters.YOP:
        return ExceptionCreator.Invalid_ReportFilter_Value(ReportFilters.YOP, Serverity.Error,
          `${ReportFilters.YOP} must be a four-digit year with min value 0001 and max value 9999`);
      case ReportAttributes.Include_Parent_Details:
        return ExceptionCreator.Invalid_ReportAttribute_Value(ReportAttributes.Include_Parent_Details, Serverity.Error,
          `${ReportAttributes.Include_Parent_Details} must be set 1 for including parent details and set 0 or just ignore for not including`);
      case ReportAttributes.Include_Component_Details:
        return ExceptionCreator.Invalid_ReportAttribute_Value(ReportAttributes.Include_Component_Details, Serverity.Error,
          `${ReportAttributes.Include_Component_Details} must be set 1 for including component details and set 0 or just ignore for not including`);
      case ReportAttributes.Attributes_To_Show:
        return ExceptionCreator.Invalid_ReportAttribute_Value(ReportAttributes.Attributes_To_Show, Serverity.Error,
          `${ReportAttributes.Attributes_To_Show} must be sperated by "|" and be one of the following values: ${Attributes_To_Show_Fields.join(', ')}`);
      default:
        return err;
    }
  }
}
