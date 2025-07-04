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
	<Precode url="/wired/pages/coms/fab.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-fab>
						<i class="fa-solid fa-heart"></i>
					</wired-fab>
					<wired-fab disabled>
						<i class="fa-solid fa-heart"></i>
					</wired-fab>
				</t-space>
				<h2>样式</h2>
				<t-space>
					<wired-fab class="red">
						<i class="fa-solid fa-heart"></i>
					</wired-fab>
					<wired-fab class="big">
						<i class="fa-solid fa-heart"></i>
					</wired-fab>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>disabled</strong> - 禁用按钮。默认值为 false。</p>
				<h2>自定义 CSS 属性</h2>
				<p><strong>--wired-fab-bg-color</strong> - FAB 的背景颜色。默认值为 #018786。前景色通过设置 <strong>color</strong> css 属性来定义。</p>
				<h2>事件</h2>
				<p><strong>click</strong> - 当按钮被点击/提交时</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.big {
	--wired-icon-size: 40px;
}

.red {
	--wired-fab-bg-color: var(--yellow);
	color: var(--red);
}
</style>
