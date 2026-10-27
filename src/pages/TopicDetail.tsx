import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Giscus from '../components/Giscus'
import './TopicDetail.css'
import { dataUrl } from '../dataUrl'

type Topic = {
  id: string
  name: string
  description: string
}

export default function TopicDetail() {
  const { id } = useParams()
  const [topic, setTopic] = useState<Topic | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(dataUrl(`topics/${id}.json`))
      .then((res) => res.json())
      .then(setTopic)
      .catch(() => setTopic(null))
  }, [id])

  if (!topic) return <div className="detail">加载中...</div>

  return (
    <div className="topic-detail">
      <header className="detail-header">
        <Link to="/topics" className="back">
          ← 返回话题列表
        </Link>
        <span className="detail-title">话题详情</span>
      </header>
      <div className="divider" />
      <section className="topic-header">
        <div className="topic-header-cover" />
        <div className="topic-header-info">
          <div className="topic-header-title">{topic.name}</div>
          <div className="topic-header-desc">{topic.description}</div>
        </div>
      </section>
      <div className="divider" />
      <section className="comments-section">
        <h3>讨论</h3>
        <Giscus term={`topic:${topic.id}`} />
      </section>
    </div>
  )
}
