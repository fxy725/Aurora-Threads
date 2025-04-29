"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 初始化：根据系统或本地存储设置主题
    const dark =
      window.localStorage.getItem("theme") === "dark" ||
      (!window.localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    window.localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition text-xl"
      onClick={toggleTheme}
      aria-label="切换暗色模式"
      title={isDark ? "切换为浅色" : "切换为深色"}
    >
      {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </button>
  );
}
