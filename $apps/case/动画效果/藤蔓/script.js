var flowers = 19 // 无需更改
function addFlower() {
	var f = document.createElement('div')
	f.className = 'flower'
	f.style.width = '3px'
	var num = Math.ceil(Math.random() * 15) * 5 //每个藤蔓生长次数
	f.style.height = num + 'vh'
	f.style.background = 'hsl(10deg,50%,' + (Math.random() * 40 + 20) + '%)'
	f.style.position = 'fixed'
	f.style.top = 0
	f.style.left = flowers * 5 + 2.5 + '%'
	f.style.transform = 'translateY(-100%)'
	f.style.animationDuration = num * 0.03 + 's' //每个藤蔓每次生长时间
	f.style.animationDelay = Math.random() * 1.5 + 's' //第一个藤蔓到最后一个的间隔时间
	f.style.borderRadius = '0 0 1rem 1rem'
	f.style.pointerEvents = 'none'
	flowers--

	//leafs
	for (var i = 0; i < num * 0.4; i++) {
		var l = document.createElement('div')
		l.className = 'leaf'
		var side = Math.random() < 0.5 ? 'transform:scaleX(-1);' : '',
			show = Math.random() < 0.5 ? 'hidden' : '',
			color = 'hsl(150deg,50%,' + (Math.random() * 40 + 20) + '%)'
		f.innerHTML += `<div class='leaf_box' style='width:3vh;height:2.5vh;background:${color};display:block;visibility:${show};border-radius:0% 75% 0% 75%;transform-origin:1.5px 50%;${side}'></div>`
	}

	document.body.appendChild(f)
}

function buildWorld() {
	flowers = 19
	for (var i = 0; i < 20; i++) {
		addFlower()
	}
}

buildWorld()

// window.addEventListener('click', function(){
//   document.body.innerHTML = '<h1>Vines</h1>'
//   buildWorld()
// })
