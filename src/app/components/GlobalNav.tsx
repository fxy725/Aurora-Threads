import Link from "next/link";
import { FaHome, FaBlog, FaUser, FaTags } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "首页", icon: <FaHome /> },
  { href: "/blog", label: "博客", icon: <FaBlog /> },
  { href: "/tags", label: "标签", icon: <FaTags /> },
  { href: "/about", label: "关于我", icon: <FaUser /> },
];

export default function GlobalNav() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <nav className="w-full flex justify-center py-4 bg-white/80 dark:bg-gray-900/80 shadow-sm sticky top-0 z-30 backdrop-blur">
      <div className="flex w-full max-w-5xl items-center justify-between px-4">
        <ul className="flex gap-6 text-base font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  `flex items-center gap-1 px-3 py-1 rounded transition hover:bg-cyan-50 dark:hover:bg-cyan-900 hover:text-cyan-700 ` +
                  (pathname.startsWith(item.href) && item.href !== "/"
                    ? "text-cyan-600 bg-cyan-100 dark:bg-cyan-950"
                    : pathname === item.href
                    ? "text-cyan-600 bg-cyan-100 dark:bg-cyan-950"
                    : "text-gray-700 dark:text-gray-200")
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
