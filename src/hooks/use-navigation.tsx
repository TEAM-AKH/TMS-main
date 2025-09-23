"use client";

import { usePathname } from "next/navigation";
import {
  Briefcase,
  CheckSquare,
  BookCopy,
  CalendarDays,
  Folder,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  PenSquare,
  TrendingUp,
} from "lucide-react";

export const useNavigation = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      isActive: pathname.startsWith("/tasks"),
    },
    {
      label: "Projects",
      href: "/projects",
      icon: Briefcase,
      isActive: pathname.startsWith("/projects"),
    },
    {
      label: "Minutes of Meeting",
      href: "/mom",
      icon: BookCopy,
      isActive: pathname.startsWith("/mom"),
    },
    {
      label: "Team",
      href: "/team",
      icon: Users,
      isActive: pathname.startsWith("/team"),
    },
    {
      label: "Chats",
      href: "/chats",
      icon: MessageSquare,
      isActive: pathname.startsWith("/chats"),
    },
    {
      label: "Conflict Management",
      href: "/conflict",
      icon: CalendarDays,
      isActive: pathname.startsWith("/conflict"),
    },
    {
      label: "Design Your Day",
      href: "/planner",
      icon: PenSquare,
      isActive: pathname.startsWith("/planner"),
    },
    {
      label: "Employee KPI",
      href: "/kpi",
      icon: TrendingUp,
      isActive: pathname.startsWith("/kpi"),
    },
    {
      label: "Storage",
      href: "/storage",
      icon: Folder,
      isActive: pathname.startsWith("/storage"),
    },
  ];

  const settingsLink = {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    isActive: pathname.startsWith("/settings"),
  };

  return { navLinks, settingsLink };
};
