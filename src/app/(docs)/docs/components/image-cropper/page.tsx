import { ImageCropperDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Kbd } from "@/components/ui/Kbd"

export default function ImageCropperPage() {
  return (
    <ComponentDocs
      name="Image Cropper"
      description="An image with a crop box you move and resize, at a fixed ratio or free, with a round mask for avatars and a helper that returns the file."
      preview={<ImageCropperDemo />}
      usage={`import { ImageCropper, cropImage } from "@/components/ui/ImageCropper"

<ImageCropper src={url} alt="Your photo" aspect={1} shape="round" onAreaChange={setArea} />

const blob = await cropImage(url, area, { maxSize: 512, type: "image/webp" })`}
      extraHeadings={[
        { id: "area", text: "Area", level: 2 },
        { id: "ratio", text: "Ratio and shape", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="area">Area</h2>
            <p>
              <code>onAreaChange</code> gets the crop in the image&apos;s own pixels: <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code>. <code>cropImage</code> turns it into a Blob, scaled to <code>maxSize</code> on its longer side, to upload or preview with <code>URL.createObjectURL</code>.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="ratio">Ratio and shape</h2>
            <p>
              <code>aspect</code> locks width over height, such as <code>1</code> or <code>16 / 9</code>; without it the box is free. <code>shape="round"</code> previews a circle; the file stays square, so round it with CSS where it shows.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The box is focusable: <Kbd>←</Kbd> <Kbd>↑</Kbd> <Kbd>→</Kbd> <Kbd>↓</Kbd> move it, with <Kbd>Shift</Kbd> they resize it, and <Kbd>Alt</Kbd> makes fine steps. It reads its position and size.
            </p>
          </section>
        </>
      }
    />
  )
}
