<script setup>
import Precode from '/src/components/Precode.vue'
import { MessagePlugin } from 'tdesign-vue-next'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const state = reactive({
	open: false,
})
function click_open() {
	console.log('打开弹窗')
	state.open = true
}
function click_close() {
	console.log('关闭弹窗')
	state.open = false
}
</script>

<template>
	<Precode url="/wired/pages/coms/dialog.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content ref="myContentRef">
				<wired-button id="openDialog" @click="click_open">打开弹窗</wired-button>

				<wired-dialog :open="state.open">
					<div style="max-width: 400px">
						<p>
							This is a paragraph and here's a link about <wired-link href="./button.html">wired-button</wired-link> and well well well, what do
							you know, same link with more elevation <wired-link elevation="3" href="./button.html">wired-button </wired-link>. Here's another
							link that opens in a new tab about <wired-link href="./input.html" target="_blank">wired-input </wired-link>. Lorem ipsum dolor sit
							amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<div style="text-align: right; padding: 30px 16px 16px">
							<wired-button id="closeDialog" @click="click_close">关闭弹窗</wired-button>
						</div>
					</div>
				</wired-dialog>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>elevation</strong> - 介于 1 到 5（含）之间的数字，用于设定草图链接下划线的高度。默认值为 1。</p>
				<p><strong>open</strong> - 布尔值，用于告诉对话框它是否正在显示。</p>
				<h2>自定义 CSS 属性</h2>
				<p><strong>--wired-dialog-z-index</strong> - 设置对话框的 <code>z-index</code></p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped></style>
