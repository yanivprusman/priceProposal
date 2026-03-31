'use client';

import { useState } from 'react';
import ProposalForm from './components/ProposalForm';
import ProposalPreview, { ProposalData, defaultProposal } from './components/ProposalPreview';

export default function Home() {
  const [data, setData] = useState<ProposalData>(defaultProposal);

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
