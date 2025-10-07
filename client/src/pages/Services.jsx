import { useEffect, useState } from "react";
import ServiceDropdown from "../components/ServiceDropdown";
import RvmForm from "../components/RvmForm";
import RvmCard from "../components/RvmCard";
import axios from "axios";
import { showError, showSuccess } from "../libs/helper";
import { Plus } from "lucide-react";

const Services = () => {
  const [service, setService] = useState("rvm");
  const [rvmPayloads, setRvmPayloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch payloads
  const fetchPayloads = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/rvm");
      setRvmPayloads(res.data);
    } catch (err) {
      console.error(err);
      showError("Failed to fetch RVM payloads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (service === "rvm") fetchPayloads();
  }, [service]);

  // Called when create/update success (add this to your RvmForm's onSuccess)
  const handleFormSuccess = () => {
    showSuccess("Payload created successfully");
    setShowForm(false);
    fetchPayloads();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4 text-primary">Services</h1>
      <p className="mb-6 text-gray-600">
        You can use these services to interact with your users:
        <br />
        <span className="text-blue-600 font-semibold">Cowboy RVM</span> (Voicemail),
        <span className="text-green-600 font-semibold"> Vicidial</span> (Calling),
        <span className="text-purple-600 font-semibold"> Mautic</span> (Email)
      </p>

      <ServiceDropdown value={service} onChange={setService} />

      {service === "rvm" && (
        <>
          {/* Add New Button */}
          <div className="flex justify-end mt-6 mb-4">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
              onClick={() => setShowForm((v) => !v)}
            >
              <Plus size={18} />
              {showForm ? "Cancel" : "Add New Payload"}
            </button>
          </div>

          {/* Show form only if toggled */}
          {showForm && <RvmForm onSuccess={handleFormSuccess} />}

          {/* Payload list */}
          <div className="mt-6">
            {loading ? (
              <p className="text-gray-500">Loading RVM payloads...</p>
            ) : rvmPayloads.length === 0 ? (
              <p className="text-gray-500">No payloads found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rvmPayloads.map((payload) => (
                  <RvmCard key={payload._id} data={payload} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {service === "vicidial" && (
        <div className="text-center mt-12">
          <img src="/vicidial-placeholder.png" alt="Vicidial" className="mx-auto w-40 mb-4 opacity-70" />
          <h2 className="text-xl font-semibold text-gray-700">Vicidial Integration</h2>
          <p className="text-gray-500">This service will be available soon!</p>
        </div>
      )}

      {service === "mautic" && (
        <div className="text-center mt-12">
          <img src="/mautic-placeholder.png" alt="Mautic" className="mx-auto w-40 mb-4 opacity-70" />
          <h2 className="text-xl font-semibold text-gray-700">Mautic Integration</h2>
          <p className="text-gray-500">This service will be available soon!</p>
        </div>
      )}
    </div>
  );
};

export default Services;
