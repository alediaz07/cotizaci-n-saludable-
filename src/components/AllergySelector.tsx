import React, { useState } from 'react';
import { AlertCircle, Plus, Trash2, ShieldAlert, Check, CheckCircle2, Save } from 'lucide-react';

interface AllergySelectorProps {
  allergiesText: string;
  onChangeAllergies: (text: string) => void;
}

interface AllergyEntry {
  id: string;
  name: string;
  mealType: 'Desayuno' | 'Almuerzo' | 'Ambos';
  attendeesCount: string;
}

const COMMON_ALLERGIES = [
  'Frutos secos / Maní',
  'Mariscos / Pescados',
  'Gluten / Trigo',
  'Lácteos / Leche',
  'Huevo',
  'Soya',
  'Sésamo / Ajonjolí',
];

export const AllergySelector: React.FC<AllergySelectorProps> = ({
  allergiesText,
  onChangeAllergies,
}) => {
  const [allergies, setAllergies] = useState<AllergyEntry[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const formatEntries = (entries: AllergyEntry[]) => {
    if (entries.length === 0) return '';
    return entries
      .filter((a) => a.name.trim().length > 0)
      .map((a) => {
        const countText = a.attendeesCount.trim() ? ` (${a.attendeesCount.trim()})` : '';
        return `• Alergia: ${a.name.trim()} — Aplica a: ${a.mealType}${countText}`;
      })
      .join('\n');
  };

  const handleSave = () => {
    const formatted = formatEntries(allergies);
    onChangeAllergies(formatted);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  const handleAddAllergy = (initialName: string = '') => {
    const newEntry: AllergyEntry = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      name: initialName,
      mealType: 'Ambos',
      attendeesCount: '1 persona',
    };
    const updated = [...allergies, newEntry];
    setAllergies(updated);
    // Auto-update parent as well
    onChangeAllergies(formatEntries(updated));
    setIsSaved(false);
  };

  const handleRemoveAllergy = (id: string) => {
    const updated = allergies.filter((a) => a.id !== id);
    setAllergies(updated);
    onChangeAllergies(formatEntries(updated));
    setIsSaved(false);
  };

  const handleUpdateAllergy = (id: string, updates: Partial<AllergyEntry>) => {
    const updated = allergies.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAllergies(updated);
    onChangeAllergies(formatEntries(updated));
    setIsSaved(false);
  };

  return (
    <div className="my-8 bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#111111]">
              Alergias Alimentarias
            </h3>
            <p className="text-xs text-neutral-500">
              Especifique si algún asistente tiene alguna alergia alimentaria y a qué comida aplica (desayuno, almuerzo o ambos).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={() => handleAddAllergy()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar alergia</span>
          </button>

          {/* Botón Guardar */}
          <button
            type="button"
            onClick={handleSave}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C8102E] hover:bg-[#a60d25] text-white'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Guardado</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick suggestions to quickly add common allergies */}
      <div className="mb-5">
        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
          Alergias comunes (clic para añadir):
        </span>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map((item) => {
            const isAlreadyAdded = allergies.some((a) => a.name.toLowerCase() === item.toLowerCase());
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (!isAlreadyAdded) {
                    handleAddAllergy(item);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  isAlreadyAdded
                    ? 'bg-neutral-800 text-white opacity-80 cursor-default'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {isAlreadyAdded ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Plus className="w-3 h-3 text-neutral-400" />
                )}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List of active allergy entries */}
      {allergies.length === 0 ? (
        <div className="p-4 bg-neutral-50 rounded-xl border border-dashed border-neutral-300 text-center">
          <p className="text-xs text-neutral-500 mb-2">
            No se han registrado alergias. Si el equipo presenta alguna, regístrela aquí.
          </p>
          <button
            type="button"
            onClick={() => handleAddAllergy()}
            className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Haga clic para agregar una alergia</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {allergies.map((entry, index) => (
            <div
              key={entry.id}
              className="p-3.5 sm:p-4 bg-neutral-50 rounded-xl border border-neutral-200/90 flex flex-col sm:flex-row sm:items-center gap-3 transition-all"
            >
              {/* Allergy input */}
              <div className="flex-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  ¿Cuál alergia? #{index + 1}
                </label>
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => handleUpdateAllergy(entry.id, { name: e.target.value })}
                  placeholder="Ej: Frutos secos, Mariscos, Gluten..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C8102E] focus:border-[#C8102E]"
                />
              </div>

              {/* Meal type selector */}
              <div className="sm:w-56">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  ¿A qué comida aplica?
                </label>
                <div className="grid grid-cols-3 gap-1 bg-white p-0.5 rounded-lg border border-neutral-300 text-xs">
                  {(['Desayuno', 'Almuerzo', 'Ambos'] as const).map((meal) => (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => handleUpdateAllergy(entry.id, { mealType: meal })}
                      className={`py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer text-center ${
                        entry.mealType === meal
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {meal}
                    </button>
                  ))}
                </div>
              </div>

              {/* People count / Details */}
              <div className="sm:w-36">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  Cantidad / Nota
                </label>
                <input
                  type="text"
                  value={entry.attendeesCount}
                  onChange={(e) => handleUpdateAllergy(entry.id, { attendeesCount: e.target.value })}
                  placeholder="Ej: 1 persona"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C8102E] focus:border-[#C8102E]"
                />
              </div>

              {/* Remove button */}
              <div className="sm:self-end pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => handleRemoveAllergy(entry.id)}
                  className="p-2 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar esta alergia"
                  aria-label="Eliminar alergia"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAddAllergy()}
              className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar otra alergia</span>
            </button>

            {/* Action to save */}
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs self-start sm:self-auto ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#C8102E] hover:bg-[#a60d25] text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Guardado</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation hint & saved status */}
      {allergiesText && allergiesText.trim().length > 0 && (
        <div className="mt-4 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-800">Alergias guardadas para la cotización:</strong>
            <p className="text-emerald-700 mt-0.5 whitespace-pre-line font-mono text-[10px]">
              {allergiesText}
            </p>
            <p className="text-emerald-600/90 mt-1 text-[10px]">
              Al presionar &quot;Confirmar por Correo&quot; en la ficha de menú que seleccione abajo, esta información se incluirá automáticamente en el correo formal a NODIVA.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
