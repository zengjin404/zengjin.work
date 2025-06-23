export default {
	arrowParens: 'avoid', // 箭头函数的参数只有一个时是否要有小括号
	bracketSameLine: true, // 多行html标签的>是否紧贴在末尾(而不是另起一行)
	bracketSpacing: true, // 对象大括号内收尾是否有空格
	semi: false, // 句尾是否需要分号
	singleQuote: true, // 优先使用单引号
	quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
	// jsxSingleQuote: true, //jsx中使用单引号
	printWidth: 180, // 超过最大值换行
	tabWidth: 4, // 每个 tab 代表几个空格数
	useTabs: true, // 使用 tab 缩进

	// 调整导入顺序
	importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
}
