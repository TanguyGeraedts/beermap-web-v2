import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../shared/lib/cn';
import { navItems } from './navItems';

const idleDelay = 1800;

export const BottomNav = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    let timeoutId = window.setTimeout(() => setIsExpanded(false), idleDelay);

    const shrinkSoon = () => {
      window.clearTimeout(timeoutId);
      setIsExpanded(false);
    };

    const expandBriefly = () => {
      setIsExpanded(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsExpanded(false), idleDelay);
    };

    window.addEventListener('scroll', shrinkSoon, { passive: true });
    window.addEventListener('pointermove', expandBriefly, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', shrinkSoon);
      window.removeEventListener('pointermove', expandBriefly);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-[var(--shadow-nav)] backdrop-blur-xl transition-all duration-300',
        isExpanded ? 'px-3 py-3' : 'px-2 py-2'
      )}
      aria-label="Primary"
      onClick={() => setIsExpanded(true)}
    >
      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]',
                isExpanded ? 'gap-2 px-3 py-2' : 'gap-0 px-2 py-2',
                isActive
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]'
              )
            }
            key={item.to}
            to={item.to}
          >
            <span className="grid size-6 place-items-center rounded-full bg-[color-mix(in_srgb,currentColor_12%,transparent)] text-xs">
              {item.marker}
            </span>
            <span
              className={cn(
                'overflow-hidden whitespace-nowrap transition-all duration-300',
                isExpanded ? 'max-w-16 opacity-100' : 'max-w-0 opacity-0'
              )}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
