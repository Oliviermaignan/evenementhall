<script setup lang="ts">
import { ref } from 'vue';
import { CanevasIconName } from './enums.ts';
import Shape from './ShapeClass';

const props = defineProps<{ stock: { table: number; chair: number }[] }>();

// Initialisation réactive du stock

</script>

<template>
    <div class="histo">
        {{props.stock}}
    </div>
</template>