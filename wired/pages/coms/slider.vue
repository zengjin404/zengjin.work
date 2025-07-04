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
	<Precode url="/wired/pages/coms/slider.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<div>
						<p>常规</p>
						<wired-slider value="25"></wired-slider>
					</div>
					<div>
						<p>禁用</p>
						<wired-slider value="60" disabled></wired-slider>
					</div>
					<div>
						<p>范围 (100~1000)</p>
						<wired-slider value="800" min="100" max="1000"></wired-slider>
					</div>
				</t-space>
				<h2>样式</h2>
				<wired-slider class="red" value="25"></wired-slider>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>value</strong> - 滑块的数值。</p>
				<p><strong>min</strong> - 滑块的最低值。默认为 0。</p>
				<p><strong>max</strong> - 滑块的最高值。默认为 100。</p>
				<h2>自定义 CSS 变量</h2>
				<p>? <strong>--wired-slider-knob-zero-color</strong> 滑块值处于 最小值时的旋钮颜色。</p>
				<p><strong>--wired-slider-knob-color</strong> 滑块值 不处于 最小值时的旋钮颜色。</p>
				<p><strong>--wired-slider-bar-color</strong> 旋钮滑动的条的颜色。</p>
				<h2>事件</h2>
				<p><strong>change</strong> 事件在用户改变滑块值时触发。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.red {
	--wired-slider-knob-zero-color: var(--orange);
	--wired-slider-knob-color: var(--red);
	--wired-slider-bar-color: var(--orange);
	width: 100%;
}
</style>
