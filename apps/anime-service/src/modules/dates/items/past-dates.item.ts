import { DatesItem } from './dates-item.abstract';

export class PastDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    const currentDate = this.getCurrentDate();

    return { startDate, endDate: endDate ?? currentDate };
  }
}
