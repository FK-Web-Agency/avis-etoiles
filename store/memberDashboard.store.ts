import { z } from "zod";
import { create } from 'zustand';

const memberDashboardSchema = z.object({
    memberIds: z.object({
        clerkId: z.string(),
        sanityId: z.string(),
    }).optional(),
    role: z.enum(['admin', 'member']).optional(),

    setMemberIds: z.function().args(z.object({
        clerkId: z.string(),
        sanityId: z.string(),
    })).returns(z.void()),

    setRole: z.function().args(z.enum(['admin', 'member'])).returns(z.void()),
});


type MemberDashboardProps = z.infer<typeof memberDashboardSchema>;


const memberDashboardStore = create<MemberDashboardProps>((set) => ({
    memberIds: undefined,
    role: undefined,
    setMemberIds: (memberIds: MemberDashboardProps['memberIds']) => set({ memberIds }),
    setRole: (role: MemberDashboardProps['role']) => set({ role }),
}));


export default memberDashboardStore;