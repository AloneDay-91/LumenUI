<script setup lang="ts">
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
</script>

<template>
  <Pagination>
    <PaginationContent>
      <PaginationItem><PaginationPrevious /></PaginationItem>
      <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
      <PaginationItem><PaginationLink is-active>2</PaginationLink></PaginationItem>
      <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
      <PaginationItem><PaginationEllipsis /></PaginationItem>
      <PaginationItem><PaginationLink>12</PaginationLink></PaginationItem>
      <PaginationItem><PaginationNext /></PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
