import React, { useRef, useState, useEffect } from 'react'

interface AudioPlayerProps {
  audio?: string
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const playAudio = () => {
    audioRef.current?.play().catch((err) => {
      console.error('Error playing audio:', err)
    })
  }

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const updateProgress = () => {
      if (!audioEl.duration) return
      setProgress((audioEl.currentTime / audioEl.duration) * 100)
    }

    const resetProgress = () => setProgress(0)

    audioEl.addEventListener('timeupdate', updateProgress)
    audioEl.addEventListener('ended', resetProgress)

    return () => {
      audioEl.pause()
      audioEl.removeEventListener('timeupdate', updateProgress)
      audioEl.removeEventListener('ended', resetProgress)
    }
  }, [audio])

  return (
    <div className="flex items-center mt-4 gap-2">
      <button
        className="text-2xl"
        onClick={playAudio}
        aria-label="Play audio"
        type="button"
      >
        ▶
      </button>
      <div
        className="w-full h-2 bg-gray-300 rounded"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-2 bg-blue-400 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <audio ref={audioRef} src={audio} preload="auto" />
    </div>
  )
}
