<script setup lang="ts">
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

const rows = [
  { version: "0.5.0", date: "20 Sep 2026", note: "Native components, logo favicon" },
  { version: "0.4.0", date: "19 Sep 2026", note: "API tabs, English default" },
  { version: "0.3.0", date: "18 Sep 2026", note: "Examples bento" },
]
</script>

<template>
  <Table>
    <TableCaption>Recent Lumen releases.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[1%] whitespace-nowrap">Version</TableHead>
        <TableHead class="w-[1%] whitespace-nowrap">Shipped</TableHead>
        <TableHead>Note</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in rows" :key="row.version">
        <TableCell class="whitespace-nowrap font-mono text-xs tabular-nums">{{ row.version }}</TableCell>
        <TableCell class="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground">
          {{ row.date }}
        </TableCell>
        <TableCell>{{ row.note }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
