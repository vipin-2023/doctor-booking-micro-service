import moment from 'moment';

export class DateTimeUtils {
  static convertDateToISOString(date: string): string {
    return moment(date, "DD-MM-YYYY").toISOString();
  }

  static convertTimeToISOString(time: string): string {
    return moment(time, "HH:mm").toISOString();
  }
}
