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
	<Precode url="/wired/pages/coms/button.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-button>常规</wired-button>
					<wired-button disabled>禁用</wired-button>
				</t-space>

				<h2>高度</h2>
				<t-space>
					<wired-button elevation="1">高度 1</wired-button>
					<wired-button elevation="3">高度 3</wired-button>
					<wired-button elevation="5">高度 5</wired-button>
				</t-space>

				<h2>综合</h2>
				<t-space>
					<wired-button style="background: var(--yellow); color: var(--red)" @click="on_click">样式+事件</wired-button>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>elevation</strong> - 介于 1 到 5（含）之间的数字，为按钮提供一个草图高度。默认值为 1。</p>
				<p><strong>disabled</strong> - 禁用按钮。默认值为 false。</p>
				<h2>事件</h2>
				<p><strong>click</strong> - 当按钮被点击/提交时</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped></style>
