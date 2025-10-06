import { MdOutlineWbSunny } from "react-icons/md";
import { GoMoon } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { FiBookmark } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";
import { TbSeo } from "react-icons/tb";
import { GoDatabase } from "react-icons/go";
import { GoLock } from "react-icons/go";
import Image from "next/image";

type NavMenu ={
  id: number
  title: string
  url: string
  icon: string
}

export const navMenu: NavMenu[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icon: "/icons/home.png",
  },
  {
    id: 2,
    title: "Projects",
    url: "/saas/projects",
    icon: "/icons/project.png",
  },
  {
    id: 3,
    title: "About",
    url: "/about",
    icon: "/icons/about.png",
  },
  {
    id: 4,
    title: "Templates",
    url: "/saas/templates",
    icon: "/icons/contact.png",
  },
  {
    id: 5,
    title: "Give review",
    url: "/global-review",
    icon: "/icons/contact.png",
  },
];

type Card = {
  id: number;
  title: string;
  description: React.ReactNode;
  img_url: string;
  url: string;
  feature: string[];
};

export const card: Card[] = [
  {
    id: 1,
    title: "Website Template",
    description: (
      <h1>
        High-quality <span className="text-violet-500">modern templates</span> for Websites and Apps.
      </h1>
    ),
    img_url: "/cards/template.svg",
    url: "/saas/templates",
    feature: ["Customizable", "User-friendly", "Responsive Design"],
  },
  {
    id: 2,
    title: "Website Component",
    description: (
      <h1>
        Reusable, sleek <span className="text-violet-500">components</span> to enhance your website design & look.
      </h1>
    ),
    img_url: "/cards/component.svg",
    url: "/saas/templates",
    feature: ["Modular", "Scalable", "High Performance"],
  },
  {
    id: 3,
    title: "Backend Management",
    description: (
      <h1>
        Efficient <span className="text-violet-500">backend solutions</span> for smooth, reliable operations.
      </h1>
    ),
    img_url: "/cards/backend.svg",
    url: "connection/backend-management",
    feature: ["Secure", "Scalable", "Reliable"],
  },
  {
    id: 4,
    title: "Full Stack Projects",
    description: (
      <h1>
        Complete <span className="text-violet-500">full stack projects</span> developed with new technologies.
      </h1>
    ),
    img_url: "/cards/fullstack.svg",
    url: "connection/full-stack-projects",
    feature: ["Comprehensive", "End-to-End Solutions", "Seamless Integration"],
  },
  {
    id: 5,
    title: "Custom Designs",
    description: (
      <h1>
        Tailored{" "}
        <span className="text-violet-500">
          custom
          <br className="sm:hidden block" /> design
        </span>{" "}
        solutions to meet your unique needs.
      </h1>
    ),
    img_url: "/cards/custom.svg",
    url: "connection/custom-designs",
    feature: ["Unique Aesthetics", "Client-focused", "Innovative Designs"],
  },
  {
    id: 6,
    title: "Personal Website",
    description: (
      <h1>
        Craft standout <span className="text-violet-500">personal website</span> to showcase your work.
      </h1>
    ),
    img_url: "/cards/personal.svg",
    url: "connection/personal-website",
    feature: ["Personal Branding", "Portfolio Showcase", "Interactive Features"],
  },
];

export const theme = [
  {
    id: 0,
    title: "Light",
    name: "light",
    image: <MdOutlineWbSunny size={16} />,
  },
  {
    id: 1,
    title: "Dark",
    name: "dark",
    image: <GoMoon size={16} />,
  },
  {
    id: 2,
    title: "Neutral",
    name: "neutral",
    image: <GoStar size={16} />,
  },
];

type Category = {
  id: number
  label: string
  value: string
}

