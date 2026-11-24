import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { VideoDemo } from "@/components/docs/MiscExamples"
import { Kbd } from "@/components/ui/Kbd"

export default function VideoPage() {
  return (
    <ComponentDocs
      name="Video"
      description="A video with Lumen controls over the picture in place of the browser's: a thin buffered scrubber, play, the time, volume, captions, speed, picture-in-picture, and fullscreen."
      preview={<VideoDemo />}
      usage={`import { Video } from "@/components/ui/Video"

<Video src="/video/intro.mp4" poster="/video/intro.jpg" />`}
      extraHeadings={[
        { id: "sources", text: "Sources and captions", level: 2 },
        { id: "shape", text: "Shape", level: 2 },
        { id: "keyboard", text: "Keyboard", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="sources">Sources and captions</h2>
            <p>
              Every <code>video</code> attribute passes through: <code>src</code>,{" "}
              <code>poster</code>, <code>autoPlay</code>, <code>muted</code>,{" "}
              <code>loop</code>, <code>preload</code>, and a <code>ref</code> to the
              element. Children go inside the <code>video</code>, so{" "}
              <code>source</code> and <code>track</code> work as usual. A captions
              or subtitles track adds the captions button.
            </p>
            <CodeBlock
              code={`<Video poster="/video/intro.jpg">
  <source src="/video/intro.webm" type="video/webm" />
  <source src="/video/intro.mp4" type="video/mp4" />
  <track kind="captions" src="/video/intro.en.vtt" srcLang="en" label="English" />
</Video>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="shape">Shape</h2>
            <p>
              The frame takes <code>className</code>. The picture is{" "}
              <code>aspect-video</code>; change its ratio, or crop it with{" "}
              <code>object-cover</code>, through <code>videoClassName</code>.
            </p>
            <CodeBlock
              code={`<Video
  src="/video/reel.mp4"
  className="max-w-xs"
  videoClassName="aspect-[9/16] object-cover"
/>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              With focus in the player: <Kbd>Space</Kbd> or <Kbd>K</Kbd> plays
              and pauses, <Kbd>←</Kbd> and <Kbd>→</Kbd> skip{" "}
              <code>seekStep</code> seconds, <Kbd>M</Kbd> mutes, <Kbd>F</Kbd>{" "}
              toggles fullscreen, and <Kbd>C</Kbd> toggles captions. On the
              scrubber the arrows move the playhead.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The player is a group named “Video player”. Every control is a
              named button, and the scrubber and volume are sliders whose values
              read as times and percentages. The controls stay while paused,
              hovered, or focused, and fade only during playback; captions are
              lifted above them. Pass{" "}
              <code>labels</code> to translate the names.
            </p>
          </section>
        </>
      }
    />
  )
}
