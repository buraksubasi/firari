import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'isActive'],
  },
  access: {
    read: () => true, // Herkes okuyabilir (public API)
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Kategori Adı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL için benzersiz tanımlayıcı (örn: ana-yemekler)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
      admin: {
        description: 'Kategori hakkında kısa açıklama',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'İkon/Görsel',
      admin: {
        description: 'Kategori için ikon veya görsel',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Üst Kategori',
      admin: {
        description: 'Alt kategori oluşturmak için üst kategoriyi seçin (opsiyonel)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıralama',
      defaultValue: 0,
      admin: {
        description: 'Kategorilerin gösterim sırası (düşük sayı önce görünür)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
      admin: {
        description: 'Kategoriyi aktif/pasif yapın',
        position: 'sidebar',
      },
    },
    {
      name: 'showInMenu',
      type: 'checkbox',
      label: 'Menüde Göster',
      defaultValue: true,
      admin: {
        description: 'Bu kategori ana menüde görünsün mü?',
        position: 'sidebar',
      },
    },
  ],
}
