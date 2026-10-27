import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../pages/Home.css'

type Topic = {
  id: string
  name: string
  description?: string
}

export default function TopicsSidebar({ onTopicSelect }: { onTopicSelect?: (topicId: string) => void }) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [, setSearchParams] = useSearchParams()

  useEffect(() => {
    fetch('./data/topics/index.json')
      .then((res) => res.json())
      .then(setTopics)
      .catch(() => setTopics([]))
  }, [])

  const openTopic = (topicId: string) => {
    if (onTopicSelect) {
      onTopicSelect(topicId)
      return
    }

    setSearchParams({ topic: topicId })
  }

  return (
    <aside className="topics-sidebar">
      <div className="sidebar-header">
        <h2>话题</h2>
      </div>
      <div className="topics-list-vertical">
        {topics.map((topic) => (
          <button key={topic.id} className="topic-item topic-item-button" onClick={() => openTopic(topic.id)}>
            <div className="topic-item-cover" />
            <div className="topic-item-info">
              <div className="topic-item-title">{topic.name}</div>
              <div className="topic-item-desc">{topic.description || ''}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
