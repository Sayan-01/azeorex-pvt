import Footer from "@/app/(landing)/_components/home/Footer";
import Header from "@/app/(landing)/_components/home/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer startingColor="to-[#141414]"/>
    </>
  );
};

export default layout;
