import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { version } from "../../package.json";

const Nav: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    link: "/guide/what-is-quacky",
    activeMatch: "/guide/",
  },
  {
    text: "Commands",
    link: "/commands/overview",
    activeMatch: "/commands/",
  },
  {
    text: `${version}`,
    items: [
      {
        text: "Release Notes",
        link: "https://github.com/stephenmelnicki/quacky/releases",
      },
      {
        text: "Contributing",
        link: "https://github.com/stephenmelnicki/quacky/blob/main/.github/CONTRIBUTING.md",
      },
    ],
  },
];

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: "Introduction",
    items: [
      { text: "What is Quacky?", link: "what-is-quacky" },
      { text: "Getting Started", link: "getting-started" },
    ],
  },
];

const SidebarCommands: DefaultTheme.SidebarItem[] = [
  {
    text: "Commands",
    items: [
      { text: "Overview", link: "overview" },
      { text: "Ping", link: "ping" },
      { text: "Quack", link: "quack" },
    ],
  },
];

const title = "Quacky";
const description = "A Discord bot for Marble Wednesdays";

export default defineConfig({
  lang: "en-US",
  title,
  description,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/quacky-logo.svg" }],
    ["meta", { name: "author", content: "Stephen Melnicki" }],
    ["meta", { name: "theme-color", content: "#30a46c" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: title }],
    ["meta", { name: "og:title", content: title }],
    ["meta", { name: "og:description", content: description }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  themeConfig: {
    logo: { src: "/quacky-logo.svg", width: 24, height: 24 },
    nav: Nav,
    search: {
      provider: "local",
    },
    sidebar: {
      "/guide/": { base: "/guide/", items: SidebarGuide },
      "/commands/": { base: "/commands/", items: SidebarCommands },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/stephenmelnicki/quacky" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Stephen Melnicki",
    },
  },
});
