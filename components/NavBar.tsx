import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { auth, signIn, signOut } from "@/auth";

const NavBar = async () => {
	const userSession = await auth();
	console.log(userSession);
	return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<nav className="flex justify-between items-center">
				<Link href="/">
					<Image src="/logo.png" alt="Muninn Logo" width={40} height={40} />
				</Link>

				<div className="flex items-center gap-5 text-black">
					{userSession && userSession?.user ? (
						<>
							<form
								action={async () => {
									"use server";
									await signOut({ redirectTo: "/" });
								}}
							>
								<button type="submit">Logout</button>
							</form>

							<Link href="/">
								<span>{userSession?.user.name}</span>
							</Link>

							<Link href="/">
								<Avatar>
									<AvatarImage src={userSession?.user.image ?? undefined} className="w-10 h-10" />
									<AvatarFallback>{userSession?.user.name ? userSession.user.name.charAt(0) : "P"}</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<form
							action={async () => {
								"use server";
								await signIn("github");
							}}
						>
							<button type="submit">Login</button>
						</form>
					)}
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
