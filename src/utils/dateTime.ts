import moment from "moment";

export function isExpired(time: number): boolean {
  const now = moment().unix();
  return now < time;
}
