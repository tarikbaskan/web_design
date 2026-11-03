import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />;

  return (
    <div id="form-alani">
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialData={{
          ...event,
          capacity: String(event.capacity),
        }}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </div>
  );
}

export default EditEventPage;
