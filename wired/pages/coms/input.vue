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
	<Precode url="/wired/pages/coms/input.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<t-space>
					<wired-input></wired-input>
					<wired-input placeholder="占位符"></wired-input>
					<wired-input value="文本值"></wired-input>
					<wired-input value="禁用" disabled></wired-input>
					<wired-input type="date"></wired-input>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>placeholder</strong> - 输入框的占位文本。</p>
				<p><strong>value</strong> - 文本值。</p>
				<p><strong>disabled</strong> - 禁用控件</p>
				<p><strong>type</strong> - 输入类型，例如密码</p>
				<h2>事件</h2>
				<p>触发标准 <code>&lt;input&gt;</code> 元素所触发所有事件。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped></style>
