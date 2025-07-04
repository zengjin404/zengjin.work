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
	<Precode url="/wired/pages/coms/iconButton.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-icon-button>
						<i class="fa-solid fa-heart"></i>
					</wired-icon-button>
					<wired-icon-button disabled>
						<i class="fa-solid fa-heart"></i>
					</wired-icon-button>
				</t-space>
				<h2>样式</h2>
				<t-space>
					<wired-icon-button class="red">
						<i class="fa-solid fa-heart"></i>
					</wired-icon-button>
					<wired-icon-button class="big">
						<i class="fa-solid fa-heart"></i>
					</wired-icon-button>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>disabled</strong> - 禁用按钮。默认值为 false。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-icon-size</strong> 图标的数值大小。默认为 24 (px)。</p>
				<p>? <strong>--wired-icon-bg-color</strong> 背景颜色。</p>
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
	--wired-icon-bg-color: var(--yellow);
	color: var(--red);
}
</style>
