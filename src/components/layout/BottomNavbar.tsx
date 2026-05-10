import {NavLink} from 'react-router-dom';
import {Activity, BookOpen, MapIcon, Rss, User} from 'lucide-react';
import {cn} from "@/utils/cn.ts";

const navItems = [
    { label: 'Journal', to: '/journal', icon: BookOpen },
    { label: 'Feed', to: '/feed', icon: Rss },
    { label: 'Map', to: '/', icon: MapIcon },
    { label: 'Sessions', to: '/sessions', icon: Activity },
    { label: 'Profile', to: '/profile', icon: User },
];

export const BottomNavbar = () => {
    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-(--color-surface)/80 backdrop-blur-md border-t border-(--color-border) pb-(env(safe-area-inset-bottom))">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({isActive}) => cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                                isActive
                                    ? "text-(--color-primary)"
                                    : "text-(--color-muted) hover:text-(--color-text)"
                            )}
                        >
                            <Icon size={20} strokeWidth={2.25}/>
                            <span className="text-[10px] font-medium uppercase tracking-wider">
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};