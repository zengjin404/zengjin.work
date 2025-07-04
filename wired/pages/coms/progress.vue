<script setup>
import { MessagePlugin } from 'tdesign-vue-next'

import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const state = reactive({
	progress: 0,
})

let timer = 0
function click_start() {
	state.progress = 0
	clearInterval(timer)
	timer = setInterval(() => {
		state.progress += 1
		if (state.progress >= 100) {
			state.progress = 0
		}
	}, 100)
}

function click_stop() {
	clearInterval(timer)
}
</script>

<template>
	<Precode url="/wired/pages/coms/progress.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<div>
						<p>常规</p>
						<wired-progress value="25"></wired-progress>
					</div>
					<div>
						<p>百分比</p>
						<wired-progress value="65" percentage></wired-progress>
					</div>
					<div>
						<p>范围 (100~1000)</p>
						<wired-progress value="800" min="100" max="1000"></wired-progress>
					</div>
				</t-space>

				<h2>综合</h2>
				<wired-progress class="red" :value="state.progress"></wired-progress>
				<t-space size="small">
					<wired-button @click="click_start">开始</wired-button>
					<wired-button @click="click_stop">停止</wired-button>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>value</strong> - 进度的数值。</p>
				<p><strong>min</strong> - 最小值。默认为 0。</p>
				<p><strong>max</strong> - 最大值。默认为 100。</p>
				<p><strong>percentage</strong> - 布尔值，指示标签是否应显示%符号。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-progress-label-color</strong> 标签的颜色。默认为 <em>黑色</em> 。</p>
				<p><strong>--wired-progress-label-background</strong> 标签的背景。默认为 <em>rgba(255,255,255,0.9)</em>。</p>
				<p><strong>--wired-progress-font-size</strong> 标签的字体大小。默认为 <em>14px</em></p>
				<p><strong>--wired-progress-color</strong> 进度条的颜色。默认为 <em>rgba(0, 0, 200, 0.8)</em>。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-progress-label-color: var(--red);
	--wired-progress-label-background: var(--yellow);
	--wired-progress-font-size: 1.2rem;
	--wired-progress-color: var(--red);
	width: 100%;
	height: 2em;
}
</style>
