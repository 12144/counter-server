// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCounter from '../../../app/controller/counter';
import ExportHome from '../../../app/controller/home';
import ExportType from '../../../app/controller/type';

declare module 'egg' {
  interface IController {
    counter: ExportCounter;
    home: ExportHome;
    type: ExportType;
  }
}
