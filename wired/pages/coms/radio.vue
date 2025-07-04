<script setup>
import { MessagePlugin } from 'tdesign-vue-next'

import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'
</script>

<template>
	<Precode url="/wired/pages/coms/radio.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-radio>常规</wired-radio>
					<wired-radio checked>选中</wired-radio>
					<wired-radio checked disabled>禁用</wired-radio>
				</t-space>

				<h2>样式</h2>
				<t-space>
					<wired-radio class="red">样式</wired-radio>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>checked</strong> - 单选按钮的选中状态（布尔值）。默认为 false。</p>
				<p><strong>disabled</strong> - 禁用单选按钮。默认值为 false。</p>
				<p>? <strong>text</strong> - 与单选按钮关联的文本。</p>
				<p>? <strong>name</strong> - 与单选按钮组内的单选按钮关联的名称。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-radio-icon-color</strong> 单选按钮的颜色。默认为 <em>currentColor</em>。</p>
				<h2>事件</h2>
				<p><strong>change</strong> - 当单选按钮状态发生变化时触发的事件，即用户勾选/取消勾选单选按钮。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-radio-icon-color: var(--red);
}
</style>
