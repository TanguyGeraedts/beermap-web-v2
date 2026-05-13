/**
 * Formats an ISO date string into a human-readable relative time.
 * @param iso - The ISO date string to format.
 * @returns A string representing the time elapsed (e.g., "5m ago", "2h ago").
 */
export function formatTimeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);

    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;

    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;

    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}