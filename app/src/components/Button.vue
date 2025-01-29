<script lang="ts" setup>
const emits = defineEmits(['onTap'])

function onTap() {
    emits('onTap')
}
</script>

<template>
    <button class="button" @click="onTap">
        <slot/>
    </button>
</template>

<style scoped>
.button {
    background: red;
    color: white;
    padding: 10px;
}
</style>