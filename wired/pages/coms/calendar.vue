<script setup>
import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

import PageLayout from '/src/components/layout/PageLayout.vue'
import HeaderLayout from '/src/components/layout/HeaderLayout.vue'
import FooterLayout from '/src/components/layout/FooterLayout.vue'
import MainLayout from '/src/components/layout/MainLayout.vue'
import Content from '/src/components/Content.vue'

const myCalendar4Ref = ref(null)

const state = reactive({
	myCalendar4result: '选择一个日期',
	myCalendar4update: '未更新',
})

const click_today = () => {
	let today = new Date()
	// Sample using optional internal date formatter
	let formatedDate = myCalendar4Ref.value.format(today)
	console.log('设置日期为今天 = ', formatedDate)

	// Set selected date using any format accepted by javascript Date object
	myCalendar4Ref.value.setSelectedDate(formatedDate)
}
const click_update = () => {
	const today = new Date()
	const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
	const updateTimeLeyend = ' <small>更新时间:' + time + '</small>'

	const selectedObject = myCalendar4Ref.value.value
	if (selectedObject && selectedObject.date) {
		state.myCalendar4update = selectedObject.date.toLocaleDateString() + updateTimeLeyend
	} else {
		state.myCalendar4update = '未选择日期' + updateTimeLeyend
	}
}

const on_selected = e => {
	let selectedObject = myCalendar4Ref.value.value
	// `selectedObject.date` 是一个 javascript Date 对象
	// `selectedObject.text` 是日期的格式化文本
	let formatedDate = selectedObject.text
	state.myCalendar4result = formatedDate + ' <br><small>提示: 内部日期处理不受区域设置影响。</small>'
}
</script>

<template>
	<Precode url="/wired/pages/coms/calendar.vue" />
	<PageLayout>
		<HeaderLayout>
			<Content>
				<h2>常规</h2>
				<t-space>
					<div class="item_wrapper">
						<p>常规</p>
						<wired-calendar></wired-calendar>
					</div>

					<div class="item_wrapper">
						<p>国际化</p>
						<!-- 注意：参数日期不受区域设置影响 -->
						<wired-calendar
							id="calendar2"
							elevation="1"
							firstdate="Apr 15, 2019"
							lastdate="Jul 15, 2019"
							selected="Jul 4, 2019"
							locale="fr"
							initials>
						</wired-calendar>
					</div>
				</t-space>

				<h2>样式</h2>
				<t-space>
					<div class="item_wrapper">
						<wired-calendar id="calendar3" class="custom" firstdate="Apr 15, 2019" initials> </wired-calendar>
					</div>
				</t-space>

				<h2>事件</h2>
				<t-space>
					<section>
						<p>javascript 交互示例 (事件和非事件驱动)</p>
						<wired-calendar
							ref="myCalendar4Ref"
							id="calendar4"
							elevation="5"
							firstdate="Apr 15, 2019"
							lastdate="Jul 15, 2019"
							initials
							@selected="on_selected">
						</wired-calendar>
						<p id="calendar4-result" v-html="state.myCalendar4result"></p>
						<p></p>
						<div style="margin-top: 16px">
							<wired-button id="btn-today" @click="click_today">今日</wired-button>
							<wired-button id="btn-update" @click="click_update">更新</wired-button>
						</div>
						<p id="calendar4-update" v-html="state.myCalendar4update"></p>
						<p></p>
					</section>
				</t-space>
			</Content>
		</HeaderLayout>
		<MainLayout>
			<Content>
				<h2>属性</h2>
				<p><strong>elevation</strong> - 1-5 之间的数值（包含 1 和 5）- 设置卡片的提升高度。默认值为 1。</p>
				<p><strong>selected</strong> - 可选的字符串值，将被解析为日期。预先选择日历中高亮的日期。</p>
				<p><strong>firstdate</strong> - 可选的字符串值，将被解析为日期。有效日期的下限。</p>
				<p><strong>lastdate</strong> - 可选字符串值，将被解析为日期。有效日期的上限。</p>
				<p>
					<strong>locale</strong> -
					可选字符串值，用于设置仅在日历中渲染标题时使用的区域设置。默认为浏览器区域设置。注意：所有内部和外部日期处理均不受区域设置影响。
				</p>
				<p><strong>disabled</strong> - 布尔值，禁用日历选择器。默认值为 false。</p>
				<p><strong>initials</strong> - 布尔值，用于在星期名称中使用首字母缩写。默认值为 false。</p>
				<p><strong>value</strong> - 包含所选 Date 对象和相应格式文本的 javascript 对象。</p>
				<p><strong>format</strong> - 获取/设置将 Date 对象格式化为格式文本的 javascript 函数。</p>
				<h2>自定义 CSS 变量</h2>
				<p><strong>--wired-calendar-bg</strong> 日历的背景颜色。默认为白色。</p>
				<p><strong>--wired-calendar-color</strong> 日历草图线条颜色。默认为黑色。</p>
				<p><strong>--wired-calendar-selected-color</strong> 选中日期的草图线颜色。默认为红色。</p>
				<p><strong>--wired-calendar-dimmed-color</strong> 日历实际月份之外的天数的字体颜色。默认为灰色。</p>
				<h2>事件</h2>
				<p><strong>selected</strong> 用户选中日期时触发的事件。</p>
			</Content>
		</MainLayout>
	</PageLayout>
</template>

<style lang="less" scoped>
.custom {
	--wired-calendar-bg: var(--yellow);
	--wired-calendar-color: var(--red);
	--wired-calendar-selected-color: var(--cl);
	--wired-calendar-dimmed-color: var(--ph);
	width: 260px;
	height: 260px;
	font-size: 18px;
}
</style>
