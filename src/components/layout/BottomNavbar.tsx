import { NavLink, useLocation } from 'react-router-dom';
import { cn } from "@/utils/cn.ts";
import {NAV_CONFIG} from "@/types";

export const BottomNavbar = () => {
    const { pathname } = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-(--color-surface)/80 backdrop-blur-lg border-t border-(--color-border) pb-(env(safe-area-inset-bottom))">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
                {NAV_CONFIG.map((item) => {
                    const Icon = item.icon;

                    const isRootMatch = item.root === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.root);

                    const isSubPathMatch = item.subPaths.some(path => pathname.startsWith(path));

                    const isActive = isRootMatch || isSubPathMatch;

                    return (
                        <NavLink
                            key={item.root}
                            to={item.root}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all",
                                isActive ? "text-(--color-primary)" : "text-(--color-muted)"
                            )}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-tight">
                                {item.label}
                            </span>

                            {isActive && (
                                <div className="absolute top-0 w-8 h-1 rounded-b-full bg-(--color-primary)" />
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};