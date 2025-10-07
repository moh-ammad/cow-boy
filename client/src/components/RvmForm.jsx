// components/RvmForm.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../libs/helper";

const initialPayload = {
  team_id: "",
  secret: "",
  brand_id: "",
  recording_id: "",
  phone_number: "",
  forwarding_number: "",
  foreign_id: "",
};

const RvmForm = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState(initialPayload);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialPayload);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (initialData?._id) {
        // Update
        await axios.put(`/api/rvm/${initialData._id}`, formData);
        showSuccess("Payload updated");
      } else {
        // Create
        await axios.post("/api/rvm", formData);
        showSuccess("Payload created and forwarded");
      }

      onSuccess?.();
    } catch (err) {
        console.error(err);
      showError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(initialPayload).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize text-gray-700 mb-1">
              {key.replace(/_/g, " ")}
            </label>
            <input
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
      >
        {submitting ? "Submitting..." : initialData ? "Update Payload" : "Create Payload"}
      </button>
    </form>
  );
};

export default RvmForm;
