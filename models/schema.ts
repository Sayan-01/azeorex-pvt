// import {
//   ActionType,
//   IAction,
//   IAgency,
//   IAgencySidebarOption,
//   IAutomation,
//   IClassName,
//   Icon,
//   IContact,
//   IFunnel,
//   IFunnelPage,
//   IInvitation,
//   ILane,
//   IMedia,
//   INotification,
//   InvitationStatus,
//   IPermissions,
//   IPipeline,
//   ISubAccount,
//   ISubAccountSidebarOption,
//   ITag,
//   ITicket,
//   ITrigger,
//   IUser,
//   Role,
//   TriggerTypes,
// } from "@/types/types";
// import { Schema, model, Types, models } from "mongoose";

// // Schemas
// const userSchema = new Schema<IUser>({
//   username: { type: String, required: true },
//   image: { type: String, default: "/user.png" },
//   email: { type: String, required: true, unique: true },
//   googleId: { type: String },
//   role: { type: String, enum: Role, default: Role.SUBACCOUNT_USER },
//   agencyId: { type: Types.ObjectId, ref: "Agency" },
//   permissions: [{ type: Types.ObjectId, ref: "Permissions" }],
//   ticket: [{ type: Types.ObjectId, ref: "Ticket" }],
//   notification: [{ type: Types.ObjectId, ref: "Notification" }],
//   createdAt: { type: Date, default: Date.now },
// });

// const agencySchema = new Schema<IAgency>({
//   name: { type: String, required: true },
//   agencyLogo: { type: String }, // Assuming `Text` is string in MongoDB
//   companyEmail: { type: String },
//   companyPhone: { type: String },
//   whiteLabel: { type: Boolean, default: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
//   goal: { type: Number, default: 5 },
//   users: [{ type: Schema.Types.ObjectId, ref: "User" }], // Refers to `User` model
//   createdAt: { type: Date, default: Date.now },
//   subAccountsId: [{ type: Schema.Types.ObjectId, ref: "SubAccount" }],
//   sidebarOptions: [
//     {
//       name: { type: String, required: true },
//       link: { type: String, required: true },
//       icon: { type: String, enum: Icon, required: true },
//       _id: false,
//     },
//   ],
//   invitations: [{ type: Schema.Types.ObjectId, ref: "Invitation" }],
//   notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
//   addOns: [{ type: Schema.Types.ObjectId, ref: "AddOns" }],
// });

// const permissionsSchema = new Schema<IPermissions>({
//   email: { type: String, required: true },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
//   access: { type: Boolean, required: true },
// });

// const subAccountSchema = new Schema<ISubAccount>({
//   name: { type: String, required: true },
//   subAccountLogo: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   companyEmail: { type: String, required: true },
//   companyPhone: { type: String, required: true },
//   goal: { type: Number, default: 5 },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
//   agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
//   sidebarOptions: [
//     {
//       name: { type: String, required: true },
//       link: { type: String, required: true },
//       icon: { type: String, enum: Icon, required: true },
//       _id: false,
//     },
//   ],
//   permissions: [{ type: Schema.Types.ObjectId, ref: "Permissions" }],
//   funnels: [{ type: Schema.Types.ObjectId, ref: "Funnel" }],
//   media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
//   contact: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
//   trigger: [{ type: Schema.Types.ObjectId, ref: "Trigger" }],
//   automation: [{ type: Schema.Types.ObjectId, ref: "Automation" }],
//   pipeline: [{ type: Schema.Types.ObjectId, ref: "Pipeline" }],
//   tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
//   notification: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
// });

// const tagSchema = new Schema<ITag>({
//   name: { type: String, required: true },
//   color: { type: String, required: true },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
// });

// const pipelineSchema = new Schema<IPipeline>({
//   name: { type: String, required: true },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const laneSchema = new Schema<ILane>({
//   name: { type: String, required: true },
//   pipelineId: { type: Schema.Types.ObjectId, ref: "Pipeline", required: true },
//   order: { type: Number, default: 0 },
// });

// const ticketSchema = new Schema<ITicket>({
//   name: { type: String, required: true },
//   laneId: { type: Schema.Types.ObjectId, ref: "Lane", required: true },
//   order: { type: Number, default: 0 },
//   value: { type: Number },
//   description: { type: String },
// });

