window.$layers = [
	{
		name: '矢量-天地图',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/tdt_vec.png',
		type: 'group',
		layers: [
			{
				name: '底图',
				type: 'tdt',
				layer: 'vec_d',
				key: $config.map_tdt_key,
			},
			{
				name: '注记',
				type: 'tdt',
				layer: 'vec_z',
				key: $config.map_tdt_key,
			},
		],
	},
	{
		name: '矢量-高德',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/gaode_vec.png',
		type: 'gaode',
		layer: 'vec',
	},
	{
		name: '矢量-百度',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/bd_vec.png',
		type: 'baidu',
		layer: 'vec',
	},
	{
		name: '矢量-腾讯',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/tencent_vec.png',
		type: 'tencent',
		layer: 'vec',
	},

	{
		name: '卫星-天地图',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/tdt_img.png',
		type: 'group',
		layers: [
			{
				name: '底图',
				type: 'tdt',
				layer: 'img_d',
				key: $config.map_tdt_key,
			},
			{
				name: '注记',
				type: 'tdt',
				layer: 'img_z',
				key: $config.map_tdt_key,
			},
		],
		show: true,
	},
	{
		name: '卫星-高德',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/gaode_img.png',
		type: 'group',
		layers: [
			{
				name: '底图',
				type: 'gaode',
				layer: 'img_d',
			},
			{
				name: '注记',
				type: 'gaode',
				layer: 'img_z',
			},
		],
	},
	// {
	// 	"name": "卫星-百度",
	// 	"icon": "https://data.mars3d.cn/img/thumbnail/basemap/bd_img.png",
	// 	"type": "group",
	// 	"layers": [
	// 		{
	// 			"name": "底图",
	// 			"type": "baidu",
	// 			"layer": "img_d"
	// 		},
	// 		{
	// 			"name": "注记",
	// 			"type": "baidu",
	// 			"layer": "img_z"
	// 		}
	// 	],
	// },
	{
		name: '卫星-腾讯',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/tencent_img.png',
		type: 'group',
		layers: [
			{
				name: '底图',
				type: 'tencent',
				layer: 'img_d',
			},
			{
				name: '注记',
				type: 'tencent',
				layer: 'img_z',
			},
		],
	},
	{
		name: '卫星底图-ArcGIS',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/arcgis_img.png',
		type: 'xyz',
		url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		enablePickFeatures: false,
	},
	{
		name: '卫星底图-微软',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/bing_img.png',
		type: 'bing',
		layer: 'Aerial',
	},

	{
		name: '主题-静谧蓝',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/my_blue.png',
		type: 'gaode',
		layer: 'vec',
		chinaCRS: 'GCJ02',
		invertColor: true,
		filterColor: '#4e70a6',
		brightness: 0.6,
		contrast: 1.8,
		gamma: 0.3,
		hue: 1,
		saturation: 0,
	},
	{
		name: '主题-荧光绿',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/my_green.png',
		type: 'gaode',
		layer: 'vec',
		chinaCRS: 'GCJ02',
		invertColor: true,
		filterColor: 'rgba(12, 238, 230)',
		brightness: 1,
		contrast: 1.0,
		gamma: 0.2,
		hue: 1,
		saturation: 0,
	},
	{
		name: '主题-午夜黑',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/my_dark.png',
		type: 'gaode',
		layer: 'vec',
		chinaCRS: 'GCJ02',
		invertColor: true,
		filterColor: '#909090',
		brightness: 0.6,
		contrast: 1.8,
		gamma: 0.3,
		hue: 1,
		saturation: 0,
	},

	{
		name: '离线',
		icon: '/navyblue/icon.png',
		type: 'xyz',
		url: '/navyblue/{z}/{x}/{y}.png',
	},
	{
		name: '单图',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/offline.png',
		type: 'image',
		url: '/$base/img/map/world.jpg',
	},
	{
		name: '单图夜晚',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/my_night.png',
		type: 'image',
		url: '/$base/img/map/world_night.jpg',
	},
	{
		name: '单图深蓝',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/my_blue.png',
		type: 'image',
		url: '/$base/img/map/world_blue.jpg',
	},
	{
		name: '无底图',
		icon: 'https://data.mars3d.cn/img/thumbnail/basemap/null.png',
		type: 'grid',
		color: '#ffffff',
		alpha: 0.03,
		cells: 2,
	},
]
