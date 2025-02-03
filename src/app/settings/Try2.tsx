import React from "react";
import { auth } from "../../../auth";
import {
  About,
  AffiliateDuoToneBlack,
  BadgePlus,
  Bell,
  BriefCaseDuoToneBlack,
  BriefCaseDuoToneWhite,
  Buisness,
  CarotSort,
  Chat,
  Comment,
  Courses,
  Dashboard,
  Document,
  Empty,
  EmptyCircle,
  Envalope,
  ExclaimationMark,
  Explore,
  FileDuoToneBlack,
  Fitness,
  Google,
  Grid,
  Heart,
  Home,
  HomeDuoToneWhite,
  IDuotoneBlack,
  LifeStyle,
  Like,
  Links,
  Logout,
  MegaPhone,
  MegaPhoneDuoToneBlack,
  MegaPhoneDuoToneWhite,
  Message,
  Music,
  PersonalDevelopment,
  PurpleCheck,
  Settings,
  SocialMedia,
  Tech,
  Unlike,
  WhiteLabel,
  GlobeDuoToneBlack,
  ZapDouToneBlack,
  Compass,
  CreditCard,
} from "@/icons";
import { Chip } from "@/icons/chip";
import Position from "@/icons/position";
import { Plus } from "@/icons/plus";
import { Pipeline } from "@/icons/pipeline";
import { Media } from "@/icons/media";
import { Layers } from "@/icons/layers";
import HamLogo from "@/icons/ham-logo";
import { Funnel } from "@/icons/funnel";
import { Plus2 } from "@/icons/plus2";
import { Stack } from "@/icons/stack";
import { Command } from "@/icons/command";
import { Layout } from "@/icons/layout";
import { Ai } from "@/icons/ai";
import { Database } from "@/icons/database";

const Try2 = async () => {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        {JSON.stringify(session.user)}
        <p>
          1. About: <About />
        </p>
        <p>
          2. Affiliate DuoTone Black: <AffiliateDuoToneBlack />
        </p>
        <p>
          3. Badge Plus: <BadgePlus />
        </p>
        <p>
          4. Bell: <Bell />
        </p>
        <p>
          5. BriefCase DuoTone Black: <BriefCaseDuoToneBlack />
        </p>
        <p>
          6. BriefCase DuoTone White: <BriefCaseDuoToneWhite />
        </p>
        <p>
          7. Buisness: <Buisness />
        </p>
        <p>
          8. Carot Sort: <CarotSort />
        </p>
        <p>
          9. Chat: <Chat />
        </p>
        <p>
          10. Chip: <Chip />
        </p>
        <p>
          11. Comment: <Comment />
        </p>
        <p>
          12. Compass: <Compass />
        </p>
        <p>
          13. Courses: <Courses />
        </p>
        <p>
          14. Credit Card: <CreditCard />
        </p>
        <p>
          15. Dashboard: <Dashboard />
        </p>
        <p>
          16. Document: <Document />
        </p>
        <p>
          17. Empty: <Empty />
        </p>
        <p>
          18. Empty Circle: <EmptyCircle />
        </p>
        <p>
          19. Envalope: <Envalope />
        </p>
        <p>
          20. Exclaimation Mark: <ExclaimationMark />
        </p>
        <p>
          21. Explore: <Explore />
        </p>
        <p>
          22. File DuoTone Black: <FileDuoToneBlack />
        </p>
        <p>
          23. Fitness: <Fitness />
        </p>
        <p>
          24. Funnel: <Funnel />
        </p>
        <p>
          25. Globe DuoTone Black: <GlobeDuoToneBlack />
        </p>
        <p>
          26. Google: <Google />
        </p>
        <p>
          27. Grid: <Grid />
        </p>
        <p>
          28. Ham Logo: <HamLogo />
        </p>
        <p>
          29. Heart: <Heart />
        </p>
        <p>
          30. Home DuoTone White: <HomeDuoToneWhite />
        </p>
        <p>
          31. Home: <Home />
        </p>
        <p>
          32. IDuotone Black: <IDuotoneBlack />
        </p>
        <p>
          33. Layers: <Layers />
        </p>
        <p>
          34. LifeStyle: <LifeStyle />
        </p>
        <p>
          35. Like: <Like />
        </p>
        <p>
          36. Links: <Links />
        </p>
        <p>
          37. Logout: <Logout />
        </p>
        <p>
          38. Media: <Media />
        </p>
        <p>
          39. MegaPhone: <MegaPhone />
        </p>
        <p>
          40. MegaPhone DuoTone Black: <MegaPhoneDuoToneBlack />
        </p>
        <p>
          41. MegaPhone DuoTone White: <MegaPhoneDuoToneWhite />
        </p>
        <p>
          42. Message: <Message />
        </p>
        <p>
          43. Music: <Music />
        </p>
        <p>
          44. Personal Development: <PersonalDevelopment />
        </p>
        <p>
          45. Pipeline: <Pipeline />
        </p>
        <p>
          46. Plus: <Plus />
        </p>
        <p>
          47. Position: <Position />
        </p>
        <p>
          48. Purple Check: <PurpleCheck />
        </p>
        <p>
          49. Settings: <Settings />
        </p>
        <p>
          50. Social Media: <SocialMedia />
        </p>
        <p>
          51. Tech: <Tech />
        </p>
        <p>
          52. Unlike: <Unlike />
        </p>
        <p>
          53. White Label: <WhiteLabel />
        </p>
        <p>
          54. Zap DuoTone Black: <ZapDouToneBlack />
        </p>
        plus
        <Plus2 />
        database
        <Database />
        stack
        <Stack />
        command
        <Command />
        layout
        <Layout />
        ai
        <Ai />
      </div>
    );
  }
};

export default Try2;
