import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Card from "./_components/card";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Home = () => {
  return (
    <div className="">
      <nav className="flex justify-between items-center">
        <div className=" flex items-center gap-3 rounded-full w-max">
          <h3 className="text-white/70">Home</h3>
          <SearchBar />
        </div>
        <div className=" flex gap-3">
          <Button
            size="sm"
            className="bg-main hover:bg-main/80 text-white w-28"
          >
            Template's
          </Button>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-500/80 text-white w-28"
          >
            + Create New
          </Button>
        </div>
      </nav>
      <section className="my-7">
        <div className="bg-[#ffffff08] rounded-xl p-6 flex gap-3 items-center">
          <svg
            width="12"
            height="18"
            viewBox="0 0 12 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 10.3333L7.375 1V7.66667H11.5L4.625 17V10.3333H0.5Z"
              fill="#726fff"
              stroke="#726fff"
              stroke-linejoin="round"
            ></path>
          </svg>
          <h4>Upgrade to Super today!</h4>
          <p className="flex gap-3 text-[13px] text-zinc-500">
            We improved Spline Super payments in your region.{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Dark / Open Link v2"
                opacity="0.6"
              >
                <path
                  id="Vector 1"
                  d="M11.4998 4.49977L4.49951 11.5M11.4998 4.49977L11.4998 8.74241M11.4998 4.49977L7.25713 4.49977"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </p>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map(() => {
            return <Card></Card>;
          })}
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            href={"/saas/projects"}
            className="px-3 py-1.5 flex items-center gap-3 rounded-full bg-[#1e1f22] text-[12px] text-zinc-500"
          >
            <p>See all projects</p>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
      <section>
        <h3 className="text-white/70">Templates</h3>
      </section>
    </div>
  );
};

export default Home;

const SearchBar = ({ className }: { className?: string }) => {
  // const router = useRouter();
  // const [query, setQuery] = useState("");
  // const inputHandler = (e) => {
  //   e.preventDefault();
  //   router.push(`/templates/products/search/${query}`);
  // };
  return (
    <form
      // onSubmit={inputHandler}
      className={cn("w-full h-full flex items-center relative", className)}
    >
      <Input
        className=" m-0 h-8 pr-0  rounded-lg border-none outline-none focus-visible:ring-0 bg-[#1e1f22] text-white/60"
        placeholder="Search here..."
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
      <button
        className="absolute right-[5px] w-6 h-10 flex items-center opacity-60 justify-center "
        type="submit"
      >
        <Search size={14} />
      </button>
    </form>
  );
};
