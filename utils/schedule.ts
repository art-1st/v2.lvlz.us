import { IScheduleData } from '~/database/schedule';
import { ISchedule } from 'tui-calendar';

export function convertScheduleToTuiSchedule(
  scheduleData: IScheduleData | IScheduleData[],
): ISchedule[] {
  if (Array.isArray(scheduleData)) {
    return scheduleData.map(schedule => convert(schedule));
  } else {
    return [convert(scheduleData)];
  }

  function convert(schedule: IScheduleData): ISchedule {
    const { id, title, start, end, allDay } = schedule;

    return {
      id: id.toString(),
      calendarId: schedule.className.split(' ')[0],
      title,
      start: new Date(start.replace(/ /g, 'T')).toISOString(),
      end: new Date(end.replace(/ /g, 'T')).toISOString(),
      isAllDay: !!allDay,
      category: 'time',
      dueDateClass: '',
      raw: { ...schedule },
    };
  }
}
