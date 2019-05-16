<template lang="pug">
	section.content#chat-room       
		div.normal.from-them
			.icon
			p Hey!
			span.time

		//- div.normal.from-them
		//- 	.icon
		//- 	p 大家大家
		//- 	span.time

		//- div.normal.from-me.sticker
		//- 	img(src="/dog.png" style="width: 150px")
		//- 	span.time


</template>

<script>
export default {
	mounted(){
		// this.add(true, "qwe", false)
	},
	methods: {
		test: function(){
			console.log("child olg");
		},
		add: function(isfrom_me, text, issticker, sticker_path = ""){
			let chat = document.getElementById("chat-room")
			var div = document.createElement("DIV");
			var p = document.createElement("P")
			var icon = document.createElement("DIV")
			var img = document.createElement("IMG")
			var time = document.createElement("SPAN")

			//set
			icon.classList.add("icon")
			p.innerText = text;
			img.style.width = "150px";
			img.setAttribute("src", "/sticker/" + sticker_path + ".png")
			time.classList.add("time")

			div.classList.add("normal")
			if(isfrom_me){
				div.classList.add("from-me");
			} else {
				div.classList.add("from-them");
				div.appendChild(icon);
			}

			if(issticker){
				div.classList.add("sticker")
				div.appendChild(img)
			} else {
				div.appendChild(p)
			}

			div.appendChild(time)

			chat.appendChild(div)
		}
	}
}
</script>


<style>

.from-me > .time:after{
	content:"94:38 下午";
	position: absolute;
	left: -85px;
	bottom: 0px;
	font-size: 1rem;
	font-weight: bold;	
}

.from-them > .time:after{
	content:"04:38 下午";
	position: absolute;
	right: -85px;
	bottom: 0px;
	font-size: 1rem;
	color: white;
	font-weight: bold;	
}


.content {
	font-family: "Helvetica Neue";
	font-size: 20px;
	font-weight: normal;
	margin-top: 10px;
	width: 100%;
	display: flex;
  flex-direction: column;
	padding: 10px 10px 10px 10px;
}

.icon {
	width: 50px;
	height: 50px;
	position: absolute;
	border-radius: 25px;
	left: -63px;
	top: -8px;
	background-image: url(/dog.png);
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	background-color: rgb(233, 233, 233);
}

.normal {
	max-width: 230px;
	min-width: 48px;
	min-height: 44px;
	align-self: flex-start;
  margin-bottom: 50px;
  line-height: 24px;
  position:relative;
	padding:10px 20px;
  border-radius:25px;
	text-align: left;
}

.normal:before, .normal:after {
    content:"";
		position:absolute;
    top:-2px;
    height:20px;
  }

.from-me {
	color:white; 
	background:#0B93F6;
	align-self: flex-end;
}

.from-me:before {
		right:-9px;
    background: yellow;
		border-right:19px solid #0B93F6;
		border-bottom-right-radius: 16px 14px;
		-webkit-transform:translate(0, -2px);
		transform:translate(0, -2px);
	}

.from-me:after {
		top:-6px;
    right: -42px;
		width:22px;
    height: 12px;
    background:#6FA1C7;
		border-bottom-right-radius: 16px ;
		-webkit-transform:translate(-30px, -2px);
		transform:translate(-30px, -2px);
	}

.from-them {
	margin-left: 65px;
	background:white;
	color:black;
}
.from-them:before {
		left:-9px;
		border-left:19px solid white;
		border-bottom-left-radius: 16px 14px;
		-webkit-transform:translate(0, -2px);
		        transform:translate(0, -2px);
	}
.from-them:after {
    top: -6px;
		left: 18px;
		width: 22px;
    height: 12px;
		background:#6FA1C7;
		border-bottom-left-radius: 10px;
		-webkit-transform:translate(-30px, -2px);
		transform:translate(-30px, -2px);
	}
.sticker {
	background: none;
}
.sticker:before{
	border: none;
}


.sticker img{
	margin-left: -30px;
	margin-top: -15px;
}

</style>