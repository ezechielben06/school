
"use client";

import { useAuth } from '@/lib/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  Bell,
  Search,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, role, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Ressources', href: '/resources', icon: BookOpen },
    { name: 'Notes', href: '/grades', icon: GraduationCap },
    ...(role === 'student' ? [{ name: 'AI Tutor', href: '/ai-tutor', icon: Sparkles }] : []),
    ...(role === 'professor' ? [{ name: 'Administration', href: '/admin', icon: Users }] : []),
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F8FAFC]">
        <Sidebar variant="inset" collapsible="icon" className="border-r-0 shadow-2xl">
          <SidebarHeader className="p-6 flex flex-row items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-black text-xl tracking-tighter leading-none font-headline">ScholaDesk</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Platform AI</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 mt-6">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name} className="mb-2">
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className={`h-12 rounded-xl transition-all ${pathname === item.href ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-primary/5'}`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-white' : 'text-slate-500'}`} />
                      <span className="font-bold">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            {/* Quick Actions in Sidebar */}
            <div className="mt-auto pt-8 pb-4 group-data-[collapsible=icon]:hidden">
               <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Status Premium</p>
                    <p className="text-sm font-bold mb-4 leading-tight">Accédez à l'IA avancée de ScholaDesk.</p>
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-8 rounded-lg">Mise à jour</Button>
                  </div>
                  <Zap className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12" />
               </div>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-6">
            <div className="flex items-center gap-3 mb-6 group-data-[collapsible=icon]:hidden">
              <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-md">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-black truncate leading-none mb-1">{user.name}</p>
                <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-widest">{role}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors group-data-[collapsible=icon]:justify-center"
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-bold group-data-[collapsible=icon]:hidden">Déconnexion</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="relative">
          <header className={`flex h-20 shrink-0 items-center gap-4 px-8 sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
            <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary" />
            
            <div className="flex-1 hidden md:flex">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Recherche globale..." 
                  className="w-full bg-slate-100 border-none rounded-xl h-10 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary transition-all" 
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl relative bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
                 <Bell className="h-5 w-5 text-slate-600" />
                 <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 border-2 border-white">3</Badge>
               </Button>
               <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
                 <Settings className="h-5 w-5 text-slate-600" />
               </Button>
               <div className="h-10 w-px bg-slate-200 mx-2 hidden sm:block" />
               <Avatar className="h-11 w-11 border-2 border-white shadow-lg hidden sm:block">
                 <AvatarImage src={user.avatar} />
                 <AvatarFallback>U</AvatarFallback>
               </Avatar>
            </div>
          </header>
          
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