export const category: Category[] = [
  { id: 1, label: "All", value: "" },
  { id: 2, label: "Business", value: "business" },
  { id: 3, label: "Restaurant", value: "restaurant" },
  { id: 4, label: "E-commerce", value: "e_commerce" },
  { id: 5, label: "Traveling", value: "traveling" },
  { id: 6, label: "Ed-tech", value: "ed-tech" },
  { id: 7, label: "Health [medical]", value: "health" },
  { id: 8, label: "Real estate", value: "real_estate" },
  { id: 9, label: "Sports", value: "sports" },
  { id: 10, label: "Dark theme", value: "dark_theme" },
  { id: 11, label: "Light theme", value: "light_theme" },
  { id: 12, label: "3d", value: "3d" },
  { id: 13, label: "2d", value: "2d" },
  { id: 14, label: "Animated", value: "animated" },
  { id: 15, label: "Saas", value: "saas" },
  { id: 16, label: "Ai website design", value: "ai_website_design" },
  { id: 17, label: "Documentation", value: "documentation" },
  { id: 18, label: "Landing page", value: "landing_page" },
  { id: 19, label: "Personal", value: "personal" },
  { id: 20, label: "Blog", value: "blog" },
  { id: 21, label: "Web3 website design", value: "web3_website_design" },
  { id: 22, label: "Photography", value: "photography" },
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
    image: (
      <Image
        src={"/platform/figma.png"}
        width={400}
        height={400}
        className="w-6 h-6"
        alt="figma"
      />
    ),
  },
  {
    id: 1,
    title: "Framer",
    name: "framer",
    image: (
      <Image
        src={"/platform/framer.svg"}
        width={400}
        height={400}
        className="w-6 h-6"
        alt="framer"
      />
    ),
  },
  {
    id: 2,
    title: "Webflow",
    name: "webflow",
    image: (
      <Image
        src={"/platform/webflow_icon.webp"}
        width={400}
        height={400}
        className="w-6 h-6"
        alt="webflow"
      />
    ),
  },
  {
    id: 3,
    title: "Code",
    name: "html",
    image: (
      <Image
        src={"/platform/code.svg"}
        width={400}
        height={400}
        className="w-6 h-6"
        alt="html"
      />
    ),
  },
];

export const sayan = [
  {
    id: 1,
    name: "nextjs",
    url: "/uilogo/next.svg",
  },
  {
    id: 2,
    name: "reactjs",
    url: "/platform/react.svg",
  },
  {
    id: 3,
    name: "nodejs",
    url: "/uilogo/node.svg",
  },
  {
    id: 4,
    name: "figma",
    url: "/uilogo/figma.svg",
  },
  {
    id: 5,
    name: "tailwind",
    url: "/uilogo/tailwind.svg",
  },
  {
    id: 6,
    name: "mongodb",
    url: "/uilogo/mongo.svg",
  },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "-right-10 bottom-0",
    titleClassName: "",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const socials = [
  {
    id: "0",
    title: "LinkedIn",
    iconUrl: "/social/linkedin.png",
    url: "https://www.linkedin.com/in/sayandas-s1",
  },
  {
    id: "1",
    title: "Instagram",
    iconUrl: "/social/instagram.png",
    url: "https://www.instagram.com/sayan_200462/",
  },
  {
    id: "2",
    title: "Github",
    iconUrl: "/social/github.png",
    url: "https://github.com/Sayan-01",
  },
  {
    id: "3",
    title: "Facebook",
    iconUrl: "/social/facebook.png",
    url: "https://www.facebook.com/profile.php?id=100035727935505",
  },
];

export const set1 = [
  {
    Id: 1,
    Img: "/project_marquee/project_1/item1.png",
  },
  {
    Id: 2,
    Img: "/project_marquee/project_1/item2.png",
  },
  {
    Id: 3,
    Img: "/project_marquee/project_1/item3.png",
  },
  {
    Id: 4,
    Img: "/project_marquee/project_1/item4.png",
  },
  {
    Id: 5,
    Img: "/project_marquee/project_1/item5.png",
  },
];

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
