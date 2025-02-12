import { AffiliateDuoToneBlack, Buisness, Chat, Courses, CreditCard, Document, Explore, GlobeDuoToneBlack, Home, IDuotoneBlack, PersonalDevelopment, ZapDouToneBlack } from "@/icons";
import { AudioLines, Folder, HomeIcon, LayoutPanelTop, ShoppingBag, Sparkles, TvMinimalPlay } from "lucide-react";

export type MenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
  section?: boolean;
  integration?: boolean;
};

export type GroupMenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
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
  id: Number
  name:String
  link: String
  icon: JSX.Element
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
