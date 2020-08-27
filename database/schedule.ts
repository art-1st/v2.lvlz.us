import firebase from 'firebase/app';
import 'firebase/database';

export interface IScheduleData {
  id: number;
  address: string;
  allDay: 0 | 1;
  attend: number;
  className: string;
  title: string;
  desc: string;
  start: string;
  end: string;
  link: string;
  media: string;
  place: string;
  tag: string | null;
  user: string;
}

export async function getSchedule(startAt: string, endAt: string): Promise<IScheduleData[]> {
  const database = firebase.database();
  const ref = database.ref(`/schedules`);
  const snapshot = await ref.orderByChild('start').startAt(startAt).endAt(endAt).once('value');

  return snapshot.val() ? Object.values(snapshot.val()) : [];
}
