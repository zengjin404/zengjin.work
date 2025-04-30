<script setup>
import info from './info.vue'
import { use_user } from '/src/pinia/user.js'

const user = use_user()

console.log('user', user)

const output = ref(0)
let interval = null
onMounted(() => {
	interval = setInterval(() => {
		output.value++
	}, 1000)
})

onBeforeUnmount(() => {
	clearInterval(interval)
})
</script>

<template>
	<section>
		<h1>doc222</h1>
		<info />
		<hr />
		<dl>
			<dt>标题</dt>
			<dd>内容1</dd>
			<dd>内容2</dd>
		</dl>
		<hr />
		<output>走秒：{{ output }}</output>
	</section>
</template>

<style lang="less" scoped>
section {
	padding: 16px;
	background: var(--bg);

	dl {
		dt {
			font-weight: 700;
		}
	}
}
</style>
