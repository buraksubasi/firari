import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import { MenuList } from './menu-list'

// ISR: 60 saniyede bir sayfayı yeniden oluştur
export const revalidate = 60
export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch menus from CMS using local API (monolithic architecture)
  const menus = await payload.find({
    collection: 'menus',
    depth: 2, // Include related data (media and category)
  })

  return (
    <div className="home">
      <div className="content">
        <h1>Menüler</h1>
        <p>Toplam {menus.totalDocs} menü bulundu</p>
        
        <MenuList menus={menus.docs} />
      </div>
    </div>
  )
}

