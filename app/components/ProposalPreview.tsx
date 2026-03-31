'use client';

export interface ProposalData {
  companyName: string;
  date: string;
  title: string;
  body: string;
  terms: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

export const defaultProposal: ProposalData = {
  companyName: 'ג.ת פרויקטים',
  date: new Date().toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  title: 'הצעת מחיר לכיבי הלבשה',
  body: `הצעת מחיר עבור כיבי 3 דירות בתל אביב
שטח כולל של כ-200 מ"ר כולל דירה
מחיר: 43,000 ₪

כולל חומרים ועבודה מלאה
ביצוע מקצועי בהתאם לתקנים`,
  terms: `לוח זמנים: 12 ימי עבודה מיום תחילת העבודה
תוקף ההצעה: עד 1/6/2024
תנאי תשלום: 50% בתחילת העבודה, 50% בסיום`,
  contactName: '',
  contactPhone: '055-6877-260',
  contactEmail: 'Yantopcomel@gmail.com',
};

const STRIPE_COLORS = [
  '#5C4033',
  '#2A9D8F',
  '#C4A67D',
  '#E07A3A',
  '#D4C5A9',
  '#B8A88A',
  '#8B6F47',
  '#3D2B1F',
];

export default function ProposalPreview({ data }: { data: ProposalData }) {
  return (
    <div id="proposal-preview" className="bg-white text-black w-[210mm] min-h-[297mm] mx-auto p-12" dir="rtl" style={{ fontFamily: 'var(--font-heebo), sans-serif' }}>
      {/* Company Header */}
      <div className="flex items-center justify-end gap-3 mb-2">
        <span className="text-xl font-bold text-gray-800">{data.companyName}</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5C4033" strokeWidth="1.5">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" />
        </svg>
      </div>

      {/* Color Stripe Bar */}
      <div className="flex h-3 mb-8 rounded-sm overflow-hidden">
        {STRIPE_COLORS.map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Date */}
      <div className="text-sm text-gray-600 mb-6">{data.date}</div>

      {/* Title */}
      <h1 className="text-xl font-bold text-center mb-6 text-gray-900">{data.title}</h1>

      {/* Body */}
      <div className="text-sm leading-7 text-gray-800 mb-6 whitespace-pre-wrap">{data.body}</div>

      {/* Terms */}
      {data.terms && (
        <div className="text-sm leading-7 text-gray-700 mb-10 whitespace-pre-wrap border-t border-gray-200 pt-4">
          {data.terms}
        </div>
      )}

      {/* Signature / Contact */}
      <div className="mt-auto pt-8 text-sm text-gray-700 space-y-1">
        {data.contactName && <div>שם: {data.contactName}</div>}
        {data.contactPhone && <div>טלפון: {data.contactPhone}</div>}
        {data.contactEmail && <div>מייל: {data.contactEmail}</div>}
      </div>
    </div>
  );
}
