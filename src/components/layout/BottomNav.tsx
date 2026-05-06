import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from '@/constants/navItems';
import { cn } from '@/utils/cn';

const idleDelay = 1800;

export const BottomNav = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { pathname } = useLocation();

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
        'fixed bottom-8 left-1/2 z-[1200] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-[var(--shadow-nav)] backdrop-blur-xl transition-all duration-300',
        isExpanded ? 'px-3 py-3' : 'px-2 py-2'
      )}
      aria-label="Primary"
      onClick={() => setIsExpanded(true)}
    >
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isProfileSection =
            item.to === '/profile' &&
            (pathname.startsWith('/profile') ||
              pathname.startsWith('/settings') ||
              pathname.startsWith('/stats'));

          return (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]',
                  isActive || isProfileSection
                    ? 'h-12 gap-2 px-4'
                    : isExpanded
                      ? 'size-11'
                      : 'size-9',
                  isActive || isProfileSection
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]'
                )
              }
              key={item.to}
              to={item.to}
              aria-label={item.label}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'shrink-0 transition-all duration-300',
                      isExpanded || isActive || isProfileSection
                        ? 'size-5'
                        : 'size-4'
                    )}
                    aria-hidden="true"
                    strokeWidth={2.25}
                  />
                  {isActive || isProfileSection ? (
                    <span className="text-sm font-bold">{item.label}</span>
                  ) : null}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
