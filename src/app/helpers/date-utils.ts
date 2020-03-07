import * as moment from 'moment';

export default class DateUtils {
  /**
   * Provide a date countdown from the provided date string (iso8601) format
   */
  public static dateCountdownFrom(date: string): string {
    if (typeof date === 'undefined' || !date || (typeof date === 'string' && !date.trim())) {
      return date;
    }

    const countdownToDate = moment(date);
    const today = moment();

    if (today > countdownToDate) {
      return moment(countdownToDate).format('MM/DD/YYYY');
    }

    const diffWeeks = countdownToDate.diff(today, 'weeks');

    if (diffWeeks >= 1) {
      return `${Math.floor(diffWeeks)} weeks left`;
    }

    const diffDays = countdownToDate.diff(today, 'days');

    if (diffDays >= 1) {
      return `${Math.floor(diffDays)} days left`;
    }

    const diffHours = countdownToDate.diff(today, 'hours');

    if (diffHours >= 1) {
      return `${Math.floor(diffHours)} hours left`;
    }

    const diffMinutes = countdownToDate.diff(today, 'minutes');

    if (diffMinutes >= 1) {
      return `${Math.floor(diffMinutes)} minutes left`;
    }

    return moment(countdownToDate).format('MM/DD/YYYY');
  }

  /**
   * Get a moment date object that is a certain number of working days after provided date
   * @param date Date string to add days to
   * @param days Number of weekdays to add
   * @param excludeDates Dates to exclude when calculating days (YYYY-MM-DD format strings)
   */
  static addWeekdays(date: string, days: number, excludeDates?: Array<string>) {
    const excludeDateMap = {};
    if (excludeDates && Array.isArray(excludeDates)) {
      for (const excludeDate of excludeDates) {
        excludeDateMap[excludeDate] = true;
      }
    }
    let momentDate = moment(date); // use a clone
    while (days > 0) {
      momentDate = momentDate.add(1, 'days');
      // decrease "days" only if it's a weekday.
      if (
        momentDate.isoWeekday() !== 6 &&
        momentDate.isoWeekday() !== 7 &&
        (!excludeDateMap || !excludeDateMap[momentDate.format('YYYY-MM-DD')])
      ) {
        days -= 1;
      }
    }
    return momentDate;
  }

  /**
   * Get a moment date object that is a certain number of working days before provided date
   * @param date Date string to subtract days
   * @param days Number of weekdays to add
   * @param excludeDates Dates to exclude when calculating days (YYYY-MM-DD format strings)
   */
  static subtractWeekdays(date: string, days: number, excludeDates?: Array<string>) {
    const excludeDateMap = {};
    if (excludeDates && Array.isArray(excludeDates)) {
      for (const excludeDate of excludeDates) {
        excludeDateMap[excludeDate] = true;
      }
    }
    let momentDate = moment(date); // use a clone
    while (days > 0) {
      momentDate = momentDate.subtract(1, 'days');
      // decrease "days" only if it's a weekday.
      if (
        momentDate.isoWeekday() !== 6 &&
        momentDate.isoWeekday() !== 7 &&
        (!excludeDateMap || !excludeDateMap[momentDate.format('YYYY-MM-DD')])
      ) {
        days -= 1;
      }
    }
    return momentDate;
  }
}
