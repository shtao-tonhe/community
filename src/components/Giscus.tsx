export default function Giscus() {
  return (
    <div className="giscus-wrapper">
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center', 
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '8px'
      }}>
        <div>Giscus 评论区</div>
        <div style={{ fontSize: '12px', marginTop: '8px' }}>
          配置后将使用 GitHub Discussions
        </div>
      </div>
    </div>
  )
}
