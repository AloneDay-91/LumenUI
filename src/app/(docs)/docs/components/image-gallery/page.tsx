import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ImageGalleryDemo } from "@/components/docs/MiscExamples"

export default function ImageGalleryPage() {
  return (
    <ComponentDocs
      name="Image Gallery"
      description="A grid of thumbnails that opens a lightbox: the full image, a caption, a counter, and arrows. Left and Right move, Escape closes."
      preview={<ImageGalleryDemo />}
      usage={`import { ImageGallery } from "@/components/ui/ImageGallery"

<ImageGallery
  images={[
    { src: "/photos/lyon.jpg", alt: "The Saône at dusk", caption: "Lyon" },
    { src: "/photos/annecy.jpg", alt: "Boats on the lake", thumbnail: "/photos/annecy-sm.jpg" },
  ]}
/>`}
      extraHeadings={[
        { id: "images", text: "Images", level: 2 },
        { id: "next-image", text: "With next/image", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="images">Images</h2>
            <p>
              <code>alt</code> is required and describes the picture.{" "}
              <code>thumbnail</code> is a lighter file for the grid; it defaults
              to <code>src</code>. <code>columns</code> sets 2, 3, or 4 per row
              from <code>sm</code> up; phones always get 2.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="next-image">With next/image</h2>
            <p>
              The component uses a plain <code>img</code> so it works in any React
              app. In Next.js, pass optimised URLs as <code>thumbnail</code>.
            </p>
            <CodeBlock
              code={`import { getImageProps } from "next/image"

const thumb = getImageProps({ src, alt, width: 400, height: 400 }).props.src

<ImageGallery images={[{ src, alt, thumbnail: thumb }]} />`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              Each thumbnail is a button named “Open” plus the alt text. The
              lightbox is a modal dialog titled with the alt text; the counter is a
              polite live region, so moving between images is announced. Focus
              returns to the thumbnail on close.
            </p>
          </section>
        </>
      }
    />
  )
}
