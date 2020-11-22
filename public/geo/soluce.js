map = document.getElementById("map");
mapSVG = document.getElementById("mapG");
baseMap = mapSVG.innerHTML;
mousedown = false;

_SVG = map.getElementsByTagName("svg")[0];
VB = _SVG.getAttribute('viewBox').split(' ').map(v=>parseFloat(v));
center = [(VB[0]+VB[2])/2,(VB[1]+VB[3])/2];
minWidth = VB[0], maxWidth = VB[2], width = VB[2];
minHeigth = VB[1], maxHeigth = VB[3], heigth = VB[3];

map.addEventListener('wheel',wheel);


map.addEventListener('mousedown',e=>{
	mousedown = true;
	startx=e.clientX;
	starty=e.clientY;
});
map.addEventListener('mousemove',e=>{
	if(mousedown){
		if(VB[0] + (startx - e.clientX)>=minWidth && VB[0] + VB[2] + (startx - e.clientX)<=maxWidth){
			center[0]+=(startx - e.clientX)*(width/maxWidth);
		}
		if(VB[1] + (starty - e.clientY) >=minHeigth && VB[1] + VB[3] +(starty - e.clientY) <=maxHeigth){
			center[1]+=(starty - e.clientY)*(heigth/maxHeigth);
		}
		startx = e.clientX;
		starty = e.clientY;
		VB=[center[0]-width/2,center[1]-heigth/2,width,heigth]
		_SVG.setAttribute('viewBox', VB.join(' '))
	}
});
map.addEventListener('mouseup',e=>{mousedown = false});

function wheel(e){
	if(e.wheelDelta>0){
		if(width>maxWidth/7 && heigth>maxHeigth/7){
			center = [(e.clientX-this.offsetLeft)*(width/maxWidth) + VB[0],(e.clientY-this.offsetTop)*(heigth/maxHeigth)+VB[1]];
			width -= maxWidth/10;
			heigth -= maxHeigth/10;
		}
	}else if(width<maxWidth && heigth<maxHeigth){
		width += maxWidth/10;
		heigth += maxHeigth/10;
	}
	VB=[center[0]-width/2,center[1]-heigth/2,width,heigth]
	if(VB[0]<minWidth)center[0] = minWidth+width/2;
	if(VB[1]<minHeigth)center[1]=minHeigth+heigth/2;
	if(VB[0]+width>maxWidth)center[0]=maxWidth-width/2;
	if(VB[1]+heigth>maxHeigth)center[1]=maxHeigth-heigth/2;
	VB=[center[0]-width/2,center[1]-heigth/2,width,heigth]
	_SVG.setAttribute('viewBox', VB.join(' '));
}