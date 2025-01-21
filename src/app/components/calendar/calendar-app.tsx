"use client";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import Events from "./EventData"; // Import your EventData file here
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { TbCheck } from "react-icons/tb";


import CardBox from "@/app/components/shared/CardBox";
import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";

moment.locale("th");
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

type EvType = {
  title: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

const CalendarApp = () => {
  const [calevents, setCalEvents] = React.useState<any>(Events);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [slot, setSlot] = React.useState<EvType>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>("primary");
  const [update, setUpdate] = React.useState<EvType | undefined | any>();

  const ColorVariation = [
    { id: 1, eColor: "primary", value: "primary" },
    { id: 2, eColor: "success", value: "green" },
    { id: 3, eColor: "error", value: "red" },
    { id: 4, eColor: "secondary", value: "default" },
    { id: 5, eColor: "warning", value: "warning" },
  ];

  const addNewEventAlert = (slotInfo: EvType) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event: any) => {
    setOpen(true);
    const newEditEvent = calevents.find(
      (elem: EvType) => elem.title === event.title
    );
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setStart(newEditEvent.start);
    setEnd(newEditEvent.end);
    setUpdate(event);
  };

  const updateEvent = (e: any) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem: EvType) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }
        return elem;
      })
    );
    setOpen(false);
    setTitle("");
    setColor("");
    setStart("");
    setEnd("");
    setUpdate(null);
  };

  const onEventResize = ({ event, start, end }: any) => {
    const updatedEvents = calevents.map((existingEvent: EvType) => {
      if (existingEvent.title === event.title) {
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });
    setCalEvents(updatedEvents);
  };

  const onEventDrop = ({ event, start, end }: any) => {
    const updatedEvents = calevents.map((existingEvent: EvType) => {
      if (existingEvent.title === event.title) {
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });
    setCalEvents(updatedEvents);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
  };

  const deleteHandler = (event: EvType) => {
    const updatecalEvents = calevents.filter(
      (ind: EvType) => ind.title !== event.title
    );
    setCalEvents(updatecalEvents);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: EvType) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }
    return { className: `event-default` };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };

  return (
    <>
      <CardBox>
        <DnDCalendar
          selectable
          events={calevents}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectEvent={(event) => editEvent(event)}
          onSelectSlot={(slotInfo: any) => addNewEventAlert(slotInfo)}
          eventPropGetter={(event: any) => eventColors(event)}
          showMultiDayTimes
          timeslots={4}
          step={15}
          className="min-h-[900px]"
          resizable
        />
      </CardBox>
      <Modal dismissible show={open} size="lg" onClose={handleClose}>
        <form onSubmit={update ? updateEvent : submitHandler}>
          <Modal.Header className="items-start">
            {update ? "Update Event" : "Add Event"}
            <p className="text-darklink font-normal mt-3 text-sm">
              {!update
                ? "To add Event kindly fill up the title and choose the event color and press the add button"
                : "To Edit/Update Event kindly change the title and choose the event color and press the update button"}
            </p>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="flex flex-col gap-3">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="event" value="Event Title" />
                </div>
                <TextInput
                  id="event"
                  type="text"
                  sizing="md"
                  value={title}
                  className="form-control"
                  onChange={inputChangeHandler}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="StartDate" value="Start Date" />
                </div>
                <Datepicker
                  value={start}
                  className="form-control calendar static"
                  onSelectedDateChanged={handleStartChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="EndDate" value="End Date" />
                </div>
                <Datepicker
                  value={end}
                  className="form-control calendarSec static"
                  onSelectedDateChanged={handleEndChange}
                />
              </div>
            </div>

            <h6 className="text-base pt-4">Select Event Color</h6>
            <div className="flex gap-2 items-center mt-2">
              {ColorVariation.map((mcolor) => (
                <div
                  className={`h-6 w-6 flex justify-center items-center rounded-full cursor-pointer bg-${mcolor.eColor}`}
                  key={mcolor.id}
                  onClick={() => selectinputChangeHandler(mcolor.value)}
                >
                  {mcolor.value === color ? (
                    <TbCheck width="16" className="text-white" />
                  ) : null}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {update ? (
              <Button
                type="button"
                color="error"
                onClick={() => deleteHandler(update)}
              >
                Delete
              </Button>
            ) : null}
            <Button color="primary" type="submit" disabled={!title}>
              {update ? "Update Event" : "Add Event"}
            </Button>
            <Button color="lighterror" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CalendarApp;
