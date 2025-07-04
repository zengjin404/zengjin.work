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
	<Precode url="/wired/pages/coms/tabs.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<wired-tabs>
					<wired-tab name="One">
						<h4>Card 1</h4>
						<p>
							有bug-点击无法切换，尝试手动绑定事件也无效。 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
							magna aliqua.
						</p>
					</wired-tab>
					<wired-tab name="Two">
						<h4>Card 2</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-tab>
				</wired-tabs>

				<h2>综合</h2>
				<wired-tabs class="red" selected="2">
					<wired-tab name="1" label="AAA">
						<h4>AAA</h4>
						<p>
							有bug-点击无法切换，尝试手动绑定事件也无效。 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
							magna aliqua.
						</p>
					</wired-tab>
					<wired-tab name="2" label="BBB">
						<h4>BBB</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-tab>
					<wired-tab name="3" label="CCC">
						<h4>CCC</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</wired-tab>
				</wired-tabs>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>WiredTabs 属性</h2>
				<p><strong>selected</strong> - 当前选中标签的名称</p>

				<h2>WiredTab 属性</h2>
				<p><strong>name</strong> - 该选项卡的唯一标识符。用于选择。</p>
				<p><strong>label</strong> - 在选项卡中显示的文本。默认为 <strong>name</strong> 属性。</p>

				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-item-selected-bg</strong> 已选项卡的背景颜色。</p>
				<p><strong>--wired-item-selected-color</strong> 已选项卡的文字颜色。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.PageLayout {
	:deep(.HeaderLayout) {
		wired-tabs {
			width: 400px;
		}

		.red {
			width: 600px;
			--wired-item-selected-bg: var(--yellow);
			--wired-item-selected-color: var(--red);
		}
	}
}
</style>
