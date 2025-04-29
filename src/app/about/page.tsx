import Image from "next/image";
import { FaGithub, FaEnvelope, FaZhihu, FaWeixin } from "react-icons/fa";

const SOCIALS = [
  { icon: <FaGithub />, url: "https://github.com/你的GitHub", label: "GitHub" },
  { icon: <FaZhihu />, url: "https://zhihu.com/people/你的知乎", label: "知乎" },
  { icon: <FaEnvelope />, url: "mailto:your@email.com", label: "邮箱" },
  { icon: <FaWeixin />, url: "#", label: "微信" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col items-center">
      <Image
        src="/avatar.png"
        alt="Avatar"
        width={120}
        height={120}
        className="rounded-full shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">关于我</h1>
      <p className="text-gray-700 text-lg mb-4 text-center">
        你好！我是 Aurora Threads 博客的作者，一名热爱技术与分享的开发者。
        关注 C++/C#/Unity/AI/算法/前端等领域，喜欢探索新技术、写作与开源。
      </p>
      <div className="mb-6 text-center text-gray-600">
        <div>坐标：中国</div>
        <div>职业：游戏/软件开发工程师</div>
        <div>技能：C++、C#、Unity、TypeScript、React、算法、AI</div>
      </div>
      <div className="flex gap-4 mt-4">
        {SOCIALS.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-500 hover:text-cyan-600 transition"
            title={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
