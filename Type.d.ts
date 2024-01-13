import type { BlockEditor, Image } from 'sanity';
import { z } from 'zod';

// Default schema
const DefaultSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
  _id: z.string(),
});

// Type Banner section
const BannerSchema = DefaultSchema.merge(
  z.object({
    subtitle: z.string(),
    title: z.string(),
    image: z.instanceof(Image),
  })
);

const IconManagerSchema = z.object({
  _type: z.literal('icon.manager'),
  icon: z.string(),
  metadata: z.object({
    iconName: z.string(),
    collectionId: z.string(),
    collectionName: z.string(),
    url: z.string(),
    downloadUrl: z.string(),
    inlineSvg: z.string(),
    hFlip: z.boolean(),
    vFlip: z.boolean(),
    flip: z.string(),
    rotate: z.number(),
    size: z.object({
      width: z.number(),
      height: z.number(),
    }),
    color: z.object({
      hex: z.string(),
      rgba: z.object({
        r: z.number(),
        g: z.number(),
        b: z.number(),
        a: z.number(),
      }),
    }),
    palette: z.boolean(),
    author: z.object({
      name: z.string(),
      url: z.string(),
    }),
  }),
  license: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const AdvantageSchema = DefaultSchema.merge(
  z.object({
    title: z.string(),
    description: z.string(),
    icon: z.array(IconManagerSchema),
  })
);

const AdvantagesSchema = DefaultSchema.merge(
  z.object({
    title: z.string(),
    subtitle: z.string(),
    advantages: z.array(AdvantageSchema),
  })
);

const CallToActionSchema = DefaultSchema.merge(
  z.object({
    title: z.string(),
    subtitle: z.string(),
    // Svg
    image: z.any(),
  })
);

// Story section
const StorySchema = DefaultSchema.merge(
  z.object({
    title: z.string(),
    subtitle: z.string(),
    images: z.array(z.instanceof(Image)),
  })
);

/* -------------------------------------------------------------------------- */
/*                                Features Page                               */
/* -------------------------------------------------------------------------- */
const IntroSectionSchema = z.object({
  title: z.array(
    z.object({
      text: z.string(),
      gradient: z.boolean(),
    })
  ),
  subtitle: z.string(),
});

// Information Footer
const informationFooterSchema = z.object({
  title: z.string(),
  content: z.array(z.any()),
});

// Default props
type DefaultProps = z.infer<typeof DefaultSchema>;

// Type Banner section
type BannerProps = z.infer<typeof BannerSchema>;

// Type Icon manager
type IconManagerProps = z.infer<typeof IconManagerSchema>;

// Type Advantage section
type Advantage = z.infer<typeof AdvantageSchema>;
type AdvantagesProps = z.infer<typeof AdvantagesSchema>;

// Type Call to action section
type CallToActionProps = z.infer<typeof CallToActionSchema>;

// Type Story section
type StoryProps = z.infer<typeof StorySchema>;

// Type Information Footer
type InformationFooterProps = z.infer<typeof informationFooterSchema>;

/* -------------------------------------------------------------------------- */
/*                                Features Page                               */
/* -------------------------------------------------------------------------- */
// Type Intro section
type IntroSectionProps = z.infer<typeof IntroSectionSchema>;