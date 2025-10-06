"use client";
import { getUserDetails } from "@/lib/queries";
import { User } from "@prisma/client";
import React from "react";
import { useState, useRef, useEffect } from "react";

const Page = () => {
  const [username, setUsername] = useState<string>("Guest User");
  const [tempUsername, setTempUsername] = useState<string>(username);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  type UserDetails = {
    email: string;
    role: string;
    status: string;
    joinedAt: string;
    plan: string;
  };

  type Project = {
    id: string;
    name: string;
    type: string;
    price: number;
    status: string; // "Owned" | "Available"
    updatedAt: string;
  };

  type UserData = {
    username: string;
    avatarUrl?: string;
    userDetails: UserDetails;
    projects: Project[];
  };

  const [userDetails, setUserDetails] = useState<UserDetails>({ email: "", role: "", status: "", joinedAt: "", plan: "" });
  const [projects, setProjects] = useState<Project[]>([]);

  // TODO: Replace this local function with your actual data source import, e.g.:
  // import { getUserData } from "@/lib/user";
  const getUserData = async (): Promise<UserData> => {
    // Example: fetch from your API
    // const res = await fetch("/api/user/profile", { cache: "no-store" });
    // return res.json();

    // Temporary fallback to keep page functional until wired to API
    return {
      username: "Guest User",
      avatarUrl: undefined,
      userDetails: {
        email: "guest@example.com",
        role: "member",
        status: "active",
        joinedAt: "2025-01-01",
        plan: "Free",
      },
      projects: [
        { id: "p1", name: "Landing Website", type: "Azeorex", price: 0, status: "Owned", updatedAt: "2025-09-20" },
        { id: "p2", name: "E-commerce Template", type: "Azeorex", price: 39, status: "Available", updatedAt: "2025-08-13" },
        { id: "p3", name: "Portfolio", type: "Figma", price: 12, status: "Owned", updatedAt: "2025-07-02" },
      ],
    };
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getUserDetails() as User;
        if (!mounted) return;
        setUsername(data?.name);
        setAvatarUrl(data?.avatarUrl || null);
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUsernameSave = async () => {
    try {
      setSaving(true);
      // TODO: call API to update username
      // await fetch('/api/user', { method: 'PATCH', body: JSON.stringify({ username: tempUsername }) })
      setUsername(tempUsername.trim() || username);
      console.log("Username updated ->", tempUsername);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result as string);
    reader.readAsDataURL(file);
    // TODO: upload to storage and save URL in user profile
  };

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
    
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 pt-[140px] pb-[80px]">
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
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-500 text-sm">Upload</span>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-zinc-400">Username</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="h-9 w-full rounded-md bg-[#1a1b1e] border border-white/10 px-3 text-sm outline-none focus:border-indigo-600"
                    placeholder="Enter username"
                  />
                  <button
                    onClick={handleUsernameSave}
                    disabled={saving}
                    className="h-9 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Current: <span className="text-zinc-300">{username}</span></p>
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
                <p className="capitalize">{userDetails.status}</p>
              </div>
              <div className="bg-[#15161a] border border-white/5 rounded-lg p-3">
                <p className="text-zinc-400 text-xs">Joined</p>
                <p>{userDetails.joinedAt}</p>
              </div>
              <div className="bg-[#15161a] border border-white/5 rounded-lg p-3 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-xs">Plan</p>
                    <p>{userDetails.plan}</p>
                  </div>
                  <button onClick={handleUpgrade} className="h-8 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs">Upgrade</button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button onClick={handleApplyAdmin} className="w-full h-9 rounded-md bg-[#1a1b1e] hover:bg-[#202127] border border-white/10 text-sm">Apply for Admin</button>
            </div>
          </div>
        </section>

        {/* Right: Projects table */}
        <section className="lg:col-span-2">
          <div className="rounded-xl border border-white/5 bg-[#121215] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Your Projects</h2>
              <div className="flex items-center gap-2">
                <input placeholder="Search projects..." className="h-8 w-56 rounded-md bg-[#1a1b1e] border border-white/10 px-3 text-sm outline-none focus:border-indigo-600" />
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
                    <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3">{p.name}</td>
                      <td className="px-4 py-3 text-zinc-400">{p.type}</td>
                      <td className="px-4 py-3 text-zinc-400">{p.updatedAt}</td>
                      <td className="px-4 py-3">{p.price === 0 ? "Free" : `$${p.price}`}</td>
                      <td className="px-4 py-3 text-right">
                        {p.status === "Owned" ? (
                          <span className="text-xs text-emerald-400">Owned</span>
                        ) : (
                          <button onClick={() => handleBuy(p.id)} className="h-8 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs">Buy</button>
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

export default Page;
