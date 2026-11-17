"use client"

import * as React from "react"

import {
  FileUpload,
  FileUploadItem,
  FileUploadList,
  type FileRejection,
} from "@/components/ui/FileUpload"

export function FileUploadDemo() {
  const [files, setFiles] = React.useState<File[]>([])
  const [rejected, setRejected] = React.useState<FileRejection[]>([])

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileUpload
        multiple
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
        onFilesChange={(picked) => {
          setFiles((previous) => [...previous, ...picked])
          setRejected([])
        }}
        onReject={setRejected}
      />
      {rejected.length > 0 ? (
        <p role="alert" className="m-0 text-xs text-destructive">
          {rejected.map(({ file, reason }) =>
            `${file.name}: ${reason === "size" ? "over 5 MB" : "not an image or PDF"}`
          ).join(" · ")}
        </p>
      ) : null}
      {files.length > 0 ? (
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => setFiles((previous) => previous.filter((_, i) => i !== index))}
            />
          ))}
        </FileUploadList>
      ) : null}
    </div>
  )
}
