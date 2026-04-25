"use client";

import { useState } from "react";
import Dropdown from "./DropDown";
import NavItem from "./NavItem";
import { User } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const isLoggedIn = true; // TODO: napojit na auth
  const isAdmin = true; // TODO: role check

  if (!isLoggedIn) {
    return <NavItem label="Login" href="/login" />;
  }

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer transition"
      >
        <User className="w-5 h-5 text-slate-700" />
      </div>

      {open && (
        <Dropdown>
          <NavItem label="Profile" href="/profile" />
          <NavItem label="My Tickets" href="/tickets" />
          {isAdmin && <NavItem label="Admin" href="/admin" />}
          <div className="h-px bg-slate-200 my-1" />
          <NavItem label="Logout" href="/logout" />
        </Dropdown>
      )}
    </div>
  );
}
