"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // [^1]
import { Checkbox } from "@/components/ui/checkbox"; // [^2]
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  className?: string
};

const MultiStepDialog = ({ triggerBtn, allProjects, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    acceptedPrivacy: false,
    selectedProject: null as string | null,
    // selectedSubProjects: [] as string[],
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

  return (
    <div className={className}>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <div onClick={() => setOpen(true)}>{triggerBtn}</div>
        </DialogTrigger>
        <DialogContent className={step === 3 ? "w-[1000px] max-w-[1000px] overflow-hidden rounded-2xl" : `sm:max-w-[500px]`}>
          <DialogHeader>
            <DialogTitle>
              {step === 1 && "Privacy Policy"}
              {step === 2 && "Select Project"}
              {step === 3 && "Project Details"}
            </DialogTitle>
            <DialogDescription>
              {step === 1 && "Please accept our privacy policy to continue"}
              {step === 2 && "Choose a project from the list below"}
              {step === 3 && "Enter details for your upload"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Step 1: Privacy Policy */}
            {step === 1 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.acceptedPrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptedPrivacy: checked as boolean })}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="privacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the privacy policy
                  </Label>
                  <p className="text-sm text-muted-foreground">By checking this box, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </div>
            )}

            {/* Step 2: Project Selection */}
            {step === 2 && (
              <div className="space-y-3">
                {allProjects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-colors ${formData.selectedProject === project.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                    onClick={() => setFormData({ ...formData, selectedProject: project.id, funnelPage: [...project.FunnelPages], title: project.name, description: project.description })}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">{project.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 3: Upload Form */}
            {step === 3 && (
              <TemplatesUpload defaultData={formData}/>
            )}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <div>
              <Button
                variant="outline"
                onClick={handleClose}
                className="mr-2"
              >
                Cancel
              </Button>
              {step < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canContinue()}
                >
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiStepDialog;
