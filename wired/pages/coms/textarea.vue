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
	<Precode url="/wired/pages/coms/textarea.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<wired-textarea></wired-textarea>
				<wired-textarea placeholder="占位符"></wired-textarea>
				<wired-textarea value="文本值"></wired-textarea>
				<wired-textarea value="禁用" disabled></wired-textarea>
				<wired-textarea value="3行行高" rows="3"></wired-textarea>
				<!-- <wired-textarea value="最大行数-5" rows="3" maxrows="5"></wired-textarea> -->
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>placeholder</strong> - 输入框的占位文本。</p>
				<p><strong>value</strong> - 文本值。</p>
				<p><strong>disabled</strong> - 禁用控件。</p>
				<p><strong>rows</strong> - 文本区域初始行数，默认 2。</p>
				<p>? <strong>maxrows</strong> - 文本区域最大行数。达到最大行数后会出现滚动条。</p>
				<h2>事件</h2>
				<p>触发原生 <code>&lt;textarea&gt;</code> 元素触发所有事件</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped></style>
