import { AffiliateDuoToneBlack, Buisness, Chat, Courses, CreditCard, Document, Explore, GlobeDuoToneBlack, Home, IDuotoneBlack, PersonalDevelopment, ZapDouToneBlack } from "@/icons";
import { AudioLines, Folder, HomeIcon, LayoutPanelTop, ShoppingBag, Sparkles, TvMinimalPlay } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiBookmark, FiHeart } from "react-icons/fi";
import { GoClock, GoDatabase, GoLock } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { TbSeo } from "react-icons/tb";

export type MenuProps = {
  id: number;
  label: string;
  icon: ReactNode;
  path: string;
  section?: boolean;
  integration?: boolean;
};

export type GroupMenuProps = {
  id: number;
  label: string;
  icon: ReactNode;
  path: string;
};

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Home",
    icon: <Home />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Pricing",
    icon: <CreditCard />,
    path: "#pricing",
    section: true,
  },
  {
    id: 2,
    label: "Explore",
    icon: <Explore />,
    path: "/explore",
  },

  {
    id: 4,
    label: "About",
    icon: <CreditCard />,
    path: "#",
    section: true,
  },
  {
    id: 5,
    label: "Support",
    icon: <Explore />,
    path: "/explore",
  },
];
export const GROUP_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Group",
    icon: <Home />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Courses",
    icon: <Courses />,
    path: "#pricing",
    section: true,
  },
  {
    id: 2,
    label: "Events",
    icon: <Buisness />,
    path: "/explore",
  },
  {
    id: 3,
    label: "Members",
    icon: <PersonalDevelopment />,
    path: "/explore",
  },
  {
    id: 4,
    label: "About",
    icon: <Document />,
    path: "/explore",
  },
  {
    id: 5,
    label: "Huddle",
    icon: <Chat />,
    path: "/explore",
  },
];

export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
  {
    id: 0,
    label: "General",
    icon: <IDuotoneBlack />,
    path: "",
  },
  {
    id: 1,
    label: "Subscriptions",
    icon: <CreditCard />,
    path: "subscriptions",
  },
  {
    id: 2,
    label: "Affiliates",
    icon: <AffiliateDuoToneBlack />,
    path: "affiliates",
  },
  {
    id: 3,
    label: "Domain Config",
    icon: <GlobeDuoToneBlack />,
    path: "domains",
  },
  {
    id: 4,
    label: "Integration",
    icon: <ZapDouToneBlack />,
    path: "integrations",
    integration: true,
  },
];

type IntegrationsListItemProps = {
  id: string;
  name: "stripe";
  logo: string;
  description: string;
  title: string;
  modalDescription: string;
};

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: "1",
    name: "stripe",
    description: "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
    logo: "914be637-39bf-47e6-bb81-37b553163945",
    title: "Connect Stripe Account",
    modalDescription: "The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
  },
];

type saasSideBarOptions = {
  id: Number;
  name: String;
  link: String;
  icon: ReactNode;
  subMenus?: { id: number; link: string; name: string }[];
};

export const SAAS_SIDEBAR_OPTIONS: saasSideBarOptions[] = [
  {
    id: 0,
    name: "Home",
    link: `/saas`,
    icon: <HomeIcon size={18} />,
  },
  {
    id: 1,
    name: "My project",
    link: `/saas/projects`,
    icon: <Folder size={18} />,
  },
  {
    id: 2,
    name: "Templates",
    link: `/saas/templates`,
    icon: <LayoutPanelTop size={18} />,
  },
  {
    id: 3,
    name: "Generate with AI",
    link: `/saas/azeorex-intelligence`,
    icon: <Sparkles size={18} />,
  },
  {
    id: 4,
    name: "Tutorials",
    link: `/saas/tutorials`,
    icon: <TvMinimalPlay size={18} />,
  },
  {
    id: 5,
    name: "Community",
    link: `/saas/community`,
    icon: <AudioLines size={18} />,
  },
  {
    id: 6,
    name: "Az Store",
    link: `/saas/az-store`,
    icon: <ShoppingBag size={18} />,
  },
];

export const access = [
  {
    id: 0,
    title: "Pro",
    name: "Pro",
    image: <FiBookmark size={16} />,
  },
  {
    id: 1,
    title: "Free",
    name: "Free",
    image: <FiHeart size={16} />,
  },
];

export const platform = [
  {
    id: 0,
    title: "Figma",
    name: "figma",
    image: "/platform/figma.png",
  },
  {
    id: 1,
    title: "Azeorex",
    name: "azeorex",
    image: "/azeorex.png",
  },
];

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const contact_feature = [
  { id: 1, title: "Completion Time", description: "24/7 for Email and live chat", logo: <GoClock /> },
  { id: 2, title: "Address", description: "howrah, Westbengal, India", logo: <SlLocationPin /> },
  { id: 3, title: "Email", description: "azeorex01@gmail.com", logo: <AiOutlineMail /> },
];
export const contact_feature_2 = [
  { id: 1, title: "SEO optimise", description: "Organic Traffic Growth", logo: <TbSeo /> },
  { id: 2, title: "Scalable", description: "Follow scalable architecture", logo: <GoDatabase /> },
  { id: 3, title: "Advance UI/UX", description: "Engaging modern design", logo: <GoLock /> },
];