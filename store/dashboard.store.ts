import { z } from 'zod';
import { create } from 'zustand';

const DashboardSchema = z.object({
  userIds: z
    .object({
      clerkId: z.string(),
      sanityId: z.string(),
    })
    .optional(),
  role: z.enum(['admin', 'member', 'null']).optional(),

  setUserIds: z
    .function()
    .args(
      z.object({
        clerkId: z.string(),
        sanityId: z.string(),
      })
    )
    .returns(z.void()),

  setRole: z
    .function()
    .args(z.enum(['admin', 'member', 'null']))
    .returns(z.void()),
});

type DashboardProps = z.infer<typeof DashboardSchema>;

const useDashboardStore = create<DashboardProps>((set) => ({
  userIds: undefined,
  role: undefined,
  setUserIds: (userIds: DashboardProps['userIds']) => set({ userIds }),
  setRole: (role: DashboardProps['role']) => set({ role }),
}));

export default useDashboardStore;
