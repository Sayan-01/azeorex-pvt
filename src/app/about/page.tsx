"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wand2, BarChart3, Users, Rocket, Layers, Store, FileText } from "lucide-react";

import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const Page = () => {
  return (
    <div className={`min-h-screen w-full bg-[#141414] text-slate-200 px-6 md:px-32 ${poppins.className}`}>
      <div className="w-full min-h-screen border-x-2 border-dashed">
        {/* Header */}
        <header className="relative overflow-hidden border-b-2 border-dashed">
          <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_50%)]" />
          <div className="mx-auto max-w-6xl px-6 pt-14 pb-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            >
              About <span className="text-blue-500">Azeorex</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-lg md:text-xl leading-relaxed text-slate-400"
            >
              Azeorex is an all-in-one <strong>Web Design & Development Agency</strong>, a powerful <strong>No-Code SaaS</strong> for building and deploying websites, and a vibrant{" "}
              <strong>Template Marketplace</strong>.
            </motion.p>
          </div>
        </header>

        {/* Pillars */}
        <section className="mx-auto max-w-6xl px-6 py-8 pt-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white">What is Azeorex?</h2>
          <p className="mt-3 text-slate-400">We bring together four pillars to help creators, teams, and businesses design, build, and scale digital experiences.</p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Rocket className="w-5 h-5" />,
                title: "Agency Services",
                desc: "End-to-end web design and full-stack development.",
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "No-Code Builder (SaaS)",
                desc: "Drag-and-drop editor to design and deploy websites.",
              },
              {
                icon: <Store className="w-5 h-5" />,
                title: "Azeorex Templates",
                desc: "Templates built in Azeorex, ready to be reused or sold.",
              },
              {
                icon: <FileText className="w-5 h-5" />,
                title: "Figma Marketplace",
                desc: "Buy and sell professional Figma templates.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center rounded-xl bg-blue-500/10 p-2 text-blue-400">{item.icon}</span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What you can do */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">What You Can Do</h2>
          <ul className="mt-4 space-y-3">
            <li className="leading-relaxed text-slate-300">
              <strong>🏀 Need a Simple and Static Website in Minutes?</strong> — Sign in, create a project or buy a template, edit the website according to your need using our editor, and deploy your
              first website instantly.
            </li>
            <li className="leading-relaxed text-slate-300">
              <strong>🏀 Want Stunning Design?</strong> — Purchase a Figma or Azeorex template from our marketplace with modern UI/UX designs touch.
            </li>
            <li className="leading-relaxed text-slate-300">
              <strong>🏀 Need a Custom Design?</strong> — Contact our team for a custom design. We will create the website design as per your specific requirements.
            </li>
            <li className="leading-relaxed text-slate-300">
              <strong>🏀 Need a High-end Custom Web Application?</strong> — Contact our team for custom solutions. We can build complex web applications tailored to your business needs.
            </li>
          </ul>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">How It Works</h2>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            {/* Publish App */}
            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white">Publishing an Application</h3>
              <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-300">
                <li>Login → Create a project (name, description, subdomain).</li>
                <li>Open the project → Create pages.</li>
                <li>Open the editor → Drag, drop, and design.</li>
                <li>Deploy → Publish instantly to your live subdomain.</li>
              </ol>
            </div>

            {/* Upload Figma */}
            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white">Uploading Figma Templates</h3>
              <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-300">
                <li>
                  Go to <em>Profile</em> → <em>Become an Admin</em>.
                </li>
                <li>Approve policies.</li>
                <li>
                  Upload <code>.fig</code> with all relevant details.
                </li>
                <li>Template goes live in the marketplace.</li>
              </ol>
            </div>

            {/* Upload Azeorex */}
            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white">Uploading Azeorex Templates</h3>
              <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-300">
                <li>
                  Marketplace → <em>Become a Creator</em>.
                </li>
                <li>Select one of your projects → Accept privacy policy.</li>
                <li>Fill in template details → Submit.</li>
                <li>Your project is listed as a marketplace product.</li>
              </ol>
            </div>

            {/* Buying */}
            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white">Buying Templates</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>
                  <strong>Figma</strong> — Visit product page → Buy → Payment successful → Download or receive via email.
                </li>
                <li>
                  <strong>Azeorex</strong> — Same flow; after payment, the template is automatically cloned into your Projects for editing & deployment.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI, Analytics, Community */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Platform Features</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* AI */}

            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-xl bg-indigo-50 p-2 text-indigo-600">
                  <Wand2 className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">AI-Powered Features</h3>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-2 text-slate-300">
                <li>AI Template Generator — Create layouts from natural language prompts.</li>
                <li>AI Design Suggestions — Smart recommendations for color, typography, and layout.</li>
                <li>AI Code Generation — Turn Figma designs into Azeorex templates.</li>
              </ul>
            </div>

            {/* Analytics */}
            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-xl bg-emerald-50 p-2 text-emerald-600">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">Analytics Dashboard</h3>
              </div>
              <p className="mt-4 text-slate-300">Get clear insights on performance to grow your products.</p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-slate-300">
                <li>Downloads</li>
                <li>Sales</li>
                <li>Visitor stats</li>
              </ul>
            </div>

            {/* Community */}
            <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-xl bg-rose-50 p-2 text-rose-600">
                  <Users className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">Community Features</h3>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-2 text-slate-300">
                <li>Ratings & Reviews</li>
                <li>Follow creators</li>
                <li>Template collections & curation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mx-auto max-w-6xl">
          <div className="p-8 px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our Vision</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Our mission is to bridge the gap between design and development. Whether you’re a freelancer, startup, or enterprise, Azeorex helps you design, deploy, and monetize your work from a
              single platform.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-2xl border border-slate-700 p-4">
                <h4 className="font-semibold text-white">Why Teams Choose Us</h4>
                <ul className="mt-2 list-disc list-inside text-slate-300 space-y-1">
                  <li>All-in-one ecosystem</li>
                  <li>Seamless static deployment</li>
                  <li>Monetize your creativity</li>
                  <li>Marketplace-ready templates</li>
                  <li>Modern Technologies</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-2xl border border-slate-700 p-4">
                <h4 className="font-semibold text-white">Use of SaaS</h4>
                <ul className="mt-2 list-disc list-inside text-slate-300 space-y-1">
                  <li>Build portfolio, blog, static website etc.</li>
                  <li>No coding skills needed.</li>
                  <li>Intuitive editor for easy customization.</li>
                  <li>Fast customization and deployment in minutes.</li>
                  <li>Cost-effective — no need to hire developers.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pt-4 pb-16">
          <div className="rounded-2xl border border-slate-700 bg-[#1a1a1a] p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Start building with Azeorex</h3>
                <p className="mt-2 text-slate-300">Create a project, design your pages, and ship a live site in minutes.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/saas/projects"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Rocket className="mr-2 h-4 w-4" /> Get Started
                </Link>
                <Link
                  href="/saas/templates"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200"
                >
                  <Store className="mr-2 h-4 w-4" /> Explore Marketplace
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-dashed">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-300">© {new Date().getFullYear()} Azeorex. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Page;
