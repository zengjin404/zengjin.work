<script setup>
import Precode from '/$base/components/Precode.vue'
import base from '/$base/js/base.js'

//初始化===================================================================
const state = reactive({})

function wheel_todo(e) {
	console.log('e.deltaY', e.deltaY)
	e.preventDefault()
	e.currentTarget.scrollLeft += e.deltaY
}

function wheel_todo2(e) {
	console.log('e.deltaY', e.deltaY)
	let step = 200 //步长
	e.preventDefault()
	e.currentTarget.scrollLeft += Math.sign(e.deltaY) * step
}
</script>

<template>
	<section>
		<h1>常规效果</h1>
		<ul @wheel="wheel_todo">
			<template v-for="item in 20" :key="item">
				<li>{{ item }}</li>
			</template>
		</ul>

		<h1>自定义步长</h1>
		<ul @wheel="wheel_todo2">
			<template v-for="item in 20" :key="item">
				<li>{{ item }}</li>
			</template>
		</ul>
	</section>
	<Precode url="/case/pages/其他js相关/滚轮横向滚动.vue" />
</template>

<style lang="less" scoped>
section {
	height: 100%;
	overflow: auto;
	padding: 16px;

	h1 {
		margin-top: 40vh;
	}

	ul {
		width: 100%;
		overflow: auto;
		background: var(--bg);
		border: 1px solid var(--bd);

		display: flex;
		gap: 16px;
		padding: 16px;
		margin-bottom: 40vh;

		li {
			width: 120px;
			min-width: 120px;
			height: 60px;
			background: var(--bg1);
			border: 1px solid var(--bd);

			display: flex;
			place-content: center;
			align-items: center;
			font-size: 20px;
		}
	}
}
</style>
