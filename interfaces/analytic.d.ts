import { z } from 'zod';

const MonthSchema = z.object({
  month: z.date(),
  visitors: z.number(),
  google: z.number(),
  facebook: z.number(),
  instagram: z.number(),
});

const AnalyticItemSchema = z.object({
  year: z.date(),
  months: z.array(MonthSchema),
});

const AnalyticsSchema = z.object({
  user: z.string(),
  analytics: z.array(z.object(AnalyticItemSchema)),
});

type IAnalyticItem = z.infer<typeof AnalyticItemSchema>;
type IAnalytics = z.infer<typeof AnalyticsSchema>;
type IMonth = z.infer<typeof MonthSchema>;