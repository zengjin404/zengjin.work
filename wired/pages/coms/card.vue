<script setup>
import { MessagePlugin } from 'tdesign-vue-next'
import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const myCardRef = ref(null)

const state = reactive({
	content:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
})

function click_change() {
	state.content = `设备：Windows 上的 Violentmonkey<br>地点：France附近<br>IP：91.134.49.75<br>时间：${new Date().toLocaleString()}`
	// myCardRef.value.requestUpdate()
}
</script>

<template>
	<PageLayout>
		<Precode url="/wired/pages/coms/card.vue" />
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-card>
						<h4>常规</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-card>
					<wired-card elevation="3">
						<h4>高度3</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-card>
					<wired-card elevation="5">
						<h4>高度5</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-card>
				</t-space>

				<h2>样式</h2>
				<t-space>
					<wired-card elevation="4" fill="var(--yellow)" style="color: var(--red)">
						<h4>样式</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-card>
				</t-space>

				<h2>方法</h2>
				<t-space>
					<wired-card ref="myCardRef">
						<h4>Card</h4>
						<p v-html="state.content"></p>
						<wired-button @click="click_change">改变内容</wired-button>
					</wired-card>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>高度</strong> - 1-5 之间的数值（包含两端）- 设置卡片的高度。默认值为 1。</p>
				<p><strong>填充</strong> - 一种用于在草图格式中填充卡片背景的颜色</p>
				<h2>方法</h2>
				<p>? <strong>requestUpdate()</strong> - 在动态向卡片添加内容时，调用此方法以重新计算卡片的边界。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
wired-card {
	max-width: 300px;
}
</style>
