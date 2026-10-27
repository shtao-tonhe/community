import { useEffect, useRef } from 'react'

type GiscusProps = {
  term: string
}

export default function Giscus({ term }: GiscusProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.dataset.repo = 'shtao-tonhe/community'
    script.dataset.repoId = 'R_kgDOVY-gzA'
    script.dataset.category = 'Announcements'
    script.dataset.categoryId = 'DIC_kwDOVY-gzM4DJuxU'
    script.dataset.mapping = 'specific'
    script.dataset.term = term
    script.dataset.strict = '0'
    script.dataset.reactionsEnabled = '1'
    script.dataset.emitMetadata = '0'
    script.dataset.inputPosition = 'bottom'
    script.dataset.theme = 'preferred_color_scheme'
    script.dataset.lang = 'zh-CN'

    container.replaceChildren(script)

    return () => container.replaceChildren()
  }, [term])

  return <div className="giscus-wrapper" ref={containerRef} />
}
