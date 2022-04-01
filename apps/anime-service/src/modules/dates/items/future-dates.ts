import { DatesItem } from './dates-item';

export class FutureDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    return { startDate: null, endDate: null };
  }
}
