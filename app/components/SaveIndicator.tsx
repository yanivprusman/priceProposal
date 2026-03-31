'use client';

export default function SaveIndicator({ status }: { status: 'idle' | 'saving' | 'saved' }) {
  if (status === 'idle') return null;

  return (
    <span className="text-xs text-gray-500 transition-opacity">
      {status === 'saving' && 'שומר...'}
      {status === 'saved' && '\u2713 נשמר'}
    </span>
  );
}
