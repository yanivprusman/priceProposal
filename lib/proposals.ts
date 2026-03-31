import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { StoredProposal } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROPOSALS_FILE = path.join(DATA_DIR, 'proposals.json');

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readProposals(): StoredProposal[] {
  ensureDataDir();
  if (!fs.existsSync(PROPOSALS_FILE)) return [];
  const raw = fs.readFileSync(PROPOSALS_FILE, 'utf-8');
  return JSON.parse(raw);
}

export function writeProposals(proposals: StoredProposal[]) {
  ensureDataDir();
  const tmp = PROPOSALS_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(proposals, null, 2));
  fs.renameSync(tmp, PROPOSALS_FILE);
}

export function generateId(): string {
  return crypto.randomUUID().slice(0, 8);
}
