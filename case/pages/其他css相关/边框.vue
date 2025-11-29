<script setup>
import Precode from '/src/components/Precode.vue'
import base from '/src/js/base.js'

//初始化===================================================================
const state = reactive({})
</script>

<template>
	<section>
		<div>
			<h2>1. border</h2>
			<div class="box box1"></div>
			<dl>
				<dt>优点</dt>
				<dd>简单易用，兼容性最好</dd>
				<dd>支持虚线、点线等预置样式</dd>
			</dl>
			<dl>
				<dt>缺点</dt>
				<dd>不支持渐变、阴影等复杂效果</dd>
				<dd>占用元素空间，动态改变宽度时会影响元素或内容大小</dd>
			</dl>
			<dl>
				<dt>场景</dt>
				<dd>基础边框，没有特别设计需求时</dd>
			</dl>
		</div>

		<div>
			<h2>2. outline</h2>
			<div class="box box2"></div>
			<dl>
				<dt>优点</dt>
				<dd>不占用元素空间</dd>
				<dd>支持调整偏移量</dd>
				<dd>支持虚线、点线等预置样式</dd>
			</dl>
			<dl>
				<dt>缺点</dt>
				<dd>不支持渐变、阴影等复杂效果</dd>
				<dd>圆角兼容性较差，旧浏览器可能不支持</dd>
				<dd>圆角值并不直观，与偏移量相关</dd>
			</dl>
			<dl>
				<dt>场景</dt>
				<dd>高亮提示，且不想占用空间时</dd>
			</dl>
		</div>

		<div>
			<h2>3. box-shadow</h2>
			<div class="box box3"></div>
			<dl>
				<dt>优点</dt>
				<dd>不占用元素空间</dd>
				<dd>可以多层叠加，模拟立体感</dd>
			</dl>
			<dl>
				<dt>缺点</dt>
				<dd>宽度或位置并不直观，尤其在多层叠加时</dd>
				<dd>只能实现分层渐变，无法实现常规环绕渐变</dd>
			</dl>
			<dl>
				<dt>场景</dt>
				<dd>高亮提示，且不想占用空间时</dd>
				<dd>内外发光、阴影或分层渐变效果</dd>
			</dl>
		</div>

		<div>
			<h2>4. background-clip</h2>
			<div class="box box4"></div>
			<dl>
				<dt>优点</dt>
				<dd>写法简洁，不依赖伪元素</dd>
				<dd>性能好，直接利用背景渲染机制</dd>
			</dl>
			<dl>
				<dt>缺点</dt>
				<dd>内容区需为实色背景，因为半透明时会叠加边框颜色效果较差</dd>
			</dl>
			<dl>
				<dt>场景</dt>
				<dd>简单渐变边框，且内容区为实色背景</dd>
			</dl>
		</div>

		<div>
			<h2>5. 伪元素 + 遮罩</h2>
			<div class="box box5"></div>
			<dl>
				<dt>优点</dt>
				<dd>可以使用渐变、阴影等复杂效果</dd>
			</dl>
			<dl>
				<dt>缺点</dt>
				<dd>实现相对复杂，需要额外的伪元素</dd>
				<dd>兼容性较差，旧浏览器可能需要 -webkit-mask 和 mask-composite 做兼容处理</dd>
			</dl>
			<dl>
				<dt>场景</dt>
				<dd>复杂渐变边框、hover动效时</dd>
			</dl>
		</div>
	</section>
	<Precode url="/case/pages/其他css相关/边框.vue" />
</template>

<style lang="less" scoped>
.box1 {
	border: 4px dashed var(--primary);
}
.box1:hover {
	border: 8px dotted var(--warning);
}

.box2 {
	outline: 4px dashed var(--primary);
	outline-offset: -8px;
}
.box2:hover {
	outline: 8px dotted var(--warning);
	outline-offset: 8px;
}

.box3 {
	box-shadow:
		0 0 0 4px var(--primary),
		inset 0 0 8px var(--primary);
}
.box3:hover {
	box-shadow:
		0 0 0 8px var(--warning),
		0 0 16px 8px var(--warning);
}

.box4 {
	border: 4px solid transparent;
	background:
		linear-gradient(#00d49288, #00d49288) padding-box /* 内容区背景 */,
		linear-gradient(45deg, var(--primary), var(--warning)) border-box /* 渐变边框 */;
}
.box4:hover {
	border: 8px solid transparent;
	background:
		linear-gradient(#00d49288, #00d49288) padding-box /* 内容区背景 */,
		linear-gradient(45deg, var(--warning), var(--danger)) border-box /* 渐变边框 */;
}

.box5 {
	position: relative;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		padding: 4px; /* 边框宽度 */
		border-radius: inherit; /* 边框圆角 */
		background: linear-gradient(45deg, var(--primary), var(--warning)); /* 边框颜色 */
	}
}

.box5:hover {
	&::before {
		padding: 8px; /* 边框宽度 */
		background: linear-gradient(45deg, var(--warning), var(--danger));
	}
}
</style>

<style lang="less" scoped>
section {
	height: 100%;
	overflow: auto;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	padding: 40px 40px 40px 60px;
	gap: 40px 0;

	// background-color: #f0f0f0;

	h2 {
		font-weight: 700;
		font-size: 16px;
		margin-left: -18px;
	}
	dl {
		font-size: 13px;
		line-height: 1.75;
		margin-bottom: 8px;

		dt {
			margin-top: 4px;
		}

		dd {
			margin-left: 1em;
		}
	}

	:where(.box) {
		width: 200px;
		height: 100px;
		border-radius: 8px;
		margin: 8px 0;
		background: #00d49288;
		transition: 0.2s;

		&::before,
		&::after {
			transition: inherit;
		}
	}
}
</style>
