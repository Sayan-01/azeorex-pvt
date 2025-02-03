import Image from "next/image";
import Cards from "./Cards";

const SearchItem = ({ data, count, session }) => {
  return (
    <div className={`${count == 0 ? " " : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}  my-4 px-0`}>
      {count == 0 ? (
        <div className="w-full">
          <Image
            className=" md:w-[68%] lg:w-[38%] w-[90%]  mx-auto"
            width={100}
            height={100}
            src={"/empty.svg"}
            alt='empty'
          />
        </div>
      ) : (
        data.map((item) => (
          <div key={item._id}>
            <Cards item={item} session={session}/>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchItem;
