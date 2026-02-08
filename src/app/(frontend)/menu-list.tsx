'use client'

import Image from 'next/image'
import { useState } from 'react'

interface MenuListProps {
  menus: any[]
}

export function MenuList({ menus }: MenuListProps) {
  const [selectedMenu, setSelectedMenu] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (menu: any) => {
    setSelectedMenu(menu)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMenu(null), 200) // Reset after animation
  }

  return (
    <>
      <div style={{
        maxHeight: '600px',
        overflowY: 'auto',
        maxWidth: '800px',
        margin: '20px auto',
        padding: '10px'
      }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menus.map((menu: any) => (
            <li 
              key={menu.id} 
              onClick={() => openModal(menu)}
              style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'flex',
                gap: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {menu.image && typeof menu.image === 'object' && menu.image.url && (
                <div style={{ flexShrink: 0 }}>
                  <Image
                    src={menu.image.url}
                    alt={menu.title || 'Menü görseli'}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
              )}
              <div>
                <strong style={{ fontSize: '16px' }}>{menu.title}</strong>
                <br />
                {menu.description && (
                  <>
                    <small style={{ color: '#666' }}>{menu.description.substring(0, 80)}...</small>
                    <br />
                  </>
                )}
                {menu.price && (
                  <strong style={{ color: '#e63946' }}>{menu.price} ₺</strong>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '30px',
              position: 'relative',
              animation: 'slideUp 0.3s'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                padding: '5px 10px'
              }}
            >
              ✕
            </button>

            {selectedMenu && (
              <>
                {selectedMenu.image && typeof selectedMenu.image === 'object' && selectedMenu.image.url && (
                  <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Image
                      src={selectedMenu.image.url}
                      alt={selectedMenu.title || 'Menü görseli'}
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                )}

                <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>{selectedMenu.title}</h2>
                
                {selectedMenu.price && (
                  <p style={{ fontSize: '20px', color: '#e63946', fontWeight: 'bold', marginBottom: '15px' }}>
                    {selectedMenu.price} ₺
                  </p>
                )}

                {selectedMenu.description && (
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Açıklama</h3>
                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedMenu.description}</p>
                  </div>
                )}

                {selectedMenu.ingredients && (
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>İçindekiler</h3>
                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedMenu.ingredients}</p>
                  </div>
                )}

                {selectedMenu.allergens && (
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Alerjen Bilgisi</h3>
                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedMenu.allergens}</p>
                  </div>
                )}

                {selectedMenu.calories && (
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Kalori</h3>
                    <p style={{ color: '#666' }}>{selectedMenu.calories} kcal</p>
                  </div>
                )}

                {selectedMenu.category && (
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Kategori</h3>
                    <p style={{ color: '#666' }}>
                      {typeof selectedMenu.category === 'object' ? selectedMenu.category.name : selectedMenu.category}
                    </p>
                  </div>
                )}

                {selectedMenu.tags && selectedMenu.tags.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Etiketler</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedMenu.tags.map((tagObj: any, idx: number) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: '#e9ecef',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '14px',
                            color: '#495057'
                          }}
                        >
                          {tagObj.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px', 
                  borderTop: '1px solid #ddd',
                  display: 'flex',
                  gap: '10px',
                  fontSize: '12px',
                  color: '#999'
                }}>
                  {selectedMenu.isNew && <span>🆕 Yeni</span>}
                  {selectedMenu.isFeatured && <span>⭐ Öne Çıkan</span>}
                  {selectedMenu.isActive ? <span>✅ Aktif</span> : <span>❌ Pasif</span>}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
