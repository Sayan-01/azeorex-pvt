"use server";

import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { CreateFunnelFormSchema, CreateMediaType, Warframe } from "@/types/types";
import { getSession } from "next-auth/react";
import { z } from "zod";
import { db } from "./db";
import { v4 } from "uuid";
import { Agency, Media, Prisma, User } from "@prisma/client";
import { EditorElement } from "../../providers/editor/editor-provider";

//============================================================

export const getUserDetails = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user && !session) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user?.email as string,
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
        },
      },
      Permissions: true,
    },
  });

  return userData;
};

//=============================================================

export const saveActivityLogsNotification = async ({ agencyId, description }: { agencyId: string | undefined; description: string }) => {
  const session = await auth();
  if (!session) redirect("/agency/sign-in");

  // let userData;

  // if (session?.user) {
  //   const response = await db.user.findFirst({
  //     where: {
  //       Agency: {
  //         SubAccount: {
  //           some: { id: subAccountId },
  //         },
  //       },
  //     },
  //   });
  //   if (response) {
  //     userData = response;
  //   }
  // } else {
  //   console.log("User not find");
  //   return;
  // }

  let foundAgencyId = agencyId;

  if (agencyId) {
    await db.notification.create({
      data: {
        notification: `${session?.user?.name} | ${description}`,
        User: {
          connect: {
            id: session?.user?.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
      },
    });
  }
};

//=============================================================

export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;
  const response = await db.user.create({ data: { ...user } });
  return response;
};

//=============================================================

export const verifyAndAcceptInvitation = async () => {
  const session = await auth();
  const user = session?.user;
  if (!session || !user) redirect("/agency/sign-in");

  const invitationExist = await db.invitation.findUnique({
    where: {
      email: session?.user?.email as string,
      status: "PENDING",
    },
  });

  if (invitationExist) {
    //@ts-expect-error xyz
    const userDetails = await createTeamUser(invitationExist?.agencyId, {
      email: invitationExist.email,
      agencyId: invitationExist.agencyId,
      id: user.id as string,
      avatarUrl: `${session?.user?.image}`,
      name: `${session?.user?.name}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: invitationExist.role,
    });
    await saveActivityLogsNotification({ agencyId: invitationExist?.agencyId, description: "Joined" });

    if (userDetails) {
      const session = await getSession();
      if (session && session.user) {
        //@ts-expect-error xyz
        session.user.role = userDetails.role || "SUBACCOUNT_USER";
      }

      await db.invitation.delete({
        where: { email: userDetails.email },
      });

      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await db.user.findUnique({
      where: {
        email: user?.email as string,
      },
    });
    return agency ? agency.agencyId : null;
  }
};

//============================================================================

export const updateAgencyDetails = async (agencyId: string, agencyDetails: Partial<Agency>) => {
  const response = await db.agency.update({
    where: { id: agencyId },
    data: { ...agencyDetails },
  });
  return response;
};

//============================================================================

export const deleteAgency = async (agencyId: string) => {
  const response = await db.agency.delete({ where: { id: agencyId } });
  return response;
};

//============================================================================

export const upsertAgency = async (agency: Agency) => {
  if (!agency.companyEmail) return null;
  const permissionId = v4();

  try {
    const agencyDetails = await db.agency.upsert({
      where: {
        id: agency.id,
      },
      update: agency,
      create: {
        ...agency,
        users: {
          connect: { email: agency.companyEmail },
        },
        Permissions: {
          create: {
            access: true,
            email: agency.companyEmail,
            id: permissionId,
          },
        },
        Pipeline: {
          create: { name: "Lead Cycle" },
        },
        SidebarOption: {
          create: [
            {
              name: "Dashboard",
              icon: "category",
              link: `/agency/${agency.id}`,
            },
            {
              name: "Funnels",
              link: `/agency/${agency.id}/funnels`,
              icon: "pipelines",
            },
            {
              name: "Media",
              link: `/agency/${agency.id}/media`,
              icon: "database",
            },
            {
              name: "Automations",
              link: `/agency/${agency.id}/automations`,
              icon: "chip",
            },
            {
              name: "Pipelines",
              link: `/agency/${agency.id}/pipelines`,
              icon: "flag",
            },
            {
              name: "Contacts",
              link: `/agency/${agency.id}/contacts`,
              icon: "person",
            },
            {
              name: "Billing",
              icon: "payment",
              link: `/agency/${agency.id}/billing`,
            },
            {
              name: "Team",
              icon: "shield",
              link: `/agency/${agency.id}/team`,
            },
            {
              name: "Settings",
              icon: "settings",
              link: `/agency/${agency.id}/settings`,
            },
            {
              name: "Launchpad",
              icon: "clipboardIcon",
              link: `/agency/${agency.id}/launchpad`,
            },
          ],
        },
      },
    });
    return agencyDetails;
  } catch (error) {
    console.log(error);
  }
};

//=============================================================================

export const updateUserRole = async (newUser: Partial<User>) => {
  const session = await auth();
  if (!session) return;

  await db.user.update({
    where: { email: session?.user?.email as string }, // Search for user by email
    data: {
      role: newUser.role || "SUBACCOUNT_USER",
      agencyId: newUser.agencyId,
    },
  });
};

//==============================================================================

export const getNotificationAndUser = async (agencyId: string) => {
  try {
    const response = await db.notification.findMany({
      where: { agencyId },
      include: { User: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//===============================================================================

// export const upsertSubAccount = async (subAccount: SubAccount) => {
//   if (!subAccount.companyEmail) return null;
//   const agencyOwner = await db.user.findFirst({
//     where: {
//       Agency: {
//         id: subAccount.agencyId,
//       },
//       role: "AGENCY_OWNER",
//     },
//   });
//   if (!agencyOwner) return console.log("🔴Erorr could not create subaccount");
//   const permissionId = v4();
//   const response = await db.subAccount.upsert({
//     where: { id: subAccount.id },
//     update: subAccount,
//     create: {
//       ...subAccount,
//       Permissions: {
//         create: {
//           access: true,
//           email: agencyOwner.email,
//           id: permissionId,
//         },
//         connect: {
//           subAccountId: subAccount.id,
//           id: permissionId,
//         },
//       },
//       Pipeline: {
//         create: { name: "Lead Cycle" },
//       },
//       SidebarOption: {
//         create: [
//           {
//             name: "Launchpad",
//             link: `/subaccount/${subAccount.id}/launchpad`,
//             icon: "clipboardIcon",
//           },
//           {
//             name: "Settings",
//             link: `/subaccount/${subAccount.id}/settings`,
//             icon: "settings",
//           },
//           {
//             name: "Funnels",
//             link: `/subaccount/${subAccount.id}/funnels`,
//             icon: "pipelines",
//           },
//           {
//             name: "Media",
//             link: `/subaccount/${subAccount.id}/media`,
//             icon: "database",
//           },
//           {
//             name: "Automations",
//             link: `/subaccount/${subAccount.id}/automations`,
//             icon: "chip",
//           },
//           {
//             name: "Pipelines",
//             link: `/subaccount/${subAccount.id}/pipelines`,
//             icon: "flag",
//           },
//           {
//             name: "Contacts",
//             link: `/subaccount/${subAccount.id}/contacts`,
//             icon: "person",
//           },
//           {
//             name: "Dashboard",
//             link: `/subaccount/${subAccount.id}`,
//             icon: "category",
//           },
//         ],
//       },
//     },
//   });
//   return response;
// };

//===============================================================================

export const getUserPermissions = async (userId: string) => {
  const response = await db.user.findUnique({
    where: { id: userId },
    select: { Permissions: { include: { Agency: true } } },
  });

  return response;
};

//===============================================================================

// export const getSubaccountDetails = async (subaccountId: string) => {
//   const response = await db.subAccount.findUnique({
//     where: {
//       id: subaccountId,
//     },
//   });
//   return response;
// };

//===============================================================================

// export const deleteSubAccount = async (subaccountId: string) => {
//   const response = await db.subAccount.delete({
//     where: {
//       id: subaccountId,
//     },
//   });
//   return response;
// };

//================================================================================

export const getFunnel = async (funnelId: string) => {
  const funnel = await db.funnel.findUnique({
    where: { id: funnelId },
    include: {
      FunnelPages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return funnel;
};

//=============================================================================

export const getFunnels = async (agencyId: string) => {
  const funnels = await db.funnel.findMany({
    where: { agencyId: agencyId },
    include: { FunnelPages: true },
  });

  return funnels;
};
//==============================================================================

export const getProject = async (projectId: string) => {
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      FunnelPages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return project;
};

//=============================================================================

export const getProjects = async (userId: string | undefined) => {
  if (userId === undefined) return;
  const projects = await db.project.findMany({
    where: { userId: userId },
    include: { FunnelPages: true },
  });

  return projects;
};
//===============================================================================

export const upsertFunnel = async (agencyId: string, funnel: z.infer<typeof CreateFunnelFormSchema> & { liveProducts: string }, funnelId: string) => {
  const response = await db.funnel.upsert({
    where: { id: funnelId },
    update: funnel,
    create: {
      ...funnel,
      id: funnelId || v4(),
      agencyId: agencyId,
    },
  });

  return response;
};
//===============================================================================

export const upsertProject = async (userId: string, project: z.infer<typeof CreateFunnelFormSchema> & { liveProducts: string }, projectId: string) => {
  const response = await db.project.upsert({
    where: { id: projectId },
    update: project,
    create: {
      ...project,
      id: projectId || v4(),
      userId: userId,
    },
  });

  return response;
};

//==============================================================================

export const upsertFunnelPage = async (agencyId: string, funnelPage: any, funnelId: string) => {
  if (!agencyId || !funnelId) return;
  const response = await db.funnelPage.upsert({
    where: { id: funnelPage.id || "" },
    update: { ...funnelPage },
    create: {
      ...funnelPage,
      content: funnelPage.content
        ? funnelPage.content
        : JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgrondColor: "#f8f8f8" },
              type: "__body",
            },
          ]),
      funnelId,
    },
  });

  return response;
};

export const upsertFunnelPageForProject = async (funnelPage: any, projectId: string) => {
  if (!projectId) return;
  const response = await db.funnelPage.upsert({
    where: { id: funnelPage.id || "" },
    update: { ...funnelPage },
    create: {
      ...funnelPage,
      content: funnelPage.content
        ? funnelPage.content
        : JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgrondColor: "#f8f8f8" },
              type: "__body",
            },
          ]),
      projectId,
    },
  });

  return response;
};

//==============================================================================

// export const createComponents = async (component:EditorElement) => {
//   const response = await db.component
// }

//==============================================================================

export const createWarframe = async (warframe: Warframe) => {
  const response = await db.warframeObj.create({
    data: {
      id: warframe.id,
      warframe_name: warframe.warframe_name,
      warframe_image: warframe.warframe_image,
      warframe: warframe.warframe,
    },
  });

  return response;
};

//==============================================================================

export const findWarframe = async () => {
  const response = await db.warframeObj.findMany({
    orderBy: {
      warframe_name: "asc",
    },
  });
  return response;
};

//==============================================================================

export const deleteWarframe = async (warframeId: string) => {
  const response = await db.warframeObj.delete({
    where: {
      id: warframeId,
    },
  });
  return response;
};

//==============================================================================

export const getFunnelPageDetails = async (funnelPageId: string) => {
  const response = await db.funnelPage.findUnique({
    where: {
      id: funnelPageId,
    },
  });

  return response;
};

export const deleteFunnelePage = async (funnelPageId: string) => {
  const response = await db.funnelPage.delete({
    where: {
      id: funnelPageId,
    },
  });
  return response;
};

//============================================================================

export const getDomainContent = async (subDomainName: string) => {
  const response = await db.funnel.findUnique({
    where: {
      subDomainName,
    },
    include: { FunnelPages: true },
  });
  return response;
};

//=============================================================================

export const deleteMedia = async (mediaId: string) => {
  const response = await db.media.delete({
    where: {
      id: mediaId,
    },
  });
  return response;
};

//=============================================================================

export const createMedia = async (agencyId: string, mediaFile: CreateMediaType) => {
  const response = await db.media.create({
    data: {
      link: mediaFile.link,
      name: mediaFile.name,
      projectId: agencyId,
    },
  });

  return response;
};

//=========================================================================

export const getMedia = async (agencyId: string) => {
  const mediafiles = await db.project.findUnique({
    where: {
      id: agencyId,
    },
    include: { Media: true },
  });
  return mediafiles;
};

//=============================================================================
