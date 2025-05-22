import React, { useState, useEffect } from 'react'

type Tab = {
  name: string
  label: string
}

type WordTabsProps = {
  tabs: Tab[]
  defaultTab?: string
  children?: React.ReactNode
}

const WordTabs: React.FC<WordTabsProps> = ({ tabs, defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.name)

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab)
    }
  }, [defaultTab])

  const getSlotContent = () => {
    const slot = React.Children.toArray(children).find(
      (child: any) => child.props?.tab === activeTab
    )
    return slot || null
  }

  return (
    <div className="w-full p-4 bg-white shadow rounded-xl">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            role="tab"
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 font-semibold rounded-lg cursor-pointer ${
              activeTab === tab.name
                ? 'bg-blue-400 text-white hover:bg-blue-200'
                : 'text-gray-400 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-slate-100 text-gray-500 rounded-sm mt-4 p-4">
        {getSlotContent()}
      </div>
    </div>
  )
}

export default WordTabs