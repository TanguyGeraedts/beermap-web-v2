export type NavItem = {
  label: string;
  to: string;
  marker: string;
};

export const navItems: NavItem[] = [
  { label: 'Home', to: '/', marker: 'H' },
  { label: 'Map', to: '/map', marker: 'M' },
  { label: 'Log', to: '/log', marker: 'L' },
  { label: 'Profile', to: '/profile', marker: 'P' }
];
