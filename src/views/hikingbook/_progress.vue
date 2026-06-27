<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';

    const bars = ref<any[]>([]);

    const loadScript = () => new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/progressbar.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load progressbar.js'));
        document.head.appendChild(script);
    });

    onMounted(async () => {
        await loadScript();
        setTimeout(() => {
            [{ selector: '#circleArea1', value: 0.15 }, { selector: '#circleArea2', value: 0.74 }].forEach(item => {
                const bar = new ProgressBar.Circle(item.selector, {
                    color: '#aaa', strokeWidth: 5, trailWidth: 1, easing: 'easeInOut', duration: 1400,
                    text: { autoStyleContainer: false },
                    step: (state, circle) => {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);
                        circle.setText(Math.round(circle.value() * 100).toString());
                    }
                });
                bar.animate(item.value);
                bars.value.push(bar);
            });
        }, 1100);
    });
    onUnmounted(() => bars.value.forEach(bar => bar.destroy()));
</script>

<template>
    <div class="hikingbook-progress">
        <h2>進度</h2>
        <ul>
            <li><div id="circleArea1" class="progress-circle"></div><h3>百岳</h3></li>
            <li><div id="circleArea2" class="progress-circle"></div><h3>小百岳</h3></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .hikingbook-progress {
        ul {
            text-align: center;
            padding-top: 1rem;
        }
        li {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            list-style-type: none;
            margin: 0 auto;
            padding: 1rem 0;
            h3 {
                display: block;
                width: 100%;
                text-align: center;
                font-size: .875em;
                color: #666;
                margin-top: 0.5rem;
            }
        }
        @media only screen and (max-width: 768px) {
            li {
                margin: 0 1.5rem;
            }
        }
        @media only screen and (max-width: 414px) {
            ul {
                display: flex;
            }
            li {
                flex: 1;
                min-width: 0;
                margin: 0;
            }
        }
    }

    :deep(.progress-circle) {
        position: relative;
        width: 8rem;
        height: 8rem;
        margin: 0 auto;
        &::before {
            content: '--';
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 0;
            font-size: 2rem;
            color: #bbb;
            transform: translate(-50%, -50%);
        }
        svg {
            path {
                &:nth-child(1) {
                    fill: #FAFAFA;
                    fill-opacity: 1;
                    stroke: #FEFEFE !important;
                }
                &:nth-child(2) {
                    stroke-width: 4 !important;
                    stroke: var(--c1) !important;
                    stroke-linecap: round;
                }
            }
        }
        @media only screen and (max-width: 414px) {
            width: 7rem;
            height: 7rem;
        }
    }

    :deep(.progressbar-text) {
        position: relative;
        font-size: 2.5em;
        font-weight: bold;
        color: var(--black) !important;
        background-color: #f7f7f7;
        &::after {
            content: '%';
            position: absolute;
            bottom: -1rem;
            left: 0;
            display: block;
            width: 100%;
            text-align: center;
            font-size: 0.5em;
            font-weight: normal;
            animation-name: fadeIn;
            animation-direction: .5s;
            animation-delay: .5s;
            animation-fill-mode: both;
        }
        @media only screen and (max-width: 414px) {
            font-size: 2em;
        }
    }
</style>
