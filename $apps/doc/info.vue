<script setup>
const info = ref('')

onMounted(() => {
	info.value = '信息'
})
</script>

<template>
	<h2>{{ info }}</h2>
</template>

<style lang="less" scoped>
h2 {
	color: #f00;
}
</style>
