import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<main>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<SidebarProvider>
						<AppSidebar />
						<SidebarTrigger />
						{children}
						<Toaster />
					</SidebarProvider>
				</ThemeProvider>
			</main>
		</>
	);
}
