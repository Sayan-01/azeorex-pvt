import GlassSheet from "@/components/global/glass-sheet";
import { Button } from "@/components/ui/button";
import { Compass, Logout } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { RiMenu5Line } from "react-icons/ri";
import { auth } from "../../../../../auth";
import Menu from "./menu";
import UserBtn from "./user-btn";
import HamLogo from "@/icons/ham-logo";

const LandingPageNavbar = async () => {
  const session = await auth();

  return (
    <header>
      <div className=" sticky top-0 z-[100] sm:h-[95px] h-[75px] w-full">
        <div className="h-full w-full py-1 max-w-7xl sm:px-8 px-5 mx-auto">
          <div className="mx-auto my-auto max-w-screen-xl h-full">
            <div className="flex h-full items-center justify-between">
              <p className="font-bold w-[100px] text-2xl">Sayan.</p>
              <Menu orientation="desktop" />
              <div className="flex gap-2 w-[100px] justify-end ">
                {session?.user?.email ? (
                  <Link href="/agency">
                    <Button
                      variant="outline"
                      className="bg-themeBlack element rounded-2xl h-9 flex gap-2 border-themeGray elemrnt hover:bg-themeGray"
                    >
                      <Compass />
                      Create
                    </Button>
                  </Link>
                ) : (
                  <Link href="/agency/sign-in">
                    <Button
                      variant="outline"
                      className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray elemrnt hover:bg-themeGray"
                    >
                      <Logout />
                      Login
                    </Button>
                  </Link>
                )}
                <div className="md:flex gap-4 hidden">
                  <UserBtn size="-9 h-9">
                    <div className=" rounded-full overflow-hidden">
                      <Image
                        alt="profile-image"
                        src={session?.user?.image || "/user.png"}
                        className="w-full h-full"
                        width={100}
                        height={100}
                      />
                    </div>
                  </UserBtn>
                </div>

                <GlassSheet
                  triggerClass="lg:hidden"
                  trigger={
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent px-0"
                    >
                      <HamLogo />
                    </Button>
                  }
                >
                  <Menu orientation="mobile" />
                </GlassSheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingPageNavbar;
