"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
    children: React.ReactNode;
    href: string;
}

export default function SidebarButton({ href, children }: SidebarButtonProps) {
    const pathName = usePathname();
    return (
        <Button variant={pathName === `${href}` ? "secondary" : "ghost"} className="justify-start gap-2" asChild>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}