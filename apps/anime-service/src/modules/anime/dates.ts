import { Status } from '@shared/enums/status.enum';

abstract class DatesItem {
  public currentDate;

  constructor() {
    this.currentDate = new Date().toISOString();
  }

  abstract getDates(startDate: Date, endDate: Date): void;
}

class PastDates extends DatesItem {
  constructor() {
    super();
  }

  getDates(startDate: Date, endDate: Date) {
    return { startDate, endDate: endDate ?? this.currentDate };
  }
}

class PresentDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    return { startDate: startDate ?? this.currentDate, endDate: null };
  }
}

class FutureDates extends DatesItem {
  getDates(startDate: Date, endDate: Date) {
    return { startDate: null, endDate: null };
  }
}

class DatesFactory {
  static getDatesInstance(status: Status) {
    switch (status) {
      case Status.PAST:
        return new PastDates();
      case Status.PRESENT:
        return new PresentDates();
      case Status.FUTURE:
        return new FutureDates();
    }
  }
}

export class DatesService {
  static getDatesByStatus(status: Status, startDate: Date, endDate: Date) {
    return DatesFactory.getDatesInstance(status).getDates(startDate, endDate);
  }
}
