<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import SvgIcons from '@/components/SvgIcons.vue';
    import fetchData from '@/hooks/fetchData';

    const linksData = ref<any[]>([]);
    const links = computed(() => linksData.value);

    onMounted(() => fetchData(linksData, 'mountainsLinks'));
</script>

<template>
    <ul>
        <li v-for="(item, index) in links" :key="index">
            <figure>
                <img :src="'/images/resources/hiking/' + item.img + '.jpg'" v-if="item.cover">
                <img src="/images/resources/default.jpg" v-else>
                <figcaption>
                    <a :href="item.href" class="link" target="_blank">
                        <SvgIcons name="linkIcon" />
                    </a>
                </figcaption>
            </figure>
            <hgroup><h2 v-text="item.title"></h2></hgroup>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
</style>
