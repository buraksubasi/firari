import { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'startDate', 'endDate'],
  },
  access: {
    read: () => true, // Herkes okuyabilir (public API)
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Kampanya Başlığı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL için benzersiz tanımlayıcı (örn: yaz-kampanyasi-2024)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kısa Açıklama',
      admin: {
        description: 'Kampanya kartında gösterilecek kısa açıklama',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Detaylı İçerik',
      admin: {
        description: 'Kampanya detay sayfasında gösterilecek tam içerik',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Kampanya Görseli',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeri',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Kategori',
      admin: {
        description: 'Kampanya kategorisi',
      },
    },
    {
      name: 'menu',
      type: 'relationship',
      relationTo: 'menus',
      label: 'Menü',
      admin: {
        description: 'Bu kampanyanın gösterileceği menü',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Başlangıç Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      label: 'Bitiş Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'discountPercentage',
      type: 'number',
      label: 'İndirim Oranı (%)',
      min: 0,
      max: 100,
    },
    {
      name: 'couponCode',
      type: 'text',
      label: 'Kupon Kodu',
      admin: {
        description: 'Kampanya için kullanılacak kupon kodu (opsiyonel)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: false,
      admin: {
        description: 'Kampanyayı aktif/pasif yapın',
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Öne Çıkan',
      defaultValue: false,
      admin: {
        description: 'Ana sayfada öne çıkarılsın mı?',
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'number',
      label: 'Öncelik Sırası',
      defaultValue: 0,
      admin: {
        description: 'Daha yüksek sayı = daha önde görünür',
        position: 'sidebar',
      },
    },
  ],
}
