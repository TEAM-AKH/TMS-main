import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card/60 backdrop-blur-lg px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </div>
        </header>
    );
}
