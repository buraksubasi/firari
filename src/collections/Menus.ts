import { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'isActive'],
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
      label: 'Menü Adı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL için benzersiz tanımlayıcı (örn: a-menusu)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Kategori',
      admin: {
        description: 'Bu menünün ait olduğu kategori (örn: Burgerler, Wrapler)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kısa Açıklama',
      admin: {
        description: 'Menü hakkında kısa açıklama',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Fiyat',
      admin: {
        description: 'Menü fiyatı (TL)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Menü Görseli',
    },
    {
      name: 'ingredients',
      type: 'textarea',
      label: 'İçindekiler',
      admin: {
        description: 'Menüde bulunan malzemeler listesi',
      },
    },
    {
      name: 'allergens',
      type: 'textarea',
      label: 'Alerjen Bilgisi',
      admin: {
        description: 'Alerji yapabilecek maddeler',
      },
    },
    {
      name: 'calories',
      type: 'number',
      label: 'Kalori',
      admin: {
        description: 'Besin değeri (kalori)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıralama',
      defaultValue: 0,
      admin: {
        description: 'Kategori içindeki gösterim sırası',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
      admin: {
        description: 'Menüyü aktif/pasif yapın',
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
      name: 'isNew',
      type: 'checkbox',
      label: 'Yeni Ürün',
      defaultValue: false,
      admin: {
        description: 'Yeni ürün rozeti gösterilsin mi?',
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiketler',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Etiket',
        },
      ],
      admin: {
        description: 'Örn: Vejetaryen, Glutensiz, Acılı',
      },
    },
  ],
}
