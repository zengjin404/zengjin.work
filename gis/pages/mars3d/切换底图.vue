<script setup>
import Precode from '/src/components/Precode.vue'

import { ChevronDownIcon } from 'tdesign-icons-vue-next'
import Mars3d from '/src/components/Mars3d.vue'
import Mars3d_basemaps from '/$base/js/Mars3d_basemaps.js'
//props属性===================================================================
const props = defineProps({})

//emits事件===================================================================
const emits = defineEmits([])

//初始化===================================================================
// onMounted(() => {
// 	init_tree()
// })

const state = reactive({
	active: 0,
})

let map = null
function inited_map(value, ref) {
	map = value
	click_basemap()
}

function click_basemap(i = 0) {
	state.active = i
	map.basemap = Mars3d_basemaps[state.active]?.name
}
</script>

<template>
	<Mars3d @inited="inited_map">
		<div class="layerControl">
			<t-dropdown trigger="click" maxColumnWidth="auto" maxHeight="auto">
				<t-link theme="primary">
					{{ Mars3d_basemaps[state.active]?.name }}
					<ChevronDownIcon />
				</t-link>
				<t-dropdown-menu>
					<t-dropdown-item v-for="(item, i) in Mars3d_basemaps" :key="item.name" :active="i == state.active"
						:divider="item.divider" @click="click_basemap(i)">
						{{ item.name }}
					</t-dropdown-item>
				</t-dropdown-menu>
			</t-dropdown>
		</div>
	</Mars3d>
	<Precode url="/gis/pages/mars3d/切换底图.vue" />
</template>

<style lang="less" scoped>
.Mars3d {
	.layerControl {
		position: absolute;
		z-index: 1;
		bottom: 10px;
		left: 10px;

		display: flex;
		gap: 10px;

		:deep(.t-link),
		:deep(.t-checkbox) {
			position: relative;
			display: flex;
			overflow: hidden;
			width: min-content;
			padding: 5px 8px 5px 10px;

			cursor: pointer;
			white-space: nowrap;
			border-radius: 4px;
			// background-color: #fff;
			background: var(--bg-hard);
			//box-shadow: 1px 1px 4px var(--bd-hard);
			box-shadow: 1px 2px 8px #2366;

			font-size: 1rem;

		}
	}
}
</style>
