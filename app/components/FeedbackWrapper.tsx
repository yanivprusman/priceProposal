'use client';

import dynamic from 'next/dynamic';
import { feedbackBackend } from '@/lib/feedback-backend';

const FeedbackChat = dynamic(
  () => import('@automate/feedback-lib/core').then(m => m.FeedbackChat),
  { ssr: false }
);

export default function FeedbackWrapper() {
  return <FeedbackChat backend={feedbackBackend} issuesPath="/feedback-lib-issues" />;
}
