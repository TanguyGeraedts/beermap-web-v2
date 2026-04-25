import { BookOpenText, type LucideIcon, Map, Radio, UserRound, Zap } from 'lucide-react';

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: 'Journal', to: '/journal', icon: BookOpenText },
  { label: 'Feed', to: '/feed', icon: Radio },
  { label: 'Map', to: '/map', icon: Map },
  { label: 'Sessions', to: '/sessions', icon: Zap },
  { label: 'Profile', to: '/profile', icon: UserRound }
];
