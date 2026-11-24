import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { AudioPlayerDemo, AudioPlayerPlainDemo } from "@/components/docs/MediaExamples"
import { Preview } from "@/components/docs/Preview"
import { Kbd } from "@/components/ui/Kbd"

export default function AudioPlayerPage() {
  return (
    <ComponentDocs
      name="Audio Player"
      description="An audio file in a Lumen card: art, title, play, a scrubber or a waveform, the time, speed, and mute."
      preview={<AudioPlayerDemo />}
      usage={`import { AudioPlayer } from "@/components/ui/AudioPlayer"

<AudioPlayer src="/audio/episode-12.mp3" title="Episode 12" description="Design systems at scale" />`}
      extraHeadings={[
        { id: "waveform", text: "Waveform", level: 2 },
        { id: "plain", text: "Without a title", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="waveform">Waveform</h2>
            <p>
              Pass <code>peaks</code>, bar heights from 0 to 1, and the scrubber becomes a waveform that fills as it plays. <code>getAudioPeaks(src, count)</code> decodes a file in the browser and returns them; for long files, compute them once on the server and store them.
            </p>
            <CodeBlock
              code={`const [peaks, setPeaks] = React.useState<number[]>()
React.useEffect(() => {
  getAudioPeaks("/audio/episode-12.mp3", 72).then(setPeaks)
}, [])

<AudioPlayer src="/audio/episode-12.mp3" peaks={peaks} />`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="plain">Without a title</h2>
            <p>
              Every part above the controls is optional. With only <code>src</code>, the card is a single row.
            </p>
            <Preview>
              <AudioPlayerPlainDemo />
            </Preview>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The player is a group named “Audio player”. Play, speed, and mute are named buttons; the scrubber is a slider that reads as “1:15 / 3:40”, waveform or not. With focus inside, <Kbd>Space</Kbd> or <Kbd>K</Kbd> plays, <Kbd>←</Kbd> and <Kbd>→</Kbd> skip five seconds, <Kbd>M</Kbd> mutes.
            </p>
          </section>
        </>
      }
    />
  )
}
