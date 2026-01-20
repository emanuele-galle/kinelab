import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Sistema',
    description: 'Utenti admin del sistema',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      label: 'Ruolo',
      options: [
        { label: 'Amministratore', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Trainer', value: 'trainer' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
