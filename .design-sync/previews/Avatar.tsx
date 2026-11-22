import { Avatar, AvatarFallback, AvatarImage } from "lumen-ui"

export const Initials = () => (
  <div className="flex items-center gap-2">
    <Avatar>
      <AvatarFallback>LU</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
  </div>
)

export const Sizes = () => (
  <div className="flex items-center gap-3">
    <Avatar className="size-6">
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
    <Avatar className="size-10">
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
    <Avatar className="size-12">
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  </div>
)

export const WithImage = () => (
  <div className="flex items-center gap-2">
    <Avatar className="size-10">
      <AvatarImage
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80"
        alt="Sofia Laurent"
      />
      <AvatarFallback>SL</AvatarFallback>
    </Avatar>
    <Avatar className="size-10">
      <AvatarImage
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80"
        alt="Marc Dubois"
      />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  </div>
)
