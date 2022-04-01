import { Status } from '@shared/enums/status.enum';

import { DatesFactory } from './dates.factory';

export class DatesService {
  static getDatesByStatus(status: Status, startDate: Date, endDate: Date) {
    return DatesFactory.getDatesInstance(status).getDates(startDate, endDate);
  }
}
