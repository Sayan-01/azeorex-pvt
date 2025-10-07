"use client";
import { getUserCurrentPlan, getUserDetails, updateUser } from "@/lib/queries";
import { ddmmyyyy } from "@/lib/utils";
import { User } from "@prisma/client";
import { useState, useRef, useEffect } from "react";

type Project = {
  id: string;
  name: string;
  type: string;
  price: number;
  status: string; // "Owned" | "Available"
  updatedAt: string;
};

type UserData = {
  id: string
  name: string;
  avatarUrl?: string;
  email: string;
  createdAt: Date;
  role: string;
};

const page = () => {
  const [userDetails, setUserDetails] = useState<UserData>({
    id: "",
    name: "",
    avatarUrl: "",
    email: "",
    createdAt: new Date(),
    role: "",
  });
  const [plan, setPlan] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = (await getUserDetails()) as User;
        const plan = await getUserCurrentPlan(data.id);
        if (!mounted) return;
        setPlan(plan.plan);
        if (data)
          setUserDetails({
            id: data.id,
            name: data.name,
            avatarUrl: data.avatarUrl || "",
            email: data.email,
            createdAt: data.createdAt || "",
            role: data.role,
          });
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateUserDetails = async () => {
    try {
      setSaving(true);
      await updateUser({
        id: userDetails.id,
        name: userDetails.name,
      });
      console.log("Username updated ->", userDetails.name);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();



  const handleBuy = (projectId: string) => {
    // TODO: integrate checkout/payment
    console.log("Buy project ->", projectId);
  };

  const handleUpgrade = () => {
    // TODO: navigate to billing/upgrade page
    console.log("Upgrade plan clicked");
  };

  const handleLogout = () => {
    // TODO: integrate with auth signOut()
    console.log("Logout clicked");
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
          <div className="flex items-start gap-4">
            <div>
              <div
                onClick={handleAvatarClick}
                className="w-20 h-20 rounded-full overflow-hidden ring-1 ring-white/10 cursor-pointer bg-zinc-900 flex items-center justify-center"
                title="Change profile picture"
              >
                {userDetails.avatarUrl ? (
                  <img
                    src={userDetails.avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-zinc-500 text-sm">Upload</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setUserDetails({ ...userDetails, avatarUrl: e.target.value })}
                className="hidden"
              />
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
                <button
                  onClick={handleUpdateUserDetails}
                  disabled={saving}
                  className="h-9 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Current: <span className="text-zinc-300">{userDetails.name}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
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
                  <p>{plan}</p>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="h-8 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs"
                >
                  Upgrade
                </button>
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
            <div className="flex items-center gap-2">
              <input
                placeholder="Search projects..."
                className="h-8 w-56 rounded-md bg-[#1a1b1e] border border-white/10 px-3 text-sm outline-none focus:border-indigo-600"
              />
              <button className="h-8 px-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm">New Project</button>
            </div>
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
