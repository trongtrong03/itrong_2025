<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import SvgIcons from '@/components/SvgIcons.vue';

    interface MountainEvent { id: string; fDate: string; name: string; }

    const mountains = ref<MountainEvent[]>([]);
    const isDataLoaded = ref(false);
    const minDate = ref(new Date());
    const maxDate = ref(new Date());
    const currentYear = ref(minDate.value.getFullYear());
    const currentMonth = ref(minDate.value.getMonth());
    const showLatest = ref(true);

    const daysInMonth = computed(() => {
        if (!isDataLoaded.value) return [];
        const date = new Date(currentYear.value, currentMonth.value, 1);
        const days: { date: Date; events: MountainEvent[] }[] = [];
        while (date.getMonth() === currentMonth.value) {
            const events = mountains.value.filter((event) => {
                if (!event.fDate) return false;
                const eventDate = new Date(event.fDate);
                return eventDate.getFullYear() === currentYear.value && eventDate.getMonth() === currentMonth.value && eventDate.getDate() === date.getDate();
            });
            days.push({ date: new Date(date), events });
            date.setDate(date.getDate() + 1);
        }
        return days;
    });

    const isPrevDisabled = computed(() => currentYear.value === minDate.value.getFullYear() && currentMonth.value === minDate.value.getMonth());
    const isNextDisabled = computed(() => currentYear.value === maxDate.value.getFullYear() && currentMonth.value === maxDate.value.getMonth());

    function prevMonth() {
        if (currentMonth.value === 0) { currentYear.value--; currentMonth.value = 11; } else currentMonth.value--;
        if (currentYear.value < minDate.value.getFullYear() || (currentYear.value === minDate.value.getFullYear() && currentMonth.value < minDate.value.getMonth())) {
            currentYear.value = minDate.value.getFullYear(); currentMonth.value = minDate.value.getMonth();
        }
    }
    function nextMonth() {
        if (currentMonth.value === 11) { currentYear.value++; currentMonth.value = 0; } else currentMonth.value++;
        if (currentYear.value > maxDate.value.getFullYear() || (currentYear.value === maxDate.value.getFullYear() && currentMonth.value > maxDate.value.getMonth())) {
            currentYear.value = maxDate.value.getFullYear(); currentMonth.value = maxDate.value.getMonth();
        }
    }
    function toggleDateOrder() {
        showLatest.value = !showLatest.value;
        const date = showLatest.value ? maxDate.value : minDate.value;
        currentYear.value = date.getFullYear(); currentMonth.value = date.getMonth();
    }

    onMounted(async () => {
        try {
            const response = await fetch('/js/data/mountainsList.json');
            mountains.value = await response.json();
            const dates = mountains.value.filter(event => event.fDate).map(event => new Date(event.fDate));
            if (dates.length) {
                const timestamps = dates.map(date => date.getTime());
                minDate.value = new Date(Math.min(...timestamps)); maxDate.value = new Date(Math.max(...timestamps));
                currentYear.value = maxDate.value.getFullYear(); currentMonth.value = maxDate.value.getMonth();
            }
            isDataLoaded.value = true;
        } catch (error) { console.error('Error fetching data:', error); }
    });
</script>

<template>
    <div class="calendar-wrap">
        <div class="calendar-head">
            <div class="calendar-info"><span>{{ currentYear }} 年 {{ currentMonth + 1 }} 月</span></div>
            <div class="calendar-tool">
                <button class="btn-sort" @click="toggleDateOrder"><SvgIcons :name="showLatest ? 'sortDownIcon' : 'sortUpIcon'" /></button>
                <button class="btn-prev" @click="prevMonth" :disabled="isPrevDisabled"><SvgIcons name="leftIcon" /></button>
                <button class="btn-next" @click="nextMonth" :disabled="isNextDisabled"><SvgIcons name="rightIcon" /></button>
            </div>
        </div>
        <div v-if="isDataLoaded" class="calendar-list">
            <div v-for="day in daysInMonth" :key="day.date.toISOString()" class="calendar-item">
                <strong>{{ day.date.getDate() }}</strong>
                <ul v-if="day.events.length" class="calendar-box">
                    <li v-for="item in day.events" :key="item.id">
                        <RouterLink :to="'/mountains/' + item.id">
                            <figure>
                                <img :src="'/images/mountains/thumb/' + item.id + '.jpg'" v-if="item.img">
                                <img src="/images/mountains/thumb/default.jpg" v-else>
                                <figcaption v-text="item.name"></figcaption>
                            </figure>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>Loading data...</div>
    </div>
</template>

<style lang="scss" scoped>
    .calendar-wrap {
        position: relative;    
    }

    .calendar-head {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--c1);
        border-radius: .5rem .5rem 0 0;
        margin-bottom: 1rem;
        padding: .5rem 1rem;
    }

    .calendar-info {
        color: #FFF;
        span {
            font-weight: bold;
        }
    }

    .calendar-tool {
        flex: 0 0 auto;
        min-width: 0;
        button {
            display: inline-block;
            vertical-align: middle;
            width: 2.5rem;
            height: 2.5rem;
            background-color: #FFF;
            border-radius: 0.5rem;
            margin-left: 0.25rem;
            svg {
                width: .8rem;
                fill: var(--black);
            }
            &:disabled {
                opacity: 0.2;
            }
        }
    }

    .calendar-list {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
    }

    .calendar-item {
        min-height: 4rem;
        text-align: center;
        border: 1px solid #DDD;
        border-radius: 0.5rem;
        padding: 10px;
        strong {
            display: block;
            font-weight: bold;
        }
    }

    .calendar-box {
        margin-top: .5rem;
        
        li {
            margin-bottom: 0.5rem;
            &:last-child {
                margin-bottom: 0;
            }
            figure {
                display: flex;
                align-items: flex-start;
                gap: .5rem;
                img {
                    width: 1.25rem;
                    border-radius: 99px;
                }
            }
            figcaption {
                flex: 0 1 auto;
                line-height: 1.25rem;
                font-size: 0.75rem;
                text-align: left;
                color: var(--black);
                transition: all .3s;
            }
            &:hover {
                figcaption {
                    color: var(--c1);
                }
            }
        }
    }
</style>
