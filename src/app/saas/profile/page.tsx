"use client";
import { Button } from "@/components/ui/button";
import { getUserCurrentPlan, getUserDetails, updateUser } from "@/lib/queries";
import { ddmmyyyy } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect, startTransition, useTransition } from "react";
import { toast } from "sonner";

type Project = {
  id: string;
  name: string;
  type: string;
  price: number;
  status: string; // "Owned" | "Available"
  updatedAt: string;
};

type UserData = {
  id: string;
  name: string;
  isAdmin: boolean;
  avatarUrl?: string;
  email: string;
  activePlan: string;
  createdAt: Date;
  role: string;
};

const page = () => {
  const [userDetails, setUserDetails] = useState<UserData>({
    id: "",
    name: "",
    isAdmin: false,
    avatarUrl: "",
    email: "",
    activePlan: "",
    createdAt: new Date(),
    role: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isPending, startTransition] = useTransition();

  const { data: session, update } = useSession();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = (await getUserDetails()) as User;
        if (!mounted) return;
        if (data)
          setUserDetails({
            id: data.id,
            name: data.name,
            isAdmin: data.isAdmin,
            avatarUrl: data.avatarUrl || "",
            email: data.email,
            activePlan: data.activePlan,
            createdAt: data.createdAt || "",
            role: data.role,
          });
      } catch (e) {
        toast.error("Failed to load user data");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateUserDetails = async () => {
    startTransition(async () => {
      try {
        await updateUser({
          name: userDetails.name,
          avatarUrl: userDetails.avatarUrl,
        }, userDetails.id);

      await update({
        name: userDetails.name,
        avatarUrl: userDetails.avatarUrl,
      });

      toast.success("User details updated successfully");
      } catch (e) {
        toast.error("Failed to update user details");
      }
    });
  };

  const handleBuy = (projectId: string) => {
    // TODO: integrate checkout/payment
    console.log("Buy project ->", projectId);
  };

  const handleApplyAdmin = () => {
    // TODO: submit admin application
    console.log("Apply for admin clicked");
  };
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Profile card */}
      <section className="lg:col-span-1">
        <div className="rounded-xl border border-white/5 bg-[#121215] p-5">
          <div className="flex flex-col [@media(min-width:1250px)]:flex-row items-start gap-4">
            <div className="">
              <div className="flex items-center">
                <div className="relative w-20 h-20">
                  {userDetails.avatarUrl ? (
                    <img
                      src={userDetails.avatarUrl}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <label htmlFor="avatar">
                      <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl font-bold">{userDetails.name?.[0] || "U"}</div>
                    </label>
                  )}
                  {userDetails.avatarUrl && (
                    <button
                      className="absolute top-0 right-0 rounded-full p-1 bg-white text-black"
                      onClick={() => setUserDetails({ ...userDetails, avatarUrl: "" })}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append("file", file);

                      const res = await fetch("/api/upload-avatar", {
                        method: "POST",
                        body: formData,
                      });

                      const data = await res.json();
                      if (data.url) {
                        setUserDetails({ ...userDetails, avatarUrl: data.url });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-zinc-400">Username</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  className="h-9 w-full rounded-md bg-[#1a1b1e] border border-white/10 px-3 text-sm outline-none focus:border-indigo-600"
                  placeholder="Enter username"
                />
                <Button
                  onClick={handleUpdateUserDetails}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className=" h-4 w-4 animate-spin duration-200" />
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Current: <span className="text-zinc-300">{userDetails.name}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm cursor-pointer">
            <div className="bg-[#15161a] border border-white/5 rounded-lg p-3">
              <p className="text-zinc-400 text-xs">Email</p>
              <p className="truncate">{userDetails.email}</p>
            </div>
            <div className="bg-[#15161a] border border-white/5 rounded-lg p-3">
              <p className="text-zinc-400 text-xs">Role</p>
              <p className="capitalize">{userDetails.role}</p>
            </div>
            <div className="bg-[#15161a] border border-white/5 rounded-lg p-3">
              <p className="text-zinc-400 text-xs">Status</p>
              <p className="capitalize">{userDetails.role}</p>
            </div>
            <div className="bg-[#15161a] border border-white/5 rounded-lg p-3">
              <p className="text-zinc-400 text-xs">Joined</p>
              <p>{ddmmyyyy(userDetails.createdAt)}</p>
            </div>
            <div className="bg-[#15161a] border border-white/5 rounded-lg p-3 col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-xs">Plan</p>
                  <p>{userDetails.activePlan}</p>
                </div>
                <Link href="/#pricing">
                  <button className="h-8 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs">Upgrade</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={handleApplyAdmin}
              className="w-full h-9 rounded-md bg-[#1a1b1e] hover:bg-[#202127] border border-white/10 text-sm"
            >
              Apply for Admin
            </button>
          </div>
        </div>
      </section>

      {/* Right: Projects table */}
      <section className="lg:col-span-2">
        <div className="rounded-xl border border-white/5 bg-[#121215] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Your Projects</h2>
            
          </div>

          <div className="overflow-x-auto rounded-lg border border-white/5">
            <table className="w-full text-sm">
              <thead className="bg-[#15161a] text-zinc-400">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Name</th>
                  <th className="text-left font-medium px-4 py-3">Type</th>
                  <th className="text-left font-medium px-4 py-3">Updated</th>
                  <th className="text-left font-medium px-4 py-3">Price</th>
                  <th className="text-right font-medium px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{p.type}</td>
                    <td className="px-4 py-3 text-zinc-400">{p.updatedAt}</td>
                    <td className="px-4 py-3">{p.price === 0 ? "Free" : `$${p.price}`}</td>
                    <td className="px-4 py-3 text-right">
                      {p.status === "Owned" ? (
                        <span className="text-xs text-emerald-400">Owned</span>
                      ) : (
                        <button
                          onClick={() => handleBuy(p.id)}
                          className="h-8 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs"
                        >
                          Buy
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
