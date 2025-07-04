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
	<Precode url="/wired/pages/coms/image.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<wired-image src="/$base/file/demo.png"></wired-image>
				</t-space>
				<h2>样式</h2>
				<t-space>
					<wired-image class="red" elevation="3" src="/$base/file/demo3.jpg"></wired-image>
					<wired-image class="sized" elevation="5" src="/$base/file/demo2.jpg"></wired-image>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>src</strong> - 图片的 URL。</p>
				<p><strong>elevation</strong> - 1-5 之间的数值（包含 1 和 5）- 设置卡片的提升高度。默认值为 1。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	color: var(--red);
}

.sized {
	max-width: 500px;
	max-height: 500px;
}
</style>
