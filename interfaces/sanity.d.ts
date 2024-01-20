import type { BlockEditor, Image } from 'sanity';
import { z } from 'zod';

// Default schema
export const DefaultSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
  _id: z.string(),
});

const BlockEditorSchema = z.array(z.object({
  type: z.string(),
  children: z.array(z.object({
    text: z.string(),
    marks: z.array(z.object({
      type: z.string(),
    })),
  })),
}))

// Type Banner section
const BannerSchema = DefaultSchema.merge(
  z.object({
    subtitle: z.string(),
    title: z.string(),
    image: Image,
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

// How it works section
const HowItWorksSchema = DefaultSchema.merge({
  title: z.string(),
  description: z.string(),
  icon: z.array(IconManagerSchema),
});

/* -------------------------------------------------------------------------- */
/*                                 Prices Page                                */
/* -------------------------------------------------------------------------- */

const PriceSchema = DefaultSchema.merge({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  features: z.array(z.string()),
});

const PricesSchema = z.array(PriceSchema);

const OrderSchema = DefaultSchema.merge({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  features: z.array(z.string()),
});

/* -------------------------------------------------------------------------- */
/*                                 About Page                                 */
/* -------------------------------------------------------------------------- */
const BannerAboutSchema = z.object({
  title_gradient: z.array(
    z.object({
      text: z.string(),
      gradient: z.boolean(),
    })
  ),
  subtitle: z.string(),
  images: z.array(Image),
});

const StorySectionSchema = z.object({
  title: z.string(),
  subtitle: z.any(),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  image: Image,
});


const MissionSectionSchema = z.object({
  title: z.string(),
  subtitle: z.any(),
  values: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});


const ValuesSectionSchema = z.object({
  title: z.string(),
  subtitle: BlockEditorSchema,
  images: Image
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

// Type How it works section
type HowItWorksProps = z.infer<typeof HowItWorksSchema>;

/* -------------------------------------------------------------------------- */
/*                                 Prices Page                                */
/* -------------------------------------------------------------------------- */
type PriceProps = z.infer<typeof PriceSchema>;
type PricesProps = z.infer<typeof PricesSchema>;

/* -------------------------------------------------------------------------- */
/*                                 About Page                                 */
/* -------------------------------------------------------------------------- */
type BannerAboutProps = z.infer<typeof BannerAboutSchema>;
type StorySectionProps = z.infer<typeof StorySectionSchema>;
type MissionSectionProps = z.infer<typeof MissionSectionSchema>;
type ValuesSectionProps = z.infer<typeof ValuesSectionSchema>;