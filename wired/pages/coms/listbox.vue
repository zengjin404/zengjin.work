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
	<Precode url="/wired/pages/coms/listbox.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<div>
						<wired-listbox>
							<wired-item value="one">No. one</wired-item>
							<wired-item value="two">No. two</wired-item>
							<wired-item value="three">No. three</wired-item>
							<wired-item value="four">No. four</wired-item>
						</wired-listbox>
					</div>

					<div>
						<wired-listbox horizontal selected="two">
							<wired-item value="one">No. one</wired-item>
							<wired-item value="two">No. two</wired-item>
							<wired-item value="three">No. three</wired-item>
							<wired-item value="four">No. four</wired-item>
						</wired-listbox>
					</div>
				</t-space>

				<h2>样式</h2>
				<wired-listbox class="red" selected="three">
					<wired-item value="one">No. one</wired-item>
					<wired-item value="two">No. two</wired-item>
					<wired-item value="three">No. three</wired-item>
					<wired-item value="four">No. four</wired-item>
				</wired-listbox>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>horizontal</strong> - 布尔值，表示项目是否水平排列。默认为 false。</p>
				<p><strong>selected</strong> - 选中的项目的值。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-item-selected-bg</strong> 选中项的背景颜色。</p>
				<p><strong>--wired-item-selected-color</strong> 选中项的文本颜色。</p>
				<h2>事件</h2>
				<p><strong>selected</strong> 事件在用户选择项目时触发。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-item-selected-bg: var(--yellow);
	--wired-item-selected-color: var(--red);
}
</style>
