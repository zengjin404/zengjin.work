<script setup>
import { MessagePlugin } from 'tdesign-vue-next'

import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const spinnerRef = ref(null)
const state = reactive({
	spinning: false,
})

function click_toggle() {
	spinnerRef.value.spinning = !spinnerRef.value.spinning
}
</script>

<template>
	<Precode url="/wired/pages/coms/spinner.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<wired-spinner spinning></wired-spinner>
				<h2>综合</h2>
				<wired-spinner ref="spinnerRef" class="red" :spinning="state.spinning" duration="500"></wired-spinner>
				<wired-button @click="click_toggle">{{ state.spinning ? '停止' : '开始' }}</wired-button>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>spinning</strong> - 指示旋转器是否在旋转。默认值为 <em>false</em>。</p>
				<p><strong>duration</strong> - 完成一整圈旋转所需的时间，单位为毫秒。默认值为 <em>1500</em></p>
				<h2>样式设置</h2>
				<p>通过更改旋转器元素的 <strong>color</strong> 样式来改变其颜色。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	color: var(--red);
}
</style>
