const STORAGE_KEY = 'compare_ids';
const UPDATE_EVENT = 'compare-update';

function notify() {
  if (typeof window !== 'undefined') {
    queueMicrotask(() => window.dispatchEvent(new Event(UPDATE_EVENT)));
  }
}

export function addToCompare(laptopId: string): void {
  const current = getCompareIds();
  if (!current.includes(laptopId)) {
    current.push(laptopId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    notify();
  }
}

export function removeFromCompare(laptopId: string): void {
  const current = getCompareIds();
  const updated = current.filter((id) => id !== laptopId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notify();
}

export function resetCompare(): void {
  localStorage.removeItem(STORAGE_KEY);
  notify();
}

export function getCompareIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function isInCompare(laptopId: string): boolean {
  return getCompareIds().includes(laptopId);
}

export function getCompareCount(): number {
  return getCompareIds().length;
}
