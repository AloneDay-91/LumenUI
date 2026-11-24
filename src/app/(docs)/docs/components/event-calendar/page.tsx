import { EventCalendarDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function EventCalendarPage() {
  return (
    <ComponentDocs
      name="Event Calendar"
      description="A planner in day, week, and month views. Overlapping events sit side by side, the current time is marked, and clicks on events and empty slots call you back."
      preview={<EventCalendarDemo />}
      usage={`import { EventCalendar } from "@/components/ui/EventCalendar"

<EventCalendar
  events={events}
  onEventClick={(event) => openEditor(event)}
  onSlotClick={(start) => createEvent(start)}
/>`}
      extraHeadings={[
        { id: "events", text: "Events", level: 2 },
        { id: "views", text: "Views and range", level: 2 },
        { id: "editing", text: "Creating and editing", level: 2 },
        { id: "rendering", text: "Rendering", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="events">Events</h2>
            <p>
              Each event has an <code>id</code>, a <code>title</code>, <code>start</code> and <code>end</code> dates, and optionally <code>allDay</code>, a <code>description</code>, and a <code>color</code> from the status hues. All-day events sit in a row above the hours.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="views">Views and range</h2>
            <p>
              <code>views</code> picks the views in the switcher; <code>view</code> and <code>date</code> can be controlled to sync with the URL. <code>dayStartHour</code> and <code>dayEndHour</code> set the hours shown, <code>weekStartsOn</code> the first day. Dates use <code>locale</code>, or the page language.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="editing">Creating and editing</h2>
            <p>
              The calendar shows events; your app owns them. <code>onSlotClick</code> gets the start of the half hour clicked, or the day in month view; <code>onEventClick</code> gets the event. Open your own Dialog or Drawer from there.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="rendering">Rendering</h2>
            <p>
              Dates depend on the time zone, so the grid fills in after hydration: the server sends the frame, the browser adds the days and events. No hydration mismatch, whatever the server&apos;s zone.
            </p>
          </section>
        </>
      }
    />
  )
}
