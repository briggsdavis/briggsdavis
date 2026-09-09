import { useEffect, useRef } from "react"

function Preview({ file }: { file: File }) {
  const image = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    if (image.current) image.current.src = url

    return () => URL.revokeObjectURL(url)
  }, [file])

  return <img ref={image} alt={file.name} className="aspect-video w-36 rounded-lg object-cover" />
}

export default function ProjectImages({ files }: { files: File[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {files.map((file, index) => (
        <Preview key={`${file.name}-${index}`} file={file} />
      ))}
    </div>
  )
}
