'use client';

import { ProposalData } from './ProposalPreview';

interface Props {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
  onPrint: () => void;
}

function Field({
  label,
  value,
  onChange,
  multiline,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const base = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 mb-1 block">{label}</span>
      {multiline ? (
        <textarea
          data-id={`field-${label}`}
          className={base + ' resize-y'}
          rows={rows ?? 4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          data-id={`field-${label}`}
          className={base}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export default function ProposalForm({ data, onChange, onPrint }: Props) {
  const set = (key: keyof ProposalData) => (v: string) =>
    onChange({ ...data, [key]: v });

  return (
    <div className="space-y-4 p-6" dir="rtl">
      <h2 className="text-lg font-bold text-gray-900 mb-2">פרטי ההצעה</h2>

      <Field label="שם חברה" value={data.companyName} onChange={set('companyName')} />
      <Field label="תאריך" value={data.date} onChange={set('date')} />
      <Field label="כותרת" value={data.title} onChange={set('title')} />
      <Field label="תיאור העבודה" value={data.body} onChange={set('body')} multiline rows={8} />
      <Field label="תנאים ולוח זמנים" value={data.terms} onChange={set('terms')} multiline rows={4} />

      <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">פרטי קשר</h2>

      <Field label="שם" value={data.contactName} onChange={set('contactName')} />
      <Field label="טלפון" value={data.contactPhone} onChange={set('contactPhone')} />
      <Field label="מייל" value={data.contactEmail} onChange={set('contactEmail')} />

      <button
        data-id="print-proposal"
        onClick={onPrint}
        className="w-full mt-4 bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 cursor-pointer transition-colors"
      >
        הדפסה / שמירה כ-PDF
      </button>
    </div>
  );
}
