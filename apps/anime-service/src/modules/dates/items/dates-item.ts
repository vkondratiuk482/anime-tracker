export abstract class DatesItem {
  public currentDate;

  constructor() {
    this.currentDate = new Date().toISOString();
  }

  abstract getDates(startDate: Date, endDate: Date): void;
}
