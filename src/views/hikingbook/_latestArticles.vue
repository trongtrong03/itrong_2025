<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import fetchData from '@/hooks/fetchData';

    const logs = ref<any[]>([]);
    const latestArticles = computed(() => logs.value
        .filter(item => item.status === true)
        .slice()
        .reverse()
        .slice(0, 3));

    onMounted(() => fetchData(logs, 'mountainsLogs'));
</script>

<template>
    <div>
        <h2>近期發表文章</h2>
        <div class="hikingbook-lastest-article">
            <ul>
                <li v-for="item in latestArticles" :key="item.id">
                    <RouterLink :to="'/mtlogs/' + item.id">
                        <figure><span :style="{ 'background-image': 'url(/images/mtlogs/' + item.id + '/cover.jpg)' }"></span></figure>
                        <hgroup><time v-text="item.time"></time><p v-text="item.title"></p></hgroup>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .hikingbook-lastest-article {
        padding-top: 1rem;
        li {
            list-style-type: none;
            margin-bottom: 0.5rem;
            a {
                position: relative;
                display: flex;
                align-items: center;
                align-content: center;
                figure {
                    flex: 0 0 3rem;
                    min-width: 0;
                    height: 3rem;
                    border-radius: .5rem;
                    overflow: hidden;
                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                        background-size: cover;
                        background-repeat: no-repeat;
                    }
                }
                hgroup {
                    flex: 1;
                    min-width: 0;
                    margin-left: 1rem;
                    time {
                        font-size: 0.75em;
                        color: #999;
                        @include text-truncate;
                    }
                    p {
                        line-height: 2;
                        font-size: 1em;
                        color: var(--black);
                        @include text-truncate;
                        transition: color .3s;
                    }
                }
                &:hover {
                    hgroup {
                        p {
                            color: var(--c1);
                        }
                    }
                }
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        @media only screen and (max-width: 480px) {
            li {
                a {
                    hgroup {
                        p {
                            font-size: 0.875em;
                        }
                    }
                }
            }
        }
    }
</style>