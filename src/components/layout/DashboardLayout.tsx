import React from 'react';
import Link from 'next/link';
import { Home, LayoutDashboard, Settings, ShoppingBag, Sprout, Truck, LogOut, Bell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'farmer' | 'buyer' | 'hauler';
}

const roleNavItems: Record<string, SidebarItem[]> = {
    farmer: [
        { name: 'Dashboard', href: '/farmers', icon: LayoutDashboard },
        { name: 'My Listings', href: '/farmers/listings', icon: Sprout },
        { name: 'Settings', href: '/farmers/settings', icon: Settings },
    ],
    buyer: [
        { name: 'Marketplace', href: '/buyers', icon: ShoppingBag },
        { name: 'My Orders', href: '/buyers/orders', icon: Truck },
        { name: 'Settings', href: '/buyers/settings', icon: Settings },
    ],
    hauler: [
        { name: 'Dashboard', href: '/haulers', icon: LayoutDashboard },
        { name: 'Active Routes', href: '/haulers/routes', icon: Truck },
        { name: 'Settings', href: '/haulers/settings', icon: Settings },
    ]
};

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const navItems = roleNavItems[role] || [];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex md:flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
                    <Link href="/" className="flex items-center justify-center w-full">
                        <img 
                            src="/logo/logo_horizontal_web.png" 
                            alt="CropFresh Logo" 
                            className="h-8 w-auto object-contain" 
                        />
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                    isActive 
                                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-medium' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={logout}
                        className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center md:hidden">
                        {/* Mobile menu button (placeholder) */}
                        <Link href="/" className="flex items-center gap-2">
                           <Sprout className="w-6 h-6 text-green-600" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
