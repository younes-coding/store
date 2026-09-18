import React from 'react';

export const SkeletonRow: React.FC = () => {
  return (
    <tr className="animate-pulse border-b border-slate-800/60">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 bg-slate-800/80 rounded-xl shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-slate-800/80 rounded w-44" />
            <div className="h-2.5 bg-slate-800/50 rounded w-28" />
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="h-3 bg-slate-800/70 rounded w-20" />
      </td>
      <td className="py-4 px-4">
        <div className="h-3 bg-slate-800/70 rounded w-16" />
      </td>
      <td className="py-4 px-4">
        <div className="h-4 bg-slate-800/70 rounded-full w-24" />
      </td>
      <td className="py-4 px-4 text-right">
        <div className="h-7 bg-slate-800/70 rounded-lg w-16 ml-auto" />
      </td>
    </tr>
  );
};

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <tbody className="divide-y divide-slate-800/60">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </tbody>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-16 h-20 bg-slate-800 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-800 rounded w-32" />
          <div className="h-3 bg-slate-800/60 rounded w-20" />
          <div className="h-3 bg-slate-800/40 rounded w-full" />
        </div>
      </div>
    </div>
  );
};

