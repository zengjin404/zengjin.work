<script setup>
import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const myContentRef = ref(null)
const state = reactive({
	selected: 'two',
})

function on_selected(e) {
	console.log(e)
	state.selected = e.detail.selected
	console.log(state.selected)
}

function click_get_all() {
	console.log(myContentRef.value)

	myContentRef.value.$el.querySelectorAll('wired-combo').forEach(combo => {
		console.log(combo, combo.selected)
	})
}
</script>

<template>
	<Precode url="/wired/pages/coms/combo.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content ref="myContentRef">
				<h2>常规</h2>
				<t-space>
					<div>
						<p>常规</p>
						<wired-combo>
							<wired-item value=""></wired-item>
							<wired-item value="one">Number one</wired-item>
							<wired-item value="two">Number two</wired-item>
						</wired-combo>
					</div>
					<div>
						<p>选中</p>
						<wired-combo :selected="state.selected">
							<wired-item value=""></wired-item>
							<wired-item value="one">Number one</wired-item>
							<wired-item value="two">Number two</wired-item>
						</wired-combo>
					</div>
					<div>
						<p>禁用</p>
						<wired-combo selected="three" disabled>
							<wired-item value=""></wired-item>
							<wired-item value="one">Number one</wired-item>
							<wired-item value="two">Number two</wired-item>
							<wired-item value="three">Number three</wired-item>
						</wired-combo>
					</div>
				</t-space>
				<h2>样式</h2>
				<t-space>
					<wired-combo selected="two" style="--wired-combo-popup-bg: var(--yellow); --wired-item-selected-bg: var(--red)">
						<wired-item value=""></wired-item>
						<wired-item value="one">Number one</wired-item>
						<wired-item value="two">Number two</wired-item>
					</wired-combo>
				</t-space>
				<h2>事件</h2>
				<t-space>
					<div>
						<wired-combo :selected="state.selected" @selected="on_selected">
							<wired-item value=""></wired-item>
							<wired-item value="one">Number one</wired-item>
							<wired-item value="two">Number two</wired-item>
						</wired-combo>
						<p>当前选中: {{ state.selected }}</p>
					</div>
				</t-space>
				<h2>综合</h2>
				<t-space>
					<wired-button @click="click_get_all">获取全部选中值</wired-button>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>disabled</strong> - 禁用组合选择器。默认值为 false。</p>
				<p><strong>selected</strong> - 选中 wired-item 的值。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-combo-popup-bg</strong> 组合选择器打开时下拉菜单的背景颜色。</p>
				<p><strong>--wired-item-selected-bg</strong> 选中项的背景颜色</p>
				<h2>事件</h2>
				<p><strong>selected</strong> 事件在用户选择一个项目时触发。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped></style>
