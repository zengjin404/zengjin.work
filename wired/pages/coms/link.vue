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
	<Precode url="/wired/pages/coms/link.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<p>
					This is a paragraph and here's a link about <wired-link href="./#/coms/button">wired-button</wired-link> and well well well, what do you
					know, same link with more elevation <wired-link elevation="3" href="./#/coms/button">wired-button </wired-link>. Here's another link that
					opens in a new tab about <wired-link class="red" target="_blank" href="./#/coms/input">wired-input </wired-link>. Lorem ipsum dolor sit
					amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>elevation</strong> - 1 到 5（含）之间的数字，用于设置草图链接下划线的高度。默认值为 1。</p>
				<p><strong>href</strong> - 要链接到的页面的 URL</p>
				<p><strong>target</strong> - 类似于 <code>&lt;a&gt;</code> 的 target 属性，此链接的目标窗口。</p>
				<h2>自定义 CSS 属性</h2>
				<p>
					<strong>--wired-link-decoration-color</strong> - 链接草图下划线的颜色。默认值为蓝色。前景色通过设置 <strong>color</strong> css 属性来设定。
				</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-link-decoration-color: var(--red);
}
</style>
