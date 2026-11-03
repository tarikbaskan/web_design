import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <div id="form-alani">
      <h2 className="bolum-baslik">Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </div>
  );
}

export default AddEventPage;
