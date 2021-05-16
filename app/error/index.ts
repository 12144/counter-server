import { Context } from 'egg';
import { handleParamsError } from './ParamsError';
import { ErrorType } from './type';

export function ErrorHandler(err: any, ctx: Context<any>) {
  const exceptions:any[] = [];
  const errorList:any[] = err.errors;
  // 对每一个error生成对应的exception
  errorList.forEach(item => {
    if (err.code === ErrorType.Invalid_Param) {
      exceptions.push(handleParamsError(item));
    }
  });

  if (ctx.body && ctx.body.data && ctx.body.data.Report_Header) {
    ctx.body.data.Report_Header.Exceptioins = exceptions;
  } else {
    ctx.body = exceptions.length === 1 ? exceptions[0] : exceptions;
  }
}
