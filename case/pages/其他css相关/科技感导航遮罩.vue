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
		<header>顶部导航栏</header>
		<main>
			<h1>科技感遮罩效果</h1>
			<p>
				滚动页面, 注意观察顶部导航栏效果. 滚动页面, 注意观察顶部横栏效果. 滚动页面, 注意观察顶部横栏效果. 滚动页面, 注意观察顶部横栏效果. 滚动页面,
				注意观察顶部横栏效果. 滚动页面, 注意观察顶部横栏效果.
			</p>
			<img src="./img/baidu.png" />
		</main>
	</section>
	<Precode url="/case/pages/其他css相关/科技感导航遮罩.vue" />
</template>

<style lang="less" scoped>
section {
	height: 100%;
	overflow: auto;

	header {
		height: 80px;
		position: sticky;
		top: 0;
		border-bottom: 1px solid var(--bd1);

		display: flex;
		justify-content: center;
		align-items: center;

		background-image: radial-gradient(#0000 1px, var(--bg1) 1px);
		background-size: 4px 4px;
		backdrop-filter: saturate(70%) blur(4px);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--bg1);
			opacity: 0.5;
			z-index: -1;
		}
	}

	main {
		width: 800px;
		margin: 5vh auto 90vh;

		p {
			margin-top: 5vh;
			/* 为文本设置渐变背景 */
			background: center/85% linear-gradient(170deg, red, orange, green, blue, indigo, violet, red, orange);
			/* 背景裁剪为文本形状 */
			background-clip: text;
			/* 使文本颜色透明，以便显示背景 */
			color: transparent;
		}
	}
}
</style>
