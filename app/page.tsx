'use client';

import { useState, useEffect } from 'react';
import ProposalForm from './components/ProposalForm';
import ProposalPreview, { ProposalData, defaultProposal } from './components/ProposalPreview';

const STORAGE_KEY = 'priceProposal_data';

function loadSavedData(): ProposalData {
  if (typeof window === 'undefined') return defaultProposal;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultProposal;
  const parsed = JSON.parse(saved) as ProposalData;
  // Always use today's date
  parsed.date = defaultProposal.date;
  return parsed;
}

export default function Home() {
  const [data, setData] = useState<ProposalData>(defaultProposal);
  const [loaded, setLoaded] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    setData(loadSavedData());
    setLoaded(true);
  }, []);

  // Save to localStorage on every change (after initial load)
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, loaded]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto gap-6 p-6 print:p-0">
        {/* Form - hidden when printing */}
        <div className="w-full lg:w-[380px] shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-y-auto max-h-screen lg:sticky lg:top-6 print:hidden">
          <ProposalForm data={data} onChange={setData} onPrint={handlePrint} />
        </div>

        {/* Preview */}
        <div className="flex-1 print:w-full">
          <div className="shadow-lg border border-gray-200 rounded-xl overflow-hidden print:shadow-none print:border-0 print:rounded-none">
            <ProposalPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
