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

export interface StoredProposal extends ProposalData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProposalSummary {
  id: string;
  name: string;
  updatedAt: string;
}