// const triggerSchema = new Schema<ITrigger>({
//   name: { type: String, required: true },
//   type: { type: String, enum: TriggerTypes, required: true },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
// });

// const automationSchema = new Schema<IAutomation>({
//   name: { type: String, required: true },
//   triggerId: { type: Types.ObjectId, ref: "Trigger" },
//   published: { type: Boolean, default: false },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
// });

// const actionSchema = new Schema<IAction>({
//   name: { type: String, required: true },
//   type: { type: String, enum: ActionType, required: true },
//   automationId: { type: Schema.Types.ObjectId, ref: "Automation", required: true },
//   laneId: { type: String, default: "0" },
// });

// const contactSchema = new Schema<IContact>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
// });

// const mediaSchema = new Schema<IMedia>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   link: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
// });

// const funnelSchema = new Schema<IFunnel>(
//   {
//     name: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date },
//     description: { type: String, default: null },
//     published: { type: Boolean, default: false },
//     subDomainName: { type: String, unique: true,  sparse: true },
//     favicon: { type: String, default: null },
//     subAccountId: { type: Schema.Types.ObjectId, ref: "SubAccount", required: true },
//     funnelPages: [{ type: Schema.Types.ObjectId, ref: "FunnelPage" }],
//     liveProducts: { type: String, default: "[]" },
//     className: [{ type: Schema.Types.ObjectId, ref: "ClassName" }],
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
//   }
// );

// const funnelPageSchema = new Schema<IFunnelPage>(
//   {
//     name: { type: String, required: true },
//     pathName: { type: String, default: null },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date },
//     visits: { type: Number, default: null },
//     content: { type: String, default: null },
//     order: { type: Number },
//     previewImage: { type: String },
//     funnelId: { type: Schema.Types.ObjectId, ref: "Funnel" },
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
//   }
// );

// const classNameSchema = new Schema<IClassName>(
//   {
//     name: { type: String, required: true },
//     color: { type: String, default: null },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date },
//     customData: { type: String, default: null },
//     funnelId: { type: Schema.Types.ObjectId, ref: "FunnelPage" },
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
//   }
// );

// const invitationSchema = new Schema<IInvitation>({
//   email: { type: String, required: true },
//   agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
//   status: { type: String, enum: InvitationStatus, default: InvitationStatus.PENDING },
//   role: { type: String, enum: Role, required: true },
// });

// const notificationSchema = new Schema<INotification>({
//   notification: { type: String, required: true },
//   agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
//   subAccountId: { type: Types.ObjectId, ref: "SubAccount" },
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
// });

// // Export models
// export const User = models?.User || model<IUser>("User", userSchema);
// export const Agency = models.Agency || model<IAgency>("Agency", agencySchema);
// export const Permissions = models.Permissions || model<IPermissions>("Permissions", permissionsSchema);
// export const SubAccount = models.SubAccount || model<ISubAccount>("SubAccount", subAccountSchema);
// export const Tag = models.Tag || model<ITag>("Tag", tagSchema);
// export const Pipeline = models.Pipeline || model<IPipeline>("Pipeline", pipelineSchema);
// export const Lane = models.Lane || model<ILane>("Lane", laneSchema);
// export const Ticket = models.Ticket || model<ITicket>("Ticket", ticketSchema);
// export const Trigger = models.Trigger || model<ITrigger>("Trigger", triggerSchema);
// export const Automation = models.Automation || model<IAutomation>("Automation", automationSchema);
// export const Action = models.Action || model<IAction>("Action", actionSchema);
// export const Contact = models.Contact || model<IContact>("Contact", contactSchema);
// export const Media = models.Media || model<IMedia>("Media", mediaSchema);
// export const Funnel = models.Funnel || model<IFunnel>("Funnel", funnelSchema);
// export const ClassName = models.ClassName || model<IClassName>("ClassName", classNameSchema);
// export const FunnelPage = models.FunnelPage || model<IFunnelPage>("FunnelPage", funnelPageSchema);
// export const Invitation = models.Invitation || model<IInvitation>("Invitation", invitationSchema);
// export const Notification = models.Notification || model<INotification>("Notification", notificationSchema);
