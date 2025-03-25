import { getMedia } from "@/lib/queries";
import { Prisma } from "@prisma/client";
import { Document } from "mongoose";
import { Types } from "mongoose";
import { z } from "zod";
import { EditorElement } from "../../providers/editor/editor-provider";

export enum Role {
  AGENCY_OWNER = "AGENCY_OWNER",
  AGENCY_ADMIN = "AGENCY_ADMIN",
  SUBACCOUNT_USER = "SUBACCOUNT_USER",
  SUBACCOUNT_GUEST = "SUBACCOUNT_GUEST",
}

export enum Icon {
  settings = "settings",
  chart = "chart",
  calendar = "calendar",
  check = "check",
  chip = "chip",
  compass = "compass",
  database = "database",
  flag = "flag",
  home = "home",
  info = "info",
  link = "link",
  lock = "lock",
  messages = "messages",
  notification = "notification",
  payment = "payment",
  power = "power",
  receipt = "receipt",
  shield = "shield",
  star = "star",
  tune = "tune",
  videorecorder = "videorecorder",
  wallet = "wallet",
  warning = "warning",
  headphone = "headphone",
  send = "send",
  pipelines = "pipelines",
  person = "person",
  category = "category",
  contact = "contact",
  clipboardIcon = "clipboardIcon",
}

export enum TriggerTypes {
  CONTACT_FORM = "CONTACT_FORM",
}

export enum ActionType {
  CREATE_CONTACT = "CREATE_CONTACT",
}

export enum InvitationStatus {
  ACCEPTED = "ACCEPTED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
}

export const CreateFunnelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
});

export const FunnelPageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
});

export type EditorContentType = "text" | "container" | "section" | "contactForm" | "paymentForm" | "link" | "2Col" | "video" | "__body" | "image" | null | "3Col" | "element" | "svg" | "heading";

export type Warframe = {
  id: string;
  warframe_name: string;
  warframe_image: string;
  warframe: string;
};

export type CreateMediaType = Prisma.MediaCreateWithoutAgencyInput;
export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>;

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}
