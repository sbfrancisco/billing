import type React from "react";
import { useState } from "react";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "@/utils/userStorage";
import { User, Mail, Building, MapPin, FileText, Phone, Pencil } from "lucide-react";

type EditableFields = "name" | "email" | "company" | "direccion" | "documento" | "telefono" | "isAuthenticated";

const NON_EDITABLE_FIELDS: EditableFields[] = ["email", "documento"];

export function DataPage() {
  const client = getUserFromLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  console.log("Respuesta backend:", client);
  const [editableData, setEditableData] = useState<Record<EditableFields, string>>({
    name: client?.name || "",
    email: client?.email || "",
    company: client?.company || "",
    direccion: client?.direccion || "",
    documento: client?.documento || "",
    telefono: client?.telefono || "",
    isAuthenticated: client?.isAuthenticated || false,
  });

  const [originalData, setOriginalData] = useState(editableData);
  const [editingField, setEditingField] = useState<EditableFields | null>(null);

  const clientData: { label: string; key: EditableFields; icon: React.ElementType }[] = [
    { label: "Email", key: "email", icon: Mail },
    { label: "Documento", key: "documento", icon: FileText },
    { label: "Nombre", key: "name", icon: User },
    { label: "Empresa", key: "company", icon: Building },
    { label: "Dirección", key: "direccion", icon: MapPin },
    { label: "Teléfono", key: "telefono", icon: Phone },
  ];

  const isFieldEditable = (key: EditableFields) => !NON_EDITABLE_FIELDS.includes(key);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/update_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableData),
      });
      console.log("Respuesta backend:", editableData);

      if (!response.ok) throw new Error("Error al actualizar usuario");
      const data = await response.json();
      console.log("Respuesta backend:", data);

      saveUserToLocalStorage({
        name: data.client.nombre,
        email: data.client.email,
        company: data.client.company,
        direccion: data.client.direccion,
        documento: data.client.documento,
        telefono: data.client.telefono,
        isAuthenticated: true,
      });

      setOriginalData(editableData);

      // Volver a modo lectura
      setEditingField(null);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (editingField) {
      setEditableData({
        ...editableData,
        [editingField]: originalData[editingField],
      });
    }
    setEditingField(null);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="space-y-1 w-full max-w-md">
        {clientData.map((item, index) => {
          const IconComponent = item.icon;
          const isEditing = editingField === item.key;
          const editable = isFieldEditable(item.key);

          return (
            <div
              key={index}
              className="group flex items-center py-4 px-1 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200"
            >
              <div className="flex items-center min-w-0 flex-1">
                <IconComponent className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  {isEditing && editable ? (
                    <input
                      type="text"
                      value={editableData[item.key]}
                      onChange={(e) =>
                        setEditableData({ ...editableData, [item.key]: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 truncate">
                      {editableData[item.key] || "No especificado"}
                    </p>
                  )}
                </div>
              </div>
              {editable && !isEditing && (
                <button onClick={() => setEditingField(item.key)} className="ml-3">
                  <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              {isEditing && editable && (
                <div className="flex gap-2 ml-3">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:underline text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
