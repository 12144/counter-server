// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportItemReport from '../../../app/service/ItemReport';
import ExportMember from '../../../app/service/Member';
import ExportPlatformReport from '../../../app/service/PlatformReport';
import ExportReports from '../../../app/service/Reports';
import ExportStatus from '../../../app/service/Status';
import ExportTest from '../../../app/service/Test';
import ExportTitleReport from '../../../app/service/TitleReport';
import ExportType from '../../../app/service/type';
import ExportUtil from '../../../app/service/util';

declare module 'egg' {
  interface IService {
    itemReport: AutoInstanceType<typeof ExportItemReport>;
    member: AutoInstanceType<typeof ExportMember>;
    platformReport: AutoInstanceType<typeof ExportPlatformReport>;
    reports: AutoInstanceType<typeof ExportReports>;
    status: AutoInstanceType<typeof ExportStatus>;
    test: AutoInstanceType<typeof ExportTest>;
    titleReport: AutoInstanceType<typeof ExportTitleReport>;
    type: AutoInstanceType<typeof ExportType>;
    util: AutoInstanceType<typeof ExportUtil>;
  }
}
