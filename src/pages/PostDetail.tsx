import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Giscus from '../components/Giscus'
import TopicsSidebar from '../components/TopicsSidebar'
import './PostDetail.css'

type Post = {
  id: string
  title: string
  author: string
  handle: string
  time: string
  content: string
}

type Topic = {
  id: string
  name: string
  description?: string
}

export default function PostDetail({ postId, onBack }: { postId?: string; onBack?: () => void }) {
  const { id: routeId } = useParams()
  const id = postId ?? routeId
  const [post, setPost] = useState<Post | null>(null)
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

  useEffect(() => {
    fetch('./data/topics/index.json')
      .then((res) => res.json())
      .then(setTopics)
      .catch(() => setTopics([]))
  }, [])

  useEffect(() => {
    if (!id) return
    fetch(`./data/posts/${id}.json`)
      .then((res) => res.json())
      .then(setPost)
      .catch(() => setPost(null))
  }, [id])

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId)

  if (!post) return <div className="detail">加载中...</div>

  return (
    <div className={onBack ? 'post-detail-embedded' : selectedTopic ? 'home-layout with-topic' : 'home-layout'}>
      {!onBack && <TopicsSidebar onTopicSelect={setSelectedTopicId} />}
      {selectedTopic && (
        <aside className="topic-panel">
          <header className="topic-panel-header">
            <span className="topic-panel-title">话题详情</span>
            <button className="topic-panel-close" onClick={() => setSelectedTopicId(null)}>
              关闭
            </button>
          </header>
          <div className="divider" />
          <div className="topic-panel-cover" />
          <div className="topic-panel-info">
            <div className="topic-panel-name">{selectedTopic.name}</div>
            <div className="topic-panel-desc">{selectedTopic.description || ''}</div>
          </div>
          <div className="divider" />
          <div className="topic-panel-section">讨论</div>
        </aside>
      )}
      <main className="posts-main">
        <header className={onBack ? 'detail-header post-detail-header-embedded' : 'detail-header'}>
          <span className="detail-title">帖子详情</span>
          {onBack ? (
            <button type="button" className="topic-panel-close" onClick={onBack}>关闭</button>
          ) : (
            <Link to="/" className="back">← 返回</Link>
          )}
        </header>
        <div className="divider" />
        <article className="post-full">
          <div className="post-full-header">
            <div className="avatar" />
            <div className="post-full-user">
              <div className="post-full-author">{post.author}</div>
              <div className="post-full-handle">
                {post.handle} · {post.time}
              </div>
            </div>
          </div>
          {post.title && <h1 className="post-full-title">{post.title}</h1>}
          <div className="post-full-content">{post.content}</div>
        </article>
        <div className="divider" />
        <section className="comments-section">
          <h3>评论</h3>
          <Giscus />
        </section>
      </main>
    </div>
  )
}
