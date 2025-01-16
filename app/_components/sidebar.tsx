"use client"


import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";


export default function Sidebar() {

    return (
        <div className="w-64 bg-white">
            <div className="px-8 py-6">
                <h1 className="font-bold text-2xl">STOCKLY</h1>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <SidebarButton href="/">
                    <LayoutGridIcon size={25} /> Dashboard
                </SidebarButton>

                <SidebarButton href="/products">
                    <PackageIcon size={25} /> Produtos
                </SidebarButton>

                <SidebarButton href="/sales">
                    <ShoppingBasketIcon size={25} /> Vendas
                </SidebarButton>
            </div>
        </div>
    )
}