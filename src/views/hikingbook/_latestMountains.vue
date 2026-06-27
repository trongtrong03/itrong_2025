<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import fetchData from '@/hooks/fetchData';

    const mountains = ref<any[]>([]);

    const latestMountains = computed(() => mountains.value
        .filter(item => item.finish)
        .sort((a, b) => new Date(b.fDate).getTime() - new Date(a.fDate).getTime())
        .slice(0, 6));

    onMounted(() => fetchData(mountains, 'mountainsList'));
</script>

<template>
    <div>
        <h2>近期完成山岳</h2>
        <div class="hikingbook-lastest-list">
            <ul>
                <li v-for="item in latestMountains" :key="item.id">
                    <RouterLink :to="'/mountains/' + item.id">
                        <figure>
                            <img :src="'/images/mountains/thumb/' + item.id + '.jpg'" v-if="item.img">
                            <img src="/images/mountains/thumb/default.jpg" v-else>
                        </figure>
                        <hgroup>
                            <h3 v-text="item.name"></h3>
                            <h5 v-text="item.height + 'm'"></h5>
                            <time v-text="item.fDate"></time>
                        </hgroup>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .hikingbook-lastest-list {
        padding-top: 1rem;
        ul {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-column-gap: 1rem;
        }
        li {
            flex: 1;
            min-width: 0;
            list-style-type: none;
            a {
                display: block;
                figure {
                    position: relative;
                    border-radius: 0.5rem;
                    margin-bottom: 0.25rem;
                    overflow: hidden;
                    &::after {
                        content: '...';
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        align-content: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        color: var(--c1);
                        background-color: rgba(#000, .7);
                        opacity: 0;
                        transition: opacity .3s;
                    }
                    img {
                        display: block;
                        max-width: 100%;
                        transform: translate3d(0, 0, 0) scale(1) rotate(0.1deg);
                        transition: all .3s;
                    }
                }
                hgroup {
                    line-height: 1.4;
                    text-align: center;
                    h3 {
                        display: block;
                        line-height: 2;
                        font-size: .813em;
                        color: var(--black);
                        @include text-truncate;
                    }
                    h4 {
                        display: block;
                        font-size: 0.75em;
                        color: #999;
                        @include text-truncate;
                    }
                    h5 {
                        display: block;
                        font-size: 0.675em;
                        color: #999;
                        @include text-truncate;
                        &::before {
                            content: '▲';
                            color: var(--red);
                        }
                    }
                    time {
                        display: block;
                        font-size: 0.675em;
                        color: #BBB;
                        @include text-truncate;
                    }
                }
                &:hover {
                    figure {
                        &::after {
                            opacity: 1;
                        }
                        img {
                            transform: translate3d(0, 0, 0) scale(1.1) rotate(0.1deg);
                        }
                    }
                }
            }
            
            &:last-child {
                margin-right: 0;
            }
        }
        @media only screen and (max-width: 960px) {
            ul {
                grid-template-columns: repeat(5, 1fr);
            }
            li {
                &:last-child {
                    display: none;
                }
            }
        }
        @media only screen and (max-width: 480px) {
            ul {
                grid-template-columns: repeat(4, 1fr);
            }
            li {
                &:nth-child(5) {
                    display: none;
                }
            }
        }
        @media only screen and (max-width: 414px) {
            ul {
                grid-template-columns: repeat(3, 1fr);
            }
            li {
                &:nth-child(4) {
                    display: none;
                }
            }
        }
    }
</style>