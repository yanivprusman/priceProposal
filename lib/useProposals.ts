'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ProposalData, StoredProposal, ProposalSummary } from './types';

const DEBOUNCE_MS = 800;

export function useProposals() {
  const [proposals, setProposals] = useState<ProposalSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeProposal, setActiveProposal] = useState<StoredProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch proposal list
  const fetchList = useCallback(async () => {
    const res = await fetch('/api/proposals');
    const data: ProposalSummary[] = await res.json();
    setProposals(data);
    return data;
  }, []);

  // Fetch a single proposal
  const fetchProposal = useCallback(async (id: string) => {
    const res = await fetch(`/api/proposals/${id}`);
    if (!res.ok) return;
    const data: StoredProposal = await res.json();
    setActiveProposal(data);
  }, []);

  // Load list on mount
  useEffect(() => {
    fetchList().then((list) => {
      if (list.length > 0) {
        setActiveId(list[0].id);
      }
      setLoading(false);
    });
  }, [fetchList]);

  // Load full proposal when activeId changes
  useEffect(() => {
    if (activeId) fetchProposal(activeId);
  }, [activeId, fetchProposal]);

  // Create a new proposal
  const createProposal = useCallback(async () => {
    const res = await fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const created: StoredProposal = await res.json();
    setProposals((prev) => [...prev, { id: created.id, name: created.name, updatedAt: created.updatedAt }]);
    setActiveId(created.id);
    setActiveProposal(created);
  }, []);

  // Delete a proposal
  const deleteProposal = useCallback(async (id: string) => {
    await fetch(`/api/proposals/${id}`, { method: 'DELETE' });
    setProposals((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (activeId === id) {
        const newActive = next.length > 0 ? next[0].id : null;
        setActiveId(newActive);
        if (!newActive) setActiveProposal(null);
      }
      return next;
    });
  }, [activeId]);

  // Debounced save
  const updateProposal = useCallback((data: Partial<ProposalData> & { name?: string }) => {
    if (!activeId || !activeProposal) return;

    // Update local state immediately
    const updated = { ...activeProposal, ...data };
    setActiveProposal(updated);

    // Update name in list if changed
    if (data.name !== undefined) {
      setProposals((prev) => prev.map((p) => (p.id === activeId ? { ...p, name: data.name! } : p)));
    }

    // Debounce the server save
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);

    debounceRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      await fetch(`/api/proposals/${activeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSaveStatus('saved');
      savedTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2000);
    }, DEBOUNCE_MS);
  }, [activeId, activeProposal]);

  return {
    proposals,
    activeId,
    activeProposal,
    loading,
    saveStatus,
    setActiveId,
    createProposal,
    deleteProposal,
    updateProposal,
  };
}
