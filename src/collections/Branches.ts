import { CollectionConfig } from 'payload'

export const Branches: CollectionConfig = {
  slug: 'branches',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'phone'],
  },
  access: {
    read: () => true, // Herkes okuyabilir (public API)
    create: ({ req: { user } }) => !!user, // Sadece giriş yapmış kullanıcılar oluşturabilir
    update: ({ req: { user } }) => !!user, // Sadece giriş yapmış kullanıcılar güncelleyebilir
    delete: ({ req: { user } }) => !!user, // Sadece giriş yapmış kullanıcılar silebilir
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Şube Adı',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Adres',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Şehir',
    },
    {
      name: 'district',
      type: 'text',
      label: 'İlçe',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-posta',
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Çalışma Saatleri',
      admin: {
        placeholder: 'Örn: Pazartesi-Cuma 09:00-18:00',
      },
    },
    {
      name: 'location',
      type: 'group',
      label: 'Konum Bilgileri',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
          label: 'Enlem (Latitude)',
          admin: {
            step: 0.0000001,
            description: 'Şubenin harita üzerindeki enlem değeri',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
          label: 'Boylam (Longitude)',
          admin: {
            step: 0.0000001,
            description: 'Şubenin harita üzerindeki boylam değeri',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Şube Görseli',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Açıklama',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
    },
  ],
}
