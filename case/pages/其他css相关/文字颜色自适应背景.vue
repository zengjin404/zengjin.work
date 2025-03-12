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
		<h1>文字颜色自适应背景文字颜色自适应背景文字颜色自适应背景文字颜色自适应背景</h1>
		<div class="bg">
			<h1>文字颜色自适应背景文字颜色自适应背景文字颜色自适应背景文字颜色自适应背景</h1>
		</div>
	</section>
	<Precode url="/case/pages/其他css相关/文字颜色自适应背景.vue" />
</template>

<style lang="less" scoped>
section {
	h1 {
		font-size: 50px;
	}

	.bg {
		height: 230px;
		background: linear-gradient(90deg, red 5%, orange 15%, orange 25%, #000 35%, #000 45%, #fff 55%, #fff 65%, green 75%, green 85%, blue 95%);

		display: flex;
		justify-content: center;
		align-items: center;

		h1 {
			/* 关键点 */
			mix-blend-mode: difference;
		}
	}
}
</style>
