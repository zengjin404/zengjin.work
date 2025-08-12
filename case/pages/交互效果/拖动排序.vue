<script setup>
import Precode from '/src/components/Precode.vue'
import draggable from 'vuedraggable'
const state = reactive({
	list: [
		{ id: 1, label: 'Item 1' },
		{ id: 2, label: 'Item 2' },
		{ id: 3, label: 'Item 3' },
		{ id: 4, label: 'Item 4' },
		{ id: 5, label: 'Item 5' },
	],
})
</script>
<template>
	<div class="container">
		<pre>{{ JSON.stringify(state.list, null, 2) }}</pre>
		<!-- 拖拽容器 -->
		<draggable class="list" v-model="state.list" item-key="id" handle=".item_handle">
			<!-- 拖拽项 -->
			<template #item="{ element: item }">
				<div class="item">
					<label>{{ item.label }}</label>
					<i class="fa-regular fa-grip-dots-vertical item_handle"></i>
				</div>
			</template>
		</draggable>
	</div>
	<Precode url="/case/pages/交互效果/拖动排序.vue" />
</template>
<style scoped>
.container {
	padding: 20px;
}

.list {
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-width: 300px;
}

.item {
	padding: 15px;
	background: #fff;
	border: 2px solid #ddd;

	display: flex;
	align-items: center;
	justify-content: space-between;
}

.item_handle {
	cursor: grab;
}
</style>
