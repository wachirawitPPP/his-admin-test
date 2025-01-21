const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export interface EventType {
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
}

const Events: EventType[] = [
  {
    title: 'คนไข้ 1',
    allDay: true,
    start: new Date("2024-11-26T10:00:00.000Z"),
    end: new Date("2024-11-27T12:00:00.000Z"),
    color: 'default',
  },
  {
    title: 'Learn ReactJs',
    start: new Date(y, m, d + 3, 10, 30),
    end: new Date(y, m, d + 3, 11, 30),
    allDay: false,
    color: 'green',
  },
  {
    title: 'Launching MaterialArt Angular',
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: 'red',
  }, 
  {
    title: 'Lunch with Mr.Raw',
    start: new Date(y, m, d - 2, 13, 0),
    end: new Date(y, m, d - 2, 14, 0),
    allDay: false,
    color: 'azure',
  },
  {
    title: 'Going For Party of Sahs',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: 'azure',
  },
  {
    title: 'Learn Ionic',
    start: new Date(y, m, 23, 9, 0),
    end: new Date(y, m, 25, 17, 0),
    allDay: false,
    color: 'warning',
  },
  {
    title: 'Research of making own Browser',
    start: new Date(y, m, 19, 10, 0),
    end: new Date(y, m, 22, 18, 0),
    allDay: false,
    color: 'default',
  },
];

export default Events;
