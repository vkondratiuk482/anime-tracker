import { DatesItem } from './dates-item';

export class PastDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    return { startDate, endDate: endDate ?? this.currentDate };
  }
}
