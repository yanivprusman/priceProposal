'use client';

import dynamic from 'next/dynamic';

const FeedbackChat = dynamic(
  () => import('@automate/feedback-lib/FeedbackChat').then(m => m.FeedbackChat),
  { ssr: false }
);

export default function FeedbackWrapper() {
  return <FeedbackChat issuesPath="/issues" />;
}
