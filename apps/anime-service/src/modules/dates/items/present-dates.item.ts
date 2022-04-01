import { DatesItem } from './dates-item.abstract';

export class PresentDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    const currentDate = this.getCurrentDate();

    return { startDate: startDate ?? currentDate, endDate: null };
  }
}
