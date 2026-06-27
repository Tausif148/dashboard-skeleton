import { useCallback, useMemo, useState } from 'react';

type Direction = 'asc' | 'desc';

export default function useTableSort<T extends Record<string, any> = Record<string, any>>(list: T[] | undefined, initialKey: string | null = null) {
  const [sortKey, setSortKey] = useState<string | null>(initialKey);
  const [sortDirection, setSortDirection] = useState<Direction>('asc');

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  }, [sortKey]);

  const sortedList = useMemo(() => {
    if (!list) return [] as T[];
    if (!sortKey) return list;

    const isNumericString = (v: any) => typeof v === 'string' && /^\s*-?\d+(?:\.\d+)?\s*$/.test(v);
    const isDateString = (v: any) => {
      if (typeof v !== 'string') return false;
      // simple ISO/date-like heuristic
      return /\d{4}-\d{2}-\d{2}/.test(v);
    };

    const getComparable = (v: any) => {
      if (v === null || v === undefined) return null;
      if (typeof v === 'number') return v;
      if (isNumericString(v)) return parseFloat(v as string);
      if (isDateString(v)) {
        const t = Date.parse(v);
        return Number.isNaN(t) ? String(v).trim().toLowerCase() : t;
      }
      return String(v).trim().toLowerCase();
    };

    const sorted = [...list].sort((a: T, b: T) => {
      const avRaw = (a as any)[sortKey];
      const bvRaw = (b as any)[sortKey];
      const av = getComparable(avRaw);
      const bv = getComparable(bvRaw);

      // handle null/undefined: place nulls at the end for ascending
      if (av === null && bv === null) return 0;
      if (av === null) return sortDirection === 'asc' ? 1 : -1;
      if (bv === null) return sortDirection === 'asc' ? -1 : 1;

      // numeric compare
      if (typeof av === 'number' && typeof bv === 'number') {
        if (av < bv) return sortDirection === 'asc' ? -1 : 1;
        if (av > bv) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }

      // date compare (timestamps are numbers so covered above), otherwise string compare
      const aStr = String(av);
      const bStr = String(bv);
      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [list, sortKey, sortDirection]);

  return { sortKey, sortDirection, handleSort, sortedList, setSortKey, setSortDirection };
}
