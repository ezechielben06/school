
"use client";

import { useAuth } from '@/lib/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, role, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Grades', href: '/grades', icon: GraduationCap },
    ...(role === 'student' ? [{ name: 'AI Tutor', href: '/ai-tutor', icon: Sparkles }] : []),
    ...(role === 'professor' ? [{ name: 'Administration', href: '/admin', icon: Users }] : []),
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="p-4 flex flex-row items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight group-data-[collapsible=icon]:hidden font-headline">ScholaDesk AI</span>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3 mb-4 group-data-[collapsible=icon]:hidden">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold truncate leading-none mb-1">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate uppercase font-bold tracking-widest">{role}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 h-9 px-2 hover:bg-destructive/10 hover:text-destructive group-data-[collapsible=icon]:justify-center"
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-background/50 backdrop-blur-md sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {pathname === '/dashboard' ? 'Home' : pathname.slice(1).replace('-', ' ')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
               <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                 <Settings className="h-4 w-4 text-accent" />
               </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
