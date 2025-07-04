<script setup>
import { MessagePlugin } from 'tdesign-vue-next'

import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const tabsRef = ref(null)
const state = reactive({})
</script>

<template>
	<Precode url="/wired/pages/coms/toggle.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<wired-toggle></wired-toggle>
				<wired-toggle checked></wired-toggle>
				<wired-toggle disabled></wired-toggle>
				<wired-toggle class="red" checked></wired-toggle>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>checked</strong> - 勾选状态（布尔值）。</p>
				<p><strong>disabled</strong> - 禁用切换按钮。默认值为 false。</p>

				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-toggle-off-color</strong> 开关处于关闭（false）位置时旋钮的颜色。默认值为 <em>gray</em>。</p>
				<p><strong>--wired-toggle-on-color</strong> 开关处于开启（true）位置时旋钮的颜色。默认值为 <em>rgb(63, 81, 181)</em>。</p>

				<h2>事件</h2>
				<p><strong>change</strong> 事件在用户改变开关状态时触发。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-toggle-off-color: var(--red);
	--wired-toggle-on-color: var(--green);
}
</style>
