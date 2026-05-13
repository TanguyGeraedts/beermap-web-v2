import { BookOpen, Rss, MapIcon, Activity, User } from 'lucide-react';

export const NAV_CONFIG = [
    {
        label: 'Journal',
        root: '/journal',
        icon: BookOpen,
        subPaths: []
    },
    {
        label: 'Feed',
        root: '/feed',
        icon: Rss,
        subPaths: []
    },
    {
        label: 'Map',
        root: '/',
        icon: MapIcon,
        subPaths: ['/log', '/snap']
    },
    {
        label: 'Sessions',
        root: '/sessions',
        icon: Activity,
        subPaths: ['/sessions/active', '/sessions/summary']
    },
    {
        label: 'Profile',
        root: '/profile',
        icon: User,
        subPaths: ['/profile/edit', '/profile/stats', '/profile/friends', '/settings']
    },
];