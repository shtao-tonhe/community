import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TopicsSidebar from '../components/TopicsSidebar'
import PostDetail from './PostDetail'
import './Home.css'

type Post = {
  id: string
  title: string
  author: string
  handle: string
  time: string
  excerpt: string
}

type Topic = {
  id: string
  name: string
  description?: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const topicId = searchParams.get('topic')

  useEffect(() => {
    fetch('./data/posts/index.json')
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setPosts([]))

    fetch('./data/topics/index.json')
      .then((res) => res.json())
      .then(setTopics)
      .catch(() => setTopics([]))
  }, [])

  const selectedTopic = topics.find((t) => t.id === topicId)

  const closeTopic = () => {
    setSearchParams({})
  }

  return (
    <div className={selectedTopic ? 'home-layout with-topic' : 'home-layout'}>
      <TopicsSidebar />
      {selectedTopic && (
        <aside className="topic-panel">
          <header className="topic-panel-header">
            <span className="topic-panel-title">话题详情</span>
            <button className="topic-panel-close" onClick={closeTopic}>
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
      {selectedPostId ? (
        <PostDetail postId={selectedPostId} onBack={() => setSelectedPostId(null)} />
      ) : <main className="posts-main">
        <div className="section-header">
          <h2>帖子</h2>
        </div>
        <div className="divider" />
        {posts.map((post, index) => (
          <div key={post.id}>
            <button type="button" onClick={() => setSelectedPostId(post.id)} className="post-card post-card-button">
              <div className="post-row">
                <div className="avatar" />
                <div className="post-body">
                  <div className="post-meta">
                    <span className="post-author">{post.author}</span>
                    <span className="post-handle">
                      {post.handle} · {post.time}
                    </span>
                  </div>
                  {post.title && <div className="post-title">{post.title}</div>}
                  <div className="post-excerpt post-excerpt-clamp">{post.excerpt}</div>
                </div>
              </div>
            </button>
            {index < posts.length - 1 && <div className="divider" />}
          </div>
        ))}
      </main>}
    </div>
  )
}
