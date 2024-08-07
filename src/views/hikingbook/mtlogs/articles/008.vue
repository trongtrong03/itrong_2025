<script setup lang="ts">
// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";
</script>

<template>
    <BaseTextContent>
        <Title :propValue="8" fileType="mountainsLogs" />
<!-- start -->
<div class="text-content">
    <div class="text-block">
        <h3>序、楔子</h3>
        <p></p>
    </div>
    <div class="text-block">
        <h3>一、</h3>
        <p></p>
        <figure>
            <img src="/images/mtlogs/008/01.jpg">
        </figure>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>