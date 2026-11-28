<script setup lang="ts">
import { RefreshCw, ThumbsUp } from "@lucide/vue"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import {
  Message, MessageActions, MessageAvatar, MessageBody, MessageContent,
} from "@/components/ui/message"

const answer =
  "Use a Split Button when one action is the obvious one and the others are variants of it, like publishing now or later. If the actions are unrelated, a Menu on its own reads better."
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Message from="user">
      <MessageBody>
        <MessageContent>When should I use a Split Button?</MessageContent>
      </MessageBody>
    </Message>
    <Message from="assistant">
      <MessageAvatar>
        <Avatar><AvatarFallback>L</AvatarFallback></Avatar>
      </MessageAvatar>
      <MessageBody>
        <MessageContent>
          <p>{{ answer }}</p>
        </MessageContent>
        <MessageActions>
          <CopyButton :value="answer" size="icon-xs" />
          <Button variant="ghost" size="icon-xs" aria-label="Regenerate"><RefreshCw /></Button>
          <Button variant="ghost" size="icon-xs" aria-label="Good answer"><ThumbsUp /></Button>
        </MessageActions>
      </MessageBody>
    </Message>
  </div>
</template>
