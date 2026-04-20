import type { LucideIcon } from 'lucide-react';
import {
  BookOpenText,
  Map,
  Radio,
  UserRound,
  UsersRound
} from 'lucide-react';

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: 'Journal', to: '/journal', icon: BookOpenText },
  { label: 'Feed', to: '/feed', icon: Radio },
  { label: 'Map', to: '/map', icon: Map },
  { label: 'Sessions', to: '/sessions', icon: UsersRound },
  { label: 'Profile', to: '/profile', icon: UserRound }
];
