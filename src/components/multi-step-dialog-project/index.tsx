"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import TemplatesUpload from "../forms/templatesUpload";

type FunnelPage = {
  id: string;
  name: string;
  pathName: string;
  createdAt: string;
  updatedAt: string;
  visits: number;
  content: string;
  order: number;
  previewImage: string | null;
  funnelId: string | null;
  projectId: string;
};

type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  published: boolean;
  subDomainName: string;
  favicon: string;
  userId: string;
  liveProducts: string;
  FunnelPages: FunnelPage[];
};

type Props = {
  triggerBtn: React.ReactNode;
  allProjects: Project[];
  className?: string;
};

const MultiStepDialog = ({ triggerBtn, allProjects, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    acceptedPrivacy: false,
    selectedProject: null as string | null,
    funnelPage: [] as FunnelPage[],
    title: "",
    description: "",
  });

  const resetForm = () => {
    setStep(1);
    setFormData({
      acceptedPrivacy: false,
      selectedProject: null,
      funnelPage: [],
      title: "",
      description: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    handleClose();
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return formData.acceptedPrivacy;
      case 2:
        return formData.selectedProject;
      case 3:
        return formData.title;
    }
  };

  const steps = [
    { id: 1, name: "Privacy" },
    { id: 2, name: "Project" },
    { id: 3, name: "Details" },
  ];

  return (
    <div className={className}>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <div onClick={() => setOpen(true)}>{triggerBtn}</div>
        </DialogTrigger>
        <DialogContent
          x={false}
          className={cn("overflow-hidden rounded-2xl sm:p-0 bg-zinc-900 transition-all duration-300 ease-in-out w-[90%] md:w-[500px] p-0",
            step === 3 ? "h-[calc(100%-40px)] md:h-[700px]" : ""
          )}
        >
          {/* Step Indicator */}
          <div className="px-6 pt-6">
            <nav aria-label="Progress">
              <ol className="flex items-center justify-between">
                {steps.map((stepItem, index) => (
                  <li
                    key={stepItem.name}
                    className="flex-1"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                          step > stepItem.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : step === stepItem.id
                              ? "border-zinc-400 bg-background text-foreground"
                              : "border-muted-foreground/20 text-muted-foreground"
                        )}
                      >
                        {step > stepItem.id ? <Check className="h-4 w-4" /> : stepItem.id}
                      </div>
                      <span className={cn("mt-2 text-xs font-medium transition-colors", step >= stepItem.id ? "text-foreground" : "text-muted-foreground")}>{stepItem.name}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-1 bg-primary "
                  initial={false}
                  animate={{
                    width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </nav>
          </div>

          <DialogHeader className="px-6 pb-2">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {step === 1 && "Privacy Policy"}
              {step === 2 && "Select Project"}
              {step === 3 && "Sell your Products"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {step === 1 && "Please accept our privacy policy to continue"}
              {step === 2 && "Choose a project from the list below"}
              {step === 3 && "Please describe your product details here"}
            </DialogDescription>
          </DialogHeader>

          <div className="sm:px-6 px-5 py-2 h-full overflow-y-auto box">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 1: Privacy Policy */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-zinc-800 border p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Checkbox
                            id="privacy"
                            checked={formData.acceptedPrivacy}
                            onCheckedChange={(checked) => setFormData({ ...formData, acceptedPrivacy: checked as boolean })}
                            className="h-5 w-5 border rounded-full data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground mt-1"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            By checking this box, you agree to our{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Project Selection */}
                {step === 2 && (
                  <div className="space-y-3">
                    {allProjects.length === 0 ? (
                      <div className="rounded-lg border border-dashed p-8 text-center">
                        <p className="text-muted-foreground">No projects found. Create a project to get started.</p>
                      </div>
                    ) : (
                      allProjects.map((project) => (
                        <motion.div
                          key={project.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <Card
                            className={cn(
                              "group cursor-pointer overflow-hidden transition-all duration-600",
                              formData.selectedProject === project.id ? "border-primary " : "border hover:border-primary/50"
                            )}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                selectedProject: project.id,
                                funnelPage: [...project.FunnelPages],
                                title: project.name,
                                description: project.description,
                              })
                            }
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{project.name.charAt(0).toUpperCase()}</div>
                                  <div>
                                    <h3 className="font-medium text-foreground group-hover:text-primary">{project.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description || "No description"}</p>
                                  </div>
                                </div>
                                {formData.selectedProject === project.id && (
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Check className="h-3.5 w-3.5" />
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {/* Step 3: Upload Form */}
                {step === 3 && (
                  <div className="space-y-4">
                    <TemplatesUpload defaultData={formData} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <DialogFooter className="flex-row items-center justify-between sm:px-6 px-5 pb-6 w-full">
            <Button
              onClick={handleClose}
              className=" rounded-full px-2  bg-zinc-800 text-muted-foreground hover:text-background"
            >
              <X size={20} />
            </Button>
            <div className="flex items-center justify-end gap-2 w-full">
              <div>
                {step > 1 && (
                  <Button
                    onClick={handleBack}
                    className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground bg-zinc-800 hover:bg-zinc-800"
                  >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    <p className="sm:flex hidden">Back</p>
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2 bg-zinc-900">
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canContinue()}
                    className="group flex items-center gap-1.5 px-4"
                  >
                    <p className="sm:flex hidden">Next</p>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="px-6"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiStepDialog;
