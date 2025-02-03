import { sayan, souvik } from "@/constants";
import Profile from "../design/Profile";

const Component = () => {
  return (
    <div className=" w-full h-full">
      <div className="max-w-[1216px] relative md:border-2 border border-[#1a357d] h-full rounded-[40px] overflow-hidden flex flex-col md:flex-row ">
        {/* sayan */}
        <Profile
          color={"bg-gradient-to-b from-[#1A2658]/30 to-[#121B41]/50"}
          avatarUrl={"/avatar/gamer.png"}
          name={"sayan das"}
          description={
            "Sayan Das is the co-founder and CEO of Azeorex, he is also a <b><i>Software developer</i></b> and <b><i>UI/UX Designer</i></b> as well as manage technical aspects in company. He has a B.Tech degree in Computer Science and Engineering"
          }
          constant={sayan}
        />

        {/* souvik */}
        <Profile
          color={"bg-gradient-to-b from-[#293875]/50 to-[#151E49]/50"}
          avatarUrl={"/avatar/teen.png"}
            name={"souvik adak"}
            description={"Souvik Adak is the Co-founder of Azeorex, he is also a <b><i>UI UX designer</i></b> and he also manage marketing deparment. He has a B.Com degree in finance and<br/> Account"}
          constant={souvik}
        />
      </div>
    </div>
  );
};

export default Component;
