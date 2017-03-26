<template>
	<div id="player" class="palette palette-night-dark" :class="{active: isActive}">
		<div class="container">
			<div class="row">
				<div class="col-md-5">
					<div class="song-info">
						<img :src="albumpic_small" :alt="songName">
						<div style="padding: 0 10px;">正在播放：</div>
						<div id="songName" :title="songName">{{songName}}</div>
					</div>
				</div>
				<div class="col-md-7">
					<div class="controller">	
						<button id="reload" @click="reload" class="btn btn-default glyphicon glyphicon-repeat"></button>
						<button id="swift" @click="swift" class="btn btn-default glyphicon" :class="songStatus"></button>
						<button id="stop" @click="stop" class="btn btn-default glyphicon glyphicon-stop"></button>
					</div>
					<div id="progressInfo">
						<div class="time fl">{{couterFront}}</div>
				        <div class="time fr">{{couterEnd}}</div>
						<div id="progressBar" class="ui-slider ui-slider-horizontal">
				          	<div class="ui-slider-range"></div>
				          	<a id="progressHandler" class="ui-slider-handle" href="javascript:;"></a>
				        </div>
					</div>
				</div>
			</div>

			<audio id="audio" :src="songSrc" loop controls style="display: none">
			<!-- <source :src='songSrc' id="source"> -->
			</audio>
		</div>
	</div>
</template>

<script>
import bus from '../../assets/eventBus.js'
export default {
	
	data() {
		return {
			songData: {},												//音乐包含的信息
			songSrc: 'http://ws.stream.qqmusic.qq.com/200812326.m4a?fromtag=46',
			// http://ws.stream.qqmusic.qq.com/200221528.m4a?fromtag=46
			songStatus: 'glyphicon-play',								//播放器状态
			songStatusMap: {
				play: 'glyphicon-play',
				pause: 'glyphicon-pause',
				stop: 'glyphicon-stop'
			},
			songName: '---',											//当前音乐名称
			isActive: true,
			albumpic_small: '../../../static/img/placeholder.png',
			audio: null,
			slider: null,
			processBarLocked: false,
			progress: 0,
			volume: 50,
			totleTime: 0,
			couterFront: '--:--',										//播放进度
			couterEnd: '--:--'											//音乐总时间
		}
	},
	methods: {
		reload() {
			if(this.audio.readyState !== 4) return;
			this.audio.load()
			this.audio.play()
			this.songStatus = this.songStatusMap['pause'];
		},
		stop() {
			if(this.audio.readyState !== 4) return;
			this.audio.load()
			this.audio.pause()
			this.songStatus = this.songStatusMap['play'];
		},
		swift() {
			if(this.audio.readyState !== 4) return;
			if (this.audio.paused) {
				this.audio.play()
				this.songStatus = this.songStatusMap['pause'];
			} else {
				this.audio.pause();
				this.songStatus = this.songStatusMap['play'];
			}
		},
	},
	created() {
		let self = this;
		bus.$on('play', function(receive) {
			self.songName = receive.songname;
			self.songSrc = receive.url;
			self.albumpic_small = receive.albumpic_small;
			self.totleTime = receive.seconds || 59*60+59;
			self.songData = receive;

			// console.log(self.audio.readyState)		//4
			//又不知道为什么，readyState已经等于4之后，直接play()没有播放。
			setTimeout(function() {
				self.audio.play();
			}, 20)
			self.songStatus = self.songStatusMap['pause'];

		})
	},
	watch: {

	},
	computed: {
		// couterFront() {
		// 	if(self.audio && self.audio.currentTime) {
		// 		return parseInt(self.audio.currentTime / 60) + '' + self.audio.currentTime % 60;
		// 	}
		// 		return '--:--'
		// },
		// couterEnd() {
		// 	if(this.totleTime === 0) {
		// 		return '--:--'
		// 	}
		// 	return parseInt(this.totleTime / 60) + '' + this.totleTime % 60;
		// }
	},
	mounted() {
		let self = this;
		this.audio = document.querySelector('#audio');
		//
		this.slider = $("#progressBar").slider({
	        slide: function(e, ui) {
	        	self.progress = ui.value
	        },
	        range: "min",
	    });

		$("#progressHandler").on('mouseup', function() {
			self.processBarLocked = false;
			self.audio.currentTime = parseInt(parseInt(self.progress * self.totleTime) / 100)
		}).on('mousedown', function() {
			self.processBarLocked = true;
		})

	    setInterval(function() {
	    	let totleTime = self.totleTime
	    	let currentTime = self.audio.currentTime
	    	setProcessBar.call(self, parseInt(currentTime * 100 / totleTime))
	    	self.couterFront = sec2MinStr(currentTime)
	    	self.couterEnd = sec2MinStr(totleTime)
	    }, 500)

	}

}
function setProcessBar(value) {
	if(this.processBarLocked) return;
	this.slider.slider('value', value)
}
function sec2MinStr(val) {
	if(!val || val === 0) return '--:--'
	return parseInt(val / 60) + ':' + parseInt(val % 60);
	// return {
	// 	sec: val.seconds % 60,
	// 	min: parseInt(val.seconds / 60)
	// }
}

</script>

<style scoped>
#player{
	position: fixed;
	bottom: -80px;
	width: 100%;
	padding: 0;
}
#songName{
	max-width: 275px;
	overflow: hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.controller{
	margin: 10px 0;
}
#progressBar{
	margin: 10px 0;
	width: 80%;
	margin-left: 10%;
}
#player.active{
	bottom: 0;
}
.song-info * {
	float: left;
	line-height: 90px;
	max-height: 90px;
}
.time{
	width: 10%;
	margin-top: -2px;
}
</style>