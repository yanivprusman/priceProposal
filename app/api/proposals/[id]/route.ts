import { NextResponse } from 'next/server';
import { readProposals, writeProposals } from '@/lib/proposals';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proposals = readProposals();
  const proposal = proposals.find((p) => p.id === id);
  if (!proposal) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(proposal);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const proposals = readProposals();
  const index = proposals.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  proposals[index] = {
    ...proposals[index],
    ...body,
    id, // prevent id override
    updatedAt: new Date().toISOString(),
  };
  writeProposals(proposals);

  return NextResponse.json(proposals[index]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proposals = readProposals();
  const index = proposals.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  proposals.splice(index, 1);
  writeProposals(proposals);

  return NextResponse.json({ ok: true });
}
