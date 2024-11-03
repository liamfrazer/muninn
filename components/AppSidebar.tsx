import Link from "next/link";
import Image from "next/image";

import { auth, signIn, signOut } from "@/auth";
import { ChevronsUpDown, Home, LogIn, LogOut, Search, Settings } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ModeToggle from "@/components/ThemeToggle";

const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export async function AppSidebar() {
	const userSession = await auth();
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Link href="/">
							<Image src="/logo.png" alt="Muninn Logo" width={40} height={40} />
						</Link>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
									{userSession?.user ? (
										<>
											<Avatar className="h-8 w-8 rounded-lg">
												<AvatarImage src={userSession?.user.image ?? undefined} alt={userSession?.user.name ?? undefined} />
												<AvatarFallback className="rounded-lg">{userSession?.user.name ? userSession.user.name.charAt(0) : "P"}</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">{userSession?.user.name}</span>
												<span className="truncate text-xs">{userSession?.user.email}</span>
											</div>
										</>
									) : (
										<span className="truncate font-semibold">Login via Github</span>
									)}
									<ChevronsUpDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="top" className="w-[--radix-popper-ancor-width] min-w-56 rounded-lg">
								{userSession?.user && (
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8 rounded-lg">
												<AvatarImage src={userSession?.user.image ?? undefined} alt={userSession?.user.name ?? undefined} />
												<AvatarFallback className="rounded-lg">{userSession?.user.name ? userSession.user.name.charAt(0) : "P"}</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">{userSession?.user.name}</span>
												<span className="truncate text-xs">{userSession?.user.email}</span>
											</div>
										</div>
									</DropdownMenuLabel>
								)}
								<DropdownMenuSeparator />
								<ModeToggle />
								<DropdownMenuSeparator />
								{/* <DropdownMenuItem>
									<Image src="/github-mark.png" alt="Github Logo" width={25} height={25} />
									<a href="https://github.com/liamfrazer/muninn">Github</a>
								</DropdownMenuItem> */}

								{userSession?.user ? (
									<DropdownMenuItem
										onClick={async () => {
											"use server";
											await signOut({ redirectTo: "/" });
										}}
									>
										<LogOut />
										<span>Logout</span>
									</DropdownMenuItem>
								) : (
									<DropdownMenuItem
										onClick={async () => {
											"use server";
											await signIn("github");
										}}
									>
										<LogIn />
										<span>Login</span>
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
