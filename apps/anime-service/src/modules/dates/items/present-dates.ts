import { DatesItem } from './dates-item';

export class PresentDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    return { startDate: startDate ?? this.currentDate, endDate: null };
  }
}
