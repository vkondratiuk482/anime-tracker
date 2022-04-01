import { Status } from '@shared/enums/status.enum';

import { PastDates } from './items/past-dates';
import { PresentDates } from './items/present-dates';
import { FutureDates } from './items/future-dates';

export class DatesFactory {
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
