export default [
	{
		name: '天地图',
		url: 'https://t{s}.tianditu.gov.cn/mapservice/swdx',
		type: 'tdt',
		subdomains: '01234567',
		key: $config.map_tdt_key,
	},
	{
		name: 'Mars3d',
		url: 'https://data.mars3d.cn/terrain',
	},
	{
		name: 'ArcGIS',
		url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
		type: 'arcgis',
		divider: true,
	},
	{
		name: '无地形',
	},
]
