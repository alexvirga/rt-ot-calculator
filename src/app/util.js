import { DateTime } from "luxon";

export function calculateWorkerHours(RTStart, RTEnd, IVRIn, IVROut) {
  // Worker's in and out times as DateTime objects
  const iVRinDateTime = DateTime.fromFormat(IVRIn, "MM/dd/yyyy HH:mm");
  const iVROutDateTime = DateTime.fromFormat(IVROut, "MM/dd/yyyy HH:mm");

  let hoursWithinOperating = 0;
  let hoursOutsideOperating = 0;

  // Calculate for each day if shift spans multiple days
  let current = iVRinDateTime;
  while (current < iVROutDateTime) {
    let nextDayStart = current.plus({ days: 1 }).startOf("day");
    let endOfDay =
      nextDayStart < iVROutDateTime ? nextDayStart : iVROutDateTime;
    let businessStart = current.startOf("day").plus({
      hours: parseInt(RTStart.split(":")[0]),
      minutes: parseInt(RTStart.split(":")[1]),
    });
    let businessEnd = current.startOf("day").plus({
      hours: parseInt(RTEnd.split(":")[0]),
      minutes: parseInt(RTEnd.split(":")[1]),
    });

    const { withinHours, outsideHours } = calculateDailyHours(
      current,
      endOfDay,
      businessStart,
      businessEnd
    );

    hoursWithinOperating += withinHours;
    hoursOutsideOperating += outsideHours;

    current = nextDayStart;
  }
  const RT = hoursWithinOperating.toFixed(2);
  const OT = hoursOutsideOperating.toFixed(2);
  return { RT, OT };
}

export function calculateDailyHours(start, end, businessStart, businessEnd) {
  // Check if the current day is a weekend
  const isWeekend = start.weekday === 6 || start.weekday === 7;
  if (isWeekend) {
    // All hours during weekends are outside operating hours
    return { withinHours: 0, outsideHours: end.diff(start, "hours").hours };
  }

  let withinHours = 0;
  const startWithin = start >= businessStart && start < businessEnd;
  const endWithin = end > businessStart && end <= businessEnd;
  const wholeDayWithin = start <= businessStart && end >= businessEnd;

  if (startWithin && endWithin) {
    withinHours = end.diff(start, "hours").hours;
  } else if (startWithin) {
    withinHours = businessEnd.diff(start, "hours").hours;
  } else if (endWithin) {
    withinHours = end.diff(businessStart, "hours").hours;
  } else if (wholeDayWithin) {
    withinHours = businessEnd.diff(businessStart, "hours").hours;
  }

  const outsideHours = end.diff(start, "hours").hours - withinHours;
  return { withinHours, outsideHours };
}
