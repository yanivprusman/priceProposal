import { NextResponse } from 'next/server';
import { readProposals, writeProposals, generateId } from '@/lib/proposals';
import { ProposalSummary, StoredProposal } from '@/lib/types';
import { defaultProposalData } from '@/lib/defaults';

export async function GET() {
  const proposals = readProposals();
  const summaries: ProposalSummary[] = proposals.map(({ id, name, updatedAt }) => ({
    id,
    name,
    updatedAt,
  }));
  return NextResponse.json(summaries);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const now = new Date().toISOString();
  const freshDefault = defaultProposalData();

  const proposal: StoredProposal = {
    ...freshDefault,
    ...body,
    id: generateId(),
    name: body.title || freshDefault.title,
    createdAt: now,
    updatedAt: now,
  };

  const proposals = readProposals();
  proposals.push(proposal);
  writeProposals(proposals);

  return NextResponse.json(proposal, { status: 201 });
}
