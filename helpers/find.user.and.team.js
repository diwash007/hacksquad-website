import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '../src/pages/api/auth/[...nextauth]';

import prisma from '~/prisma/client';

export default async function findUserAndTeam(req, res) {
  const partialUser = await unstable_getServerSession(req, res, authOptions(req, res));
  if (!partialUser) {
    return { user: null, team: null, admin: false };
  }
  const { social, ...user } = await prisma.user.findUnique({
    where: { email: partialUser.user.email },
    include: { social: true },
  });
  const twitter = !!social.find((p) => p.type === 'TWITTER');
  if (!user.teamId) {
    return { user, twitter, team: null, admin: false };
  }

  const team = await prisma.team.findUnique({
    where: { id: user.teamId },
    include: {
      users: true,
    },
  });

  team.users = team?.users?.map(({ email, ...all }) => ({
    ...all,
    email: user.id === all.id ? email : undefined,
  }));
  return {
    twitter,
    user,
    team,
    get admin() {
      return this.team.ownerId === user.id;
    },
  };
}
