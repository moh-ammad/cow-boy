// src/components/RvmCard.jsx
import { Pencil, Trash2, Phone } from "lucide-react";

const RvmCard = ({ data, onEdit, onDelete }) => {
  const date = new Date(data.createdAt);
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold flex items-center gap-1">
          <Phone className="text-red-500 w-4 h-4" />
          {date.toLocaleDateString()}
        </h2>
        <h2 className="text-lg font-bold flex items-center gap-1">
          <Phone className="text-red-500 w-4 h-4" />
          {data.name}
        </h2>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
            <Pencil size={18} />
          </button>
          <button onClick={onDelete} className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RvmCard;
