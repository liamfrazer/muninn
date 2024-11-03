"use client";

import React from "react";
import { useTheme } from "next-themes";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Laptop, Moon, Sun } from "lucide-react";

export default function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<Select onValueChange={setTheme}>
			<SelectTrigger className="w-[220px]">
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">
					<div className="flex items-center px-1 py-1.5 text-left text-sm">
						<Sun className="mr-2 h-4 w-4" />
						<span className="truncate font-semibold">Light</span>
					</div>
				</SelectItem>
				<SelectItem value="dark">
					<div className="flex items-center px-1 py-1.5 text-left text-sm">
						<Moon className="mr-2 h-4 w-4" />
						<span className="truncate font-semibold">Dark</span>
					</div>
				</SelectItem>
				<SelectItem value="system">
					<div className="flex items-center px-1 py-1.5 text-left text-sm">
						<Laptop className="mr-2 h-4 w-4" />
						<span className="truncate font-semibold">System</span>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
