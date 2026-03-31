'use client';

import ProposalForm from './components/ProposalForm';
import ProposalPreview from './components/ProposalPreview';
import ProposalList from './components/ProposalList';
import SaveIndicator from './components/SaveIndicator';
import { useProposals } from '@/lib/useProposals';

export default function Home() {
  const {
    proposals,
    activeId,
    activeProposal,
    loading,
    saveStatus,
    setActiveId,
    createProposal,
    deleteProposal,
    updateProposal,
  } = useProposals();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500">טוען...</span>
      </div>
    );
  }

  // Empty state — no proposals yet
  if (proposals.length === 0 && !activeProposal) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-lg">אין הצעות מחיר עדיין</p>
          <button
            data-id="create-first-proposal"
            onClick={createProposal}
            className="bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 cursor-pointer transition-colors"
          >
            + צור הצעה חדשה
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <div className="flex flex-col lg:flex-row max-w-[1800px] mx-auto gap-6 p-6 print:p-0">
        {/* Proposal List - hidden when printing */}
        <div className="w-full lg:w-[220px] shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-h-screen lg:sticky lg:top-6 print:hidden">
          <ProposalList
            proposals={proposals}
            activeId={activeId}
            onSelect={setActiveId}
            onCreate={createProposal}
            onDelete={deleteProposal}
          />
        </div>

        {/* Form - hidden when printing */}
        {activeProposal && (
          <div className="w-full lg:w-[380px] shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-y-auto max-h-screen lg:sticky lg:top-6 print:hidden">
            <div className="flex items-center justify-between px-6 pt-4" dir="rtl">
              <span />
              <SaveIndicator status={saveStatus} />
            </div>
            <ProposalForm
              data={activeProposal}
              name={activeProposal.name}
              onChange={(data) => updateProposal(data)}
              onNameChange={(name) => updateProposal({ name })}
              onPrint={() => window.print()}
            />
          </div>
        )}

        {/* Preview */}
        {activeProposal && (
          <div className="flex-1 print:w-full">
            <div className="shadow-lg border border-gray-200 rounded-xl overflow-hidden print:shadow-none print:border-0 print:rounded-none">
              <ProposalPreview data={activeProposal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
