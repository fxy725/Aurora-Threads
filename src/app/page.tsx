import Image from "next/image";
import AuroraBackground from "./components/AuroraBackground";
import { FaGithub, FaBilibili, FaZhihu } from "react-icons/fa";

const SOCIALS = [
  { icon: FaGithub, url: "https://github.com/", label: "GitHub" },
  { icon: FaBilibili, url: "https://bilibili.com/", label: "Bilibili" },
  { icon: FaZhihu, url: "https://zhihu.com/", label: "Zhihu" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black/90">
      <AuroraBackground />
      <main className="relative z-10 flex flex-col items-center justify-center gap-8 pt-24 pb-16">
        <Image
          src="/logo.svg"
          alt="Aurora Threads Logo"
          width={180}
          height={48}
          className="mb-2 drop-shadow-lg animate-fade-in"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-400 to-pink-300 text-transparent bg-clip-text animate-gradient-move">
          Aurora Threads
        </h1>
        <p className="text-lg md:text-xl text-gray-200 dark:text-gray-300 text-center max-w-2xl mt-2 animate-fade-in-delay">
          Welcome to a creative, modern, and multilingual tech blog.<br />
          <span className="font-semibold text-pink-300">By KaKaa</span>
        </p>
        <div className="flex gap-4 items-center mt-4 animate-fade-in-delay2">
          {SOCIALS.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-2xl text-white hover:text-cyan-300 transition-colors drop-shadow-lg"
            >
              <Icon />
            </a>
          ))}
        </div>
        <div className="flex gap-4 mt-8 animate-fade-in-delay3">
          <a
            href="#blog"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Enter Blog
          </a>
          <button
            className="px-6 py-2 rounded-full border border-white/40 text-white font-semibold bg-black/30 hover:bg-white/10 backdrop-blur-md shadow-lg transition-colors"
          >
            About Me
          </button>
        </div>
        <div className="flex gap-3 mt-8 animate-fade-in-delay4">
          {/* 多语言切换按钮预留 */}
          <button className="px-3 py-1 rounded text-xs bg-white/20 text-white hover:bg-cyan-400/50">简体</button>
          <button className="px-3 py-1 rounded text-xs bg-white/20 text-white hover:bg-cyan-400/50">繁體</button>
          <button className="px-3 py-1 rounded text-xs bg-white/20 text-white hover:bg-cyan-400/50">EN</button>
        </div>
      </main>
      <footer className="absolute bottom-0 left-0 w-full text-center text-xs text-gray-300 pb-2 z-10">
        © {new Date().getFullYear()} KaKaa · Aurora Threads
      </footer>
    </div>
  );
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
