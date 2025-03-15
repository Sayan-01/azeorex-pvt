"use client";
import { Button } from "@/components/ui/button";
import { MoveRight, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import TemplatesUpload from "@/components/forms/templatesUpload";
import MultiStepDialog from "@/components/multi-step-dialog-project";
import { getProjects } from "@/lib/queries";
import { auth } from "../../../../../auth";
import { useSession } from "next-auth/react";
import { Project } from "@prisma/client";

const CreatorBtn = ({ className }: { className?: string }) => {
  const { data: session } = useSession(); // ✅ Get session on client
  const userId = session?.user?.id;

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadProjects = async () => {
      try {
        const data = await getProjects(userId);
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [userId]);

  if (loading) return null;
  if (!userId || projects.length === 0) return null;

  return (
    <MultiStepDialog className={className}
      allProjects={projects}
      triggerBtn={
        <Button
          size="sm"
          className={`bg-blue-500 hover:bg-blue-500/80 text-white items-center flex gap-2 ${className}`}
        >
          <p className="hidden lg:flex items-center gap-2">
            Became a creator <MoveRight size={15} />
          </p>
          <p className="lg:hidden block">
            <Plus size={16} />
          </p>
        </Button>
      }
    />
  );
};

export default CreatorBtn;
