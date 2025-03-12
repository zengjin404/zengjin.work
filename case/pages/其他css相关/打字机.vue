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
		<p>文字颜色e自适应背景文字颜色自适应背景文a字颜色自适应背景文5字颜色自适应背景</p>
	</section>
	<Precode url="/case/pages/其他css相关/打字机.vue" />
</template>

<style lang="less" scoped>
section {
	@keyframes typing {
		from {
			width: 0;
		}
	}
	@keyframes caret {
		50% {
			border-right-color: #000;
		}
	}
	p {
		font-size: 22px;
		width: 15em;
		white-space: nowrap;
		overflow: hidden;
		animation:
			typing 5s steps(15) /* 执行typing动画，在5s内执行完毕，分15段执行 */,
			caret 0.5s steps(1) 10 /* 执行typing动画，在0.5s内执行完毕，分1段执行，循环执行10次 */;
		border-right: 1px solid transparent;
	}
}
</style>
