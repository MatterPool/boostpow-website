
/* 
convert timeframe string description to timestamp for minedTimeFrom query parameter 
*/
export function timeframeToTimestamp (timeframe: string): number {
  let now = Math.round(new Date().getTime() / 1000);
  if (timeframe === 'hour') return now - 3600;
  if (timeframe === 'day') return now - 3600 * 24;
  if (timeframe === 'fortnight') return now - 3600 * 24 * 14;
  if (timeframe === 'year') return now - 3600 * 24 * 365;
  if (timeframe === 'decade') return now - 3600 * 24 * 365 * 10;
  return undefined;
}

// tried rendering these with ngFor but then the option was not selected automatically
export const TIMEFRAME_OPTIONS = ['hour','day','fortnight','year','decade'];