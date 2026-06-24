<template>
  <div class="detail-drawer-shell" role="dialog" aria-modal="true" :aria-label="title">
    <section class="detail-drawer">
      <button class="drawer-close overlay-close" type="button" aria-label="상세보기 닫기" @click="$emit('close')">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  close: []
}>()
</script>
