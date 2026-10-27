import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Topics from './pages/Topics'
import TopicDetail from './pages/TopicDetail'
import './App.css'

function App() {
  return (
    <div className="app">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic/:id" element={<TopicDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
