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
	<Precode url="/wired/pages/coms/video.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<p>
					<wired-video autoplay playsinline muted loop src="/$base/file/demo.mp4"> </wired-video>
				</p>
				<p>
					<wired-video class="red" src="/$base/file/demo2.mp4"> </wired-video>
				</p>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>src</strong> - 视频的 URL。</p>
				<p><strong>autoplay</strong> - 布尔值，表示视频是否应自动播放。</p>
				<p><strong>loop</strong> - 循环视频（布尔值）。</p>
				<p><strong>muted</strong> - 静音播放视频（布尔值）</p>
				<p><strong>playsinline</strong> - 在移动设备上内联播放视频（布尔值）</p>

				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-video-highlight-color</strong> 进度条和音量控制旋钮的颜色。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
wired-video {
	max-width: 600px;
}
.red {
	--wired-video-highlight-color: var(--red);
	width: 400px;
}
</style>
