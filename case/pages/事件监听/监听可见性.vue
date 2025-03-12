<script setup>
import Logs from '/$base/components/Logs.vue'
import Precode from '/$base/components/Precode.vue'

const sectionRef = ref()
const box1Ref = ref()
const box2Ref = ref()

const state = reactive({
	logs: [],
})

onMounted(() => {
	const intersectionObserver = new IntersectionObserver(
		intersectionObserver_todo,
		{ threshold: [0, 0.5, 1] }, //每个元素[即将显隐, 显隐一半, 完全显隐]时都会触发
	)
	intersectionObserver.observe(box1Ref.value) //初始化时也会触发
	intersectionObserver.observe(box2Ref.value)
})

function intersectionObserver_todo(entries) {
	if (!box1Ref.value || !box2Ref.value) return //销毁时也会触发, 所以要加兼容

	entries.forEach(item => {
		state.logs.push(`${item.target.textContent}显示比例：${item.intersectionRatio.toFixed(2) * 1}`)
	})
}

function scrollTo_bottom(behavior) {
	let top = sectionRef.value.scrollHeight - sectionRef.value.clientHeight - 32
	sectionRef.value.scrollTo({ top: top, behavior }) //缓动, 中间过程也触发
}

function scrollTo_top(behavior) {
	sectionRef.value.scrollTo({ top: 32, behavior }) //瞬移, 仅最终状态触发
}
</script>

<template>
	<section ref="sectionRef">
		<div class="box1" ref="box1Ref">box1</div>
		<div class="box2" ref="box2Ref">box2</div>

		<div class="ctrlbar">
			<t-space direction="vertical" size="12px">
				<t-button size="small" variant="outline" @click="scrollTo_bottom('instant')"> 瞬移至底部 </t-button>
				<t-button size="small" variant="outline" @click="scrollTo_top('instant')"> 瞬移至顶部 </t-button>
				<t-divider dashed />
				<t-button size="small" variant="outline" @click="scrollTo_bottom('smooth')"> 缓动至底部 </t-button>
				<t-button size="small" variant="outline" @click="scrollTo_top('smooth')"> 缓动至顶部 </t-button>
				<t-divider dashed />
				<t-tag size="small" variant="outline" disabled>滚动页面可手动触发</t-tag>
			</t-space>
		</div>
	</section>
	<Logs v-model="state.logs"></Logs>
	<Precode url="/case/pages/事件监听/监听可见性.vue" />
</template>

<style lang="less" scoped>
section {
	overflow: auto;

	height: 100%;
	padding: 16px;

	.ctrlbar {
		position: absolute;
		top: 16px;
		left: 16px;
		display: flex;
		flex-direction: column;

		.t-divider {
			margin: 0;
		}
	}

	.box1,
	.box2 {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 100px;
		height: 100px;
		margin: 0 auto;

		color: #fff;
		background: var(--orange);
		position: relative;
		z-index: 1;
		opacity: 0.6;
	}

	.box2 {
		margin-top: 100vh;
		background: var(--green);
	}
}
</style>
