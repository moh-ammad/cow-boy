// components/RvmCard.jsx
import { Trash2, Pencil } from "lucide-react";

const RvmCard = ({ data, onDelete, onEdit }) => {
  const {
    phone_number,
    forwarding_number,
    team_id,
    brand_id,
    foreign_id,
    recording_id,
    createdAt,
  } = data;

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 shadow-sm bg-white text-sm">
      {/* Action Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <h3 className="text-base font-semibold text-primary mb-2">📞 {phone_number}</h3>

      <ul className="space-y-1 text-gray-600">
        <li><strong>Forwarding #:</strong> {forwarding_number}</li>
        <li><strong>Team ID:</strong> {team_id}</li>
        <li><strong>Brand ID:</strong> {brand_id}</li>
        <li><strong>Foreign ID:</strong> {foreign_id}</li>
        <li><strong>Recording ID:</strong> {recording_id}</li>
      </ul>

      <p className="text-xs text-gray-400 mt-3">
        Created: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default RvmCard;
