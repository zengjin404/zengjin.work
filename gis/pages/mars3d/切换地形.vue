<script setup>
import Precode from '/src/components/Precode.vue'

import { ChevronDownIcon } from 'tdesign-icons-vue-next'
import Mars3d from '/src/components/Mars3d.vue'
import Mars3d_terrains from '/$base/js/Mars3d_terrains.js'

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
	click_terrain()
}

function click_terrain(i = 0) {
	state.active = i
	if (Mars3d_terrains[state.active]?.url) {
		map.terrainProvider = mars3d.LayerUtil.createTerrainProvider(Mars3d_terrains[state.active])
	} else {
		map.terrainProvider = mars3d.LayerUtil.getNoTerrainProvider()
	}
}

</script>

<template>
	<Mars3d @inited="inited_map">
		<div class="layerControl">
			<t-dropdown trigger="click" maxColumnWidth="auto" maxHeight="auto">
				<t-link theme="primary">
					{{ Mars3d_terrains[state.active]?.name }}
					<ChevronDownIcon />
				</t-link>
				<t-dropdown-menu>
					<t-dropdown-item v-for="(item, i) in Mars3d_terrains" :key="item.name" :active="i == state.active"
						:divider="item.divider" @click="click_terrain(i)">
						{{ item.name }}
					</t-dropdown-item>
				</t-dropdown-menu>
			</t-dropdown>
		</div>
	</Mars3d>
	<Precode url="/gis/pages/mars3d/切换地形.vue" />
</template>

<style lang="less" scoped>
.Mars3d {
	.layerControl {
		position: absolute;
		z-index: 1;
		bottom: 10px;
		left: 10px;

		:deep(.t-link) {
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

			.t-icon {
				margin-left: 2px;
			}
		}
	}
}
</style>
