<script setup lang="ts">
import { ref } from "vue"
import { Checkpoint } from "@/components/ui/checkpoint"
import { Message, MessageBody, MessageContent } from "@/components/ui/message"

const restored = ref(false)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Message from="user">
      <MessageBody>
        <MessageContent>Rename the banner variants.</MessageContent>
      </MessageBody>
    </Message>
    <Checkpoint label="Before renaming" @restore="restored = true" />
    <Message from="assistant">
      <MessageBody>
        <MessageContent>
          {{ restored ? "Restored. The variants are back to their old names." : "Done: info, success, warning, destructive." }}
        </MessageContent>
      </MessageBody>
    </Message>
  </div>
</template>
