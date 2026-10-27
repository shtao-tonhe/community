import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Topics.css'
import { dataUrl } from '../dataUrl'

type Topic = {
  id: string
  name: string
  count?: string
  description?: string
}

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    fetch(dataUrl('topics/index.json'))
      .then((res) => res.json())
      .then(setTopics)
      .catch(() => setTopics([]))
  }, [])

  return (
    <div className="topics-page">
      <header className="page-header">
        <h1>话题</h1>
      </header>
      <div className="divider" />
      <div className="topics-list">
        {topics.map((topic) => (
          <Link to={`/topic/${topic.id}`} key={topic.id} className="topic-list-card">
            <div className="topic-list-cover" />
            <div className="topic-list-info">
              <div className="topic-list-title">{topic.name}</div>
              <div className="topic-list-desc">{topic.description || topic.count || ''}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
