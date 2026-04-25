"use client";

import NavItem from "./NavItem";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tickets", href: "/tickets" },
  { label: "Team", href: "/team" },
];

export default function NavItems() {
  return (
    <div className="flex items-center gap-2">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </div>
  );
}
