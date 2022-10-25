<template>
    <div>
        <!-- Index页面 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"/>
    </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
