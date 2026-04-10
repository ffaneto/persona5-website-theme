import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VideoPage({ src }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div id="menu-screen">
      {/* <video src={src} autoPlay loop muted playsInline /> */}
    </div>
  )
}
