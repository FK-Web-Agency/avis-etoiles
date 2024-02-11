import { defineField, defineType } from 'sanity';
import { client } from '../lib';
import { Icons } from '@/components/shared';

export default defineType({
  name: 'team-collaborators',
  title: "Collaborateurs",
  type: 'document',
  icon: Icons.Teams,
  fields: [
    defineField({
      name: 'clerkId',
      title: 'id du membre',
      type: 'string',
      // readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Commerciale', value: 'commercial' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firstName',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Prenom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
/*     defineField({
      name: 'imageURL',
      title: 'Photo',
      type: 'string',
    }), */

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .email()
          .custom(async (email, schema) => {
            const filter = `*[_type == "teams" && email == $email]`;
            const params = { email };

            const duplicateEmails = await client.fetch(filter, params);
            // @ts-ignore
            if (duplicateEmails.length > 0 && !schema?.document._id.includes(duplicateEmails[0]._id)) {
              return 'Email already exists';
            }

            return true; // Email is unique
          })
          .error('Email already exists'),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
      media: 'photo',
    },
  },
});
