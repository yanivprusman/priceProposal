'use client';

import { ProposalSummary } from '@/lib/types';

interface Props {
  proposals: ProposalSummary[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'עכשיו';
  if (minutes < 60) return `לפני ${minutes} דק׳`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `לפני ${hours} שע׳`;
  const days = Math.floor(hours / 24);
  return `לפני ${days} ימים`;
}

export default function ProposalList({ proposals, activeId, onSelect, onCreate, onDelete }: Props) {
  return (
    <div className="flex flex-col h-full" dir="rtl">
      <div className="p-4 border-b border-gray-200">
        <button
          data-id="create-proposal"
          onClick={onCreate}
          className="w-full bg-blue-600 text-white font-medium py-2 px-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 cursor-pointer transition-colors text-sm"
        >
          + הצעה חדשה
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {proposals.map((p) => (
          <div
            key={p.id}
            data-id={`proposal-item-${p.id}`}
            onClick={() => onSelect(p.id)}
            className={`group flex items-start gap-2 px-4 py-3 cursor-pointer border-b border-gray-100 transition-colors ${
              p.id === activeId
                ? 'bg-blue-50 border-r-2 border-r-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{timeAgo(p.updatedAt)}</div>
            </div>
            <button
              data-id={`delete-proposal-${p.id}`}
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('למחוק את ההצעה?')) onDelete(p.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 cursor-pointer"
              title="מחק"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
