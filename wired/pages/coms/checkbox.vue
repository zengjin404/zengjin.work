<script setup>
import { MessagePlugin } from 'tdesign-vue-next'
import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

function on_click() {
	MessagePlugin.success('点击了')
}
</script>

<template>
	<Precode url="/wired/pages/coms/checkbox.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-checkbox>常规</wired-checkbox>
					<wired-checkbox checked>选中</wired-checkbox>
					<wired-checkbox checked disabled>禁用</wired-checkbox>
				</t-space>
				<h2>样式</h2>
				<t-space>
					<wired-checkbox class="red">样式</wired-checkbox>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>checked</strong> - 勾选状态（布尔值）。默认为 false。</p>
				<p><strong>disabled</strong> - 禁用复选框。默认值为 false。</p>
				<h2>自定义 CSS 属性</h2>
				<p><strong>--wired-checkbox-icon-color</strong> 复选框的颜色。默认为 <em>currentColor</em>。</p>
				<h2>事件</h2>
				<p><strong>change</strong> 事件在复选框状态变化时触发，即用户勾选/取消勾选复选框。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-checkbox-icon-color: var(--red);
	color: var(--red);
	background: var(--yellow);
}
</style>
