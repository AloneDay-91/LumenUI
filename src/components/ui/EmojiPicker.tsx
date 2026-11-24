"use client"

import * as React from "react"
import {
  CarIcon,
  FlagIcon,
  HeartIcon,
  LampIcon,
  LeafIcon,
  SearchIcon,
  SmileIcon,
  TrophyIcon,
  UtensilsIcon,
  HandIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type Emoji = { emoji: string; name: string; keywords: string; tone: boolean }
type EmojiCategory = { id: string; label: string; icon: React.ReactNode; emojis: Emoji[] }

/* ---------------------------------------------------------------------------
   Data: "emoji name, keywords" per line. A leading ~ marks emoji that take a
   skin tone. Common emoji only, to keep the file light; pass `categories`
   for a full set.
   --------------------------------------------------------------------------- */

const raw: [string, string, React.ReactNode, string][] = [
  [
    "smileys",
    "Smileys",
    <SmileIcon key="i" />,
    `😀 grinning face, happy smile
😃 grinning face with big eyes, happy joy
😄 grinning face with smiling eyes, laugh
😁 beaming face, grin
😆 grinning squinting face, laugh
😅 grinning face with sweat, relief
🤣 rolling on the floor laughing, lol
😂 face with tears of joy, lol cry laugh
🙂 slightly smiling face, smile
🙃 upside-down face, silly sarcasm
😉 winking face, wink
😊 smiling face with smiling eyes, blush
😇 smiling face with halo, angel innocent
🥰 smiling face with hearts, love
😍 smiling face with heart-eyes, love crush
🤩 star-struck, wow excited
😘 face blowing a kiss, kiss love
😋 face savoring food, yum
😛 face with tongue, tongue playful
😜 winking face with tongue, crazy joke
🤪 zany face, crazy goofy
🤗 smiling face with open hands, hug
🤔 thinking face, hmm think
🤨 face with raised eyebrow, skeptic doubt
😐 neutral face, meh
😑 expressionless face, blank
😶 face without mouth, silent
🙄 face with rolling eyes, eyeroll
😏 smirking face, smirk
😬 grimacing face, awkward
😌 relieved face, calm
😔 pensive face, sad
😪 sleepy face, tired
😴 sleeping face, zzz sleep
😷 face with medical mask, sick mask
🤒 face with thermometer, ill fever
🤯 exploding head, mind blown
🥳 partying face, party celebrate
😎 smiling face with sunglasses, cool
🤓 nerd face, geek
🧐 face with monocle, inspect
😕 confused face, confused
😟 worried face, worried
😮 face with open mouth, surprised wow
😲 astonished face, shocked
😳 flushed face, embarrassed
🥺 pleading face, puppy eyes please
😢 crying face, sad tear
😭 loudly crying face, sob
😱 face screaming in fear, scream horror
😤 face with steam from nose, frustrated
😡 enraged face, angry mad
🤬 face with symbols on mouth, swear
😈 smiling face with horns, devil
💀 skull, dead
💩 pile of poo, poop
🤡 clown face, clown
👻 ghost, boo halloween
👽 alien, ufo
🤖 robot, bot ai`,
  ],
  [
    "people",
    "People",
    <HandIcon key="i" />,
    `~👋 waving hand, hello hi bye
~🤚 raised back of hand, stop
~✋ raised hand, high five stop
~👌 ok hand, okay perfect
~🤌 pinched fingers, italian
~✌ victory hand, peace
~🤞 crossed fingers, luck hope
~🤟 love-you gesture, love
~🤘 sign of the horns, rock
~🤙 call me hand, call shaka
~👈 backhand index pointing left, left
~👉 backhand index pointing right, right
~👆 backhand index pointing up, up
~👇 backhand index pointing down, down
~☝ index pointing up, one point
~👍 thumbs up, yes like approve +1
~👎 thumbs down, no dislike -1
~✊ raised fist, fist power
~👊 oncoming fist, punch bump
~👏 clapping hands, applause clap bravo
~🙌 raising hands, hooray celebrate
~👐 open hands, open
~🤲 palms up together, pray ask
~🙏 folded hands, please thanks pray
~✍ writing hand, write
~💪 flexed biceps, strong muscle
🧠 brain, smart think
👀 eyes, look see watch
~👶 baby, child
~🧒 child, kid
~👩 woman, female
~👨 man, male
~🧑 person, adult
~🧓 older person, elder
~👮 police officer, cop
~👷 construction worker, builder
~🧑‍💻 technologist, developer coder
~🤷 person shrugging, shrug dunno
~🤦 person facepalming, facepalm
~🙋 person raising hand, question
~🏃 person running, run
~💃 woman dancing, dance`,
  ],
  [
    "nature",
    "Animals and nature",
    <LeafIcon key="i" />,
    `🐶 dog face, dog puppy pet
🐱 cat face, cat kitten pet
🐭 mouse face, mouse
🐹 hamster, hamster pet
🐰 rabbit face, bunny
🦊 fox, fox
🐻 bear, bear
🐼 panda, panda
🐨 koala, koala
🐯 tiger face, tiger
🦁 lion, lion
🐮 cow face, cow
🐷 pig face, pig
🐸 frog, frog
🐵 monkey face, monkey
🐔 chicken, chicken
🐧 penguin, penguin
🐦 bird, bird
🦆 duck, duck
🦉 owl, owl
🐝 honeybee, bee
🦋 butterfly, butterfly
🐢 turtle, turtle slow
🐍 snake, snake
🐙 octopus, octopus
🐬 dolphin, dolphin
🐳 spouting whale, whale
🦄 unicorn, unicorn magic
🌸 cherry blossom, flower spring
🌹 rose, flower
🌻 sunflower, flower
🌳 deciduous tree, tree
🌲 evergreen tree, tree pine
🌵 cactus, cactus desert
🍀 four leaf clover, luck
🍁 maple leaf, autumn fall
🌍 globe showing europe-africa, earth world
🌙 crescent moon, moon night
⭐ star, star
🌟 glowing star, sparkle
☀ sun, sunny weather
⛅ sun behind cloud, cloudy
🌧 cloud with rain, rain
⛄ snowman without snow, snow winter
🔥 fire, hot lit flame
💧 droplet, water drop
🌈 rainbow, rainbow
⚡ high voltage, lightning zap`,
  ],
  [
    "food",
    "Food and drink",
    <UtensilsIcon key="i" />,
    `🍏 green apple, apple fruit
🍎 red apple, apple fruit
🍐 pear, fruit
🍊 tangerine, orange fruit
🍋 lemon, fruit
🍌 banana, fruit
🍉 watermelon, fruit summer
🍇 grapes, fruit
🍓 strawberry, fruit
🍒 cherries, fruit
🍑 peach, fruit
🥭 mango, fruit
🍍 pineapple, fruit
🥥 coconut, fruit
🥑 avocado, avocado
🍅 tomato, vegetable
🥕 carrot, vegetable
🌽 ear of corn, corn
🌶 hot pepper, spicy chili
🥦 broccoli, vegetable
🍄 mushroom, mushroom
🥐 croissant, bread french breakfast
🥖 baguette bread, bread french
🧀 cheese wedge, cheese
🥚 egg, egg breakfast
🍳 cooking, egg pan
🥞 pancakes, breakfast
🥓 bacon, breakfast
🍔 hamburger, burger
🍟 french fries, fries
🍕 pizza, pizza
🌭 hot dog, hotdog
🌮 taco, mexican
🍣 sushi, japanese
🍜 steaming bowl, ramen noodles
🍝 spaghetti, pasta
🍰 shortcake, cake dessert
🎂 birthday cake, birthday party
🍩 doughnut, donut
🍪 cookie, cookie
🍫 chocolate bar, chocolate
🍿 popcorn, movie
☕ hot beverage, coffee tea
🍵 teacup without handle, tea
🧃 beverage box, juice
🍺 beer mug, beer
🍷 wine glass, wine
🥂 clinking glasses, cheers toast`,
  ],
  [
    "activities",
    "Activities",
    <TrophyIcon key="i" />,
    `⚽ soccer ball, football
🏀 basketball, basketball
🏈 american football, football
⚾ baseball, baseball
🎾 tennis, tennis
🏐 volleyball, volleyball
🏓 ping pong, table tennis
🏸 badminton, badminton
🥊 boxing glove, boxing
🎯 bullseye, target goal
⛳ flag in hole, golf
🎿 skis, ski
🏆 trophy, win award
🥇 1st place medal, gold winner
🥈 2nd place medal, silver
🥉 3rd place medal, bronze
🎮 video game, game controller
🎲 game die, dice
🧩 puzzle piece, puzzle
♟ chess pawn, chess
🎨 artist palette, art paint design
🎬 clapper board, movie film
🎤 microphone, sing karaoke
🎧 headphone, music listen
🎸 guitar, music
🎹 musical keyboard, piano music
🥁 drum, drum music
🎉 party popper, celebrate tada
🎊 confetti ball, party
🎈 balloon, party birthday
🎁 wrapped gift, present gift
🎄 christmas tree, christmas
🎃 jack-o-lantern, halloween`,
  ],
  [
    "travel",
    "Travel and places",
    <CarIcon key="i" />,
    `🚗 automobile, car
🚕 taxi, taxi
🚌 bus, bus
🚲 bicycle, bike
🛴 kick scooter, scooter
🏍 motorcycle, motorbike
🚆 train, train
🚇 metro, subway
✈ airplane, plane flight travel
🚀 rocket, launch ship space
🛸 flying saucer, ufo
🚢 ship, boat
⛵ sailboat, boat
🗺 world map, map
🧭 compass, direction
🏔 snow-capped mountain, mountain
🏖 beach with umbrella, beach vacation
🏝 desert island, island
🏕 camping, camp tent
🏠 house, home
🏢 office building, office work
🏥 hospital, hospital
🏫 school, school
🗼 tokyo tower, tower
🗽 statue of liberty, new york
🌆 cityscape at dusk, city
🌉 bridge at night, bridge
🎡 ferris wheel, fair`,
  ],
  [
    "objects",
    "Objects",
    <LampIcon key="i" />,
    `⌚ watch, time
📱 mobile phone, phone smartphone
💻 laptop, computer
⌨ keyboard, type
🖥 desktop computer, computer screen
🖨 printer, print
🖱 computer mouse, mouse
💾 floppy disk, save
💿 optical disk, cd
📷 camera, photo
🎥 movie camera, video film
📺 television, tv
📻 radio, radio
⏰ alarm clock, alarm time
⏳ hourglass not done, wait time
💡 light bulb, idea
🔦 flashlight, torch
🔋 battery, battery power
🔌 electric plug, plug power
💰 money bag, money
💳 credit card, card payment
💎 gem stone, diamond
🔧 wrench, tool fix
🔨 hammer, tool build
🛠 hammer and wrench, tools settings
⚙ gear, settings cog
🔒 locked, lock secure
🔑 key, key password
🧲 magnet, magnet
🧪 test tube, test science
🔬 microscope, science
📦 package, box ship
📫 closed mailbox with raised flag, mail
✉ envelope, email letter
📝 memo, note write
📎 paperclip, attach
📌 pushpin, pin
📅 calendar, date
📈 chart increasing, growth up stats
📉 chart decreasing, down stats
📊 bar chart, stats chart
🔍 magnifying glass tilted left, search find
📚 books, read library
🔖 bookmark, bookmark
🏷 label, tag
🗑 wastebasket, trash delete bin`,
  ],
  [
    "symbols",
    "Symbols",
    <HeartIcon key="i" />,
    `❤ red heart, love heart
🧡 orange heart, love
💛 yellow heart, love
💚 green heart, love
💙 blue heart, love
💜 purple heart, love
🖤 black heart, love
🤍 white heart, love
💔 broken heart, heartbreak
💯 hundred points, 100 perfect
✅ check mark button, done yes ok
✔ check mark, done
❌ cross mark, no wrong
❗ red exclamation mark, important
❓ red question mark, question
⚠ warning, warning caution
⛔ no entry, stop forbidden
🚫 prohibited, forbidden no
♻ recycling symbol, recycle
🔴 red circle, red dot
🟠 orange circle, orange dot
🟡 yellow circle, yellow dot
🟢 green circle, green dot online
🔵 blue circle, blue dot
🟣 purple circle, purple dot
⚫ black circle, black dot
⚪ white circle, white dot
➕ plus, add
➖ minus, subtract
➡ right arrow, arrow next
⬅ left arrow, arrow back
⬆ up arrow, arrow
⬇ down arrow, arrow
🔁 repeat button, repeat loop
🔔 bell, notification alert
💬 speech balloon, comment chat
💭 thought balloon, think
✨ sparkles, sparkle magic new
🆕 new button, new
🆗 ok button, ok
🔗 link, link url`,
  ],
  [
    "flags",
    "Flags",
    <FlagIcon key="i" />,
    `🏁 chequered flag, finish race
🚩 triangular flag, flag red
🏳 white flag, surrender
🏴 black flag, flag
🏳️‍🌈 rainbow flag, pride
🇫🇷 flag france, france french fr
🇧🇪 flag belgium, belgium be
🇨🇭 flag switzerland, switzerland ch
🇨🇦 flag canada, canada ca
🇺🇸 flag united states, usa us america
🇬🇧 flag united kingdom, uk britain gb
🇩🇪 flag germany, germany de
🇪🇸 flag spain, spain es
🇮🇹 flag italy, italy it
🇵🇹 flag portugal, portugal pt
🇳🇱 flag netherlands, netherlands nl
🇯🇵 flag japan, japan jp
🇧🇷 flag brazil, brazil br
🇲🇦 flag morocco, morocco ma
🇪🇺 flag european union, europe eu`,
  ],
]

const defaultCategories: EmojiCategory[] = raw.map(([id, label, icon, lines]) => ({
  id,
  label,
  icon,
  emojis: lines.split("\n").map((line) => {
    const tone = line.startsWith("~")
    const text = tone ? line.slice(1) : line
    const space = text.indexOf(" ")
    const [name, keywords = ""] = text.slice(space + 1).split(", ")
    return { emoji: text.slice(0, space), name, keywords, tone }
  }),
}))

const tones = ["", "\u{1F3FB}", "\u{1F3FC}", "\u{1F3FD}", "\u{1F3FE}", "\u{1F3FF}"]
const toneNames = ["Default", "Light", "Medium-light", "Medium", "Medium-dark", "Dark"]
const toneSwatches = ["#fbbf24", "#f7d7c4", "#e4b590", "#c68b59", "#8d5524", "#4a2f1d"]

/** Adds the skin tone after the first code point, before any variation selector. */
function withTone(emoji: Emoji, tone: number) {
  if (!emoji.tone || !tone) return emoji.emoji
  const [first, ...rest] = [...emoji.emoji]
  return `${first}${tones[tone]}${rest.join("").replace(/^️/, "")}`
}

const COLUMNS = 8

/**
 * A searchable grid of emoji in categories, with a skin tone choice. The
 * arrows move through the grid, Enter picks, and typing anywhere searches.
 * Put it in a Popover next to a reaction or a message field.
 */
function EmojiPicker({
  className,
  onSelect,
  categories = defaultCategories,
  autoFocus = false,
  labels = {},
}: {
  className?: string
  onSelect: (emoji: string, details: { name: string }) => void
  /** Your own set, in the same shape as the default. */
  categories?: EmojiCategory[]
  /** Focus the search field when it mounts, e.g. inside a popover. */
  autoFocus?: boolean
  labels?: { search?: string; empty?: string; tone?: string }
}) {
  const [query, setQuery] = React.useState("")
  const [tone, setTone] = React.useState(0)
  const [hovered, setHovered] = React.useState<Emoji | null>(null)
  const [focusIndex, setFocusIndex] = React.useState(0)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const sectionRefs = React.useRef(new Map<string, HTMLElement>())

  const q = query.trim().toLowerCase()
  const visible = React.useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          emojis: q
            ? category.emojis.filter((e) => e.name.includes(q) || e.keywords.includes(q) || e.emoji === q)
            : category.emojis,
        }))
        .filter((category) => category.emojis.length),
    [categories, q]
  )
  const flat = visible.flatMap((category) => category.emojis)

  const focusCell = (index: number) => {
    const next = Math.max(0, Math.min(flat.length - 1, index))
    setFocusIndex(next)
    requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)?.focus()
    )
  }

  let index = -1
  const current = hovered ?? flat[focusIndex]

  return (
    <div
      data-slot="emoji-picker"
      className={cn("flex w-72 flex-col overflow-hidden", className)}
    >
      <div className="flex items-center gap-1.5 p-2">
        <label className="relative flex-1">
          <SearchIcon aria-hidden className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(event) => {
              setQuery(event.target.value)
              setFocusIndex(0)
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault()
                focusCell(0)
              } else if (event.key === "Enter" && flat[0]) {
                event.preventDefault()
                onSelect(withTone(flat[0], tone), { name: flat[0].name })
              }
            }}
            placeholder={labels.search ?? "Search emoji"}
            aria-label={labels.search ?? "Search emoji"}
            className="h-8 w-full rounded-2xl border border-border bg-transparent ps-8 pe-3 text-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
          />
        </label>
        <ToneMenu tone={tone} onChange={setTone} label={labels.tone ?? "Skin tone"} />
      </div>

      {!q ? (
        <nav aria-label="Categories" className="flex items-center justify-between border-b border-border px-2 pb-1">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-label={category.label}
              title={category.label}
              onClick={() => sectionRefs.current.get(category.id)?.scrollIntoView({ block: "start", behavior: "smooth" })}
              className="flex size-7 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 [&_svg]:size-4"
            >
              {category.icon}
            </button>
          ))}
        </nav>
      ) : null}

      <div
        ref={gridRef}
        role="grid"
        aria-label="Emoji"
        aria-rowcount={Math.ceil(flat.length / COLUMNS)}
        className="h-64 scroll-fade overflow-y-auto px-2 pb-2"
        onKeyDown={(event) => {
          const target = event.target as HTMLElement
          const at = Number(target.dataset.index)
          if (Number.isNaN(at)) return
          const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLUMNS, ArrowUp: -COLUMNS }
          if (event.key in moves) {
            event.preventDefault()
            if (event.key === "ArrowUp" && at < COLUMNS) {
              gridRef.current?.parentElement?.querySelector<HTMLInputElement>("input[type=search]")?.focus()
              return
            }
            focusCell(at + moves[event.key])
          } else if (event.key === "Home") {
            event.preventDefault()
            focusCell(0)
          } else if (event.key === "End") {
            event.preventDefault()
            focusCell(flat.length - 1)
          }
        }}
      >
        {visible.length ? (
          visible.map((category) => (
            <section
              key={category.id}
              ref={(node) => {
                if (node) sectionRefs.current.set(category.id, node)
                else sectionRefs.current.delete(category.id)
              }}
              aria-label={category.label}
              className="scroll-mt-1"
            >
              <h3 className="sticky top-0 z-10 m-0 bg-popover pt-2 pb-1 text-[11px] font-medium text-muted-foreground">
                {category.label}
              </h3>
              <div role="row" className="grid grid-cols-8">
                {category.emojis.map((emoji) => {
                  index++
                  const i = index
                  const glyph = withTone(emoji, tone)
                  return (
                    <button
                      key={`${category.id}-${emoji.emoji}-${emoji.name}`}
                      type="button"
                      role="gridcell"
                      data-index={i}
                      tabIndex={i === focusIndex ? 0 : -1}
                      aria-label={emoji.name}
                      onClick={() => onSelect(glyph, { name: emoji.name })}
                      onFocus={() => setFocusIndex(i)}
                      onMouseEnter={() => setHovered(emoji)}
                      onMouseLeave={() => setHovered(null)}
                      className="flex aspect-square items-center justify-center rounded-lg text-xl leading-none outline-none transition-transform hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 active:scale-90"
                    >
                      {glyph}
                    </button>
                  )
                })}
              </div>
            </section>
          ))
        ) : (
          <p className="m-0 py-10 text-center text-xs text-muted-foreground">{labels.empty ?? "No emoji found"}</p>
        )}
      </div>

      <div aria-hidden className="flex h-11 items-center gap-2 border-t border-border px-3">
        {current ? (
          <>
            <span className="text-2xl leading-none">{withTone(current, tone)}</span>
            <span className="min-w-0 flex-1 truncate text-xs first-letter:uppercase">{current.name}</span>
          </>
        ) : null}
      </div>
    </div>
  )
}

function ToneMenu({ tone, onChange, label }: { tone: number; onChange: (tone: number) => void; label: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`${label}: ${toneNames[tone]}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex size-8 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <span className="size-4 rounded-full ring-1 ring-foreground/10" style={{ backgroundColor: toneSwatches[tone] }} />
      </button>
      {open ? (
        <div
          role="radiogroup"
          aria-label={label}
          className="absolute end-0 top-9 z-20 flex gap-1 rounded-full bg-popover p-1 shadow-lg ring-1 ring-foreground/5"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false)
          }}
        >
          {toneSwatches.map((swatch, i) => (
            <button
              key={swatch}
              type="button"
              role="radio"
              aria-checked={tone === i}
              aria-label={toneNames[i]}
              onClick={() => {
                onChange(i)
                setOpen(false)
              }}
              className="flex size-6 items-center justify-center rounded-full outline-none aria-checked:ring-2 aria-checked:ring-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              <span className="size-4 rounded-full ring-1 ring-foreground/10" style={{ backgroundColor: swatch }} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { EmojiPicker, defaultCategories as emojiCategories }
export type { Emoji, EmojiCategory }
