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
	<Precode url="/wired/pages/coms/radioGroup.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<wired-radio-group class="red" selected="two">
					<wired-radio name="one">One</wired-radio>
					<wired-radio name="two">Two</wired-radio>
					<wired-radio name="three">Three</wired-radio>
					<wired-radio name="four">Four</wired-radio>
				</wired-radio-group>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>selected</strong> - 已选中的单选按钮的名称。</p>
				<p><strong>name</strong> - 与单选按钮组内的单选按钮关联的名称。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-radio-icon-color</strong> 单选按钮的颜色。默认为 <em>currentColor</em>。</p>
				<h2>事件</h2>
				<p><strong>selected</strong> - 当用户更改选择时触发的事件。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-radio-icon-color: var(--red);
}
</style>
