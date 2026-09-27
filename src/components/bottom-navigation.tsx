"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./ui";

export function BottomNavigation() {
  const pathname = usePathname();
  return <nav className="bottom-nav" aria-label="メインナビゲーション"><div className="bottom-nav-inner">{navItems.map(({ href, label, icon: Icon }) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={21} strokeWidth={active ? 2.4 : 1.9} /><span>{label}</span></Link>;
  })}</div></nav>;
}
