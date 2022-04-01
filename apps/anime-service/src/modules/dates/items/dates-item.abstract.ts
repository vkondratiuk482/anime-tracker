export abstract class DatesItem {
  private currentDate;

  constructor() {
    this.currentDate = new Date().toISOString();
  }

  getCurrentDate() {
    return this.currentDate;
  }

  abstract getDates(startDate: Date, endDate: Date): void;
}
