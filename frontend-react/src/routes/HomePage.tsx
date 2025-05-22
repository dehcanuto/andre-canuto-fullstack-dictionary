import React from 'react'
import Header from '@components/organisms/Header'
import WordFlow from '@components/organisms/WordFlow'

const HomeView: React.FC = () => {
  return (
    <main className="bg-slate-100 min-h-screen">
      <Header />
      <WordFlow />
    </main>
  )
}

export default HomeView
