<template>
	<div id="music" class="container">
		<div class="row">
			<div class="col-md-3">
				<form @submit.prevent="search" action="#">
					<div class="input-group">
				      	<input id="searchMusic" type="text" class="form-control" placeholder="Search for..." v-model="songVal" autocomplete="off">
				      	<span class="input-group-btn">
				        	<button @click.prevent="search" class="btn" type="button">
								<p class="glyphicon glyphicon-search"></p>
				        	</button>
				      	</span>
				    </div>
				</form>
				<div id="player" class="palette palette-night-dark">
					<span>正在播放：</span>
					<p id="songName" :title="songName">{{songName}}</p>
					<button id="pause" @click="swift" class="btn btn-default glyphicon" :class="songStatus"></button>
					<button id="change" @click="change" class="btn btn-default glyphicon glyphicon-stop"></button>
					<audio controls autoplay id="audio" style="display: none">
						<source :src='songSrc' id="source">
					</audio>
				</div>
				<button @click="getAmerica" :class="{'btn-active': isAmerica}" class="btn btn-inverse btn-block">欧美</button>
				<button @click="getMainland" :class="{'btn-active': isMainLand}" class="btn btn-inverse btn-block">内地</button>
				<button @click="getHongkong" :class="{'btn-active': isHongkong}" class="btn btn-inverse btn-block">港台</button>
				<button @click="getKorea" :class="{'btn-active': isKorea}" class="btn btn-inverse btn-block">韩国</button>
				<button @click="getJapan" :class="{'btn-active': isJapan}" class="btn btn-inverse btn-block">日本</button>
				<button @click="getBallad" :class="{'btn-active': isBallad}" class="btn btn-inverse btn-block">民谣</button>
				<button @click="getRock" :class="{'btn-active': isRock}" class="btn btn-inverse btn-block">摇滚</button>
				<button @click="getBestSeller" :class="{'btn-active': isBestSeller}" class="btn btn-inverse btn-block">销量</button>
				<button @click="getHot" :class="{'btn-active': isHot}" class="btn btn-inverse btn-block">热歌</button>
			</div>
			<div class="col-md-9">
				<div class="table">
					<table class="table">
						<thead>
							<tr>
								<th>封面</th>
								<th>歌名</th>
								<th>歌手</th>
								<th>时长</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="song in songList">
								<td>
									<a :href="song.url">
										<img :src="song.albumpic_small" alt="song.songname">
									</a>
								</td>
								<td>
									<div class="limit">
										<a href="javascript:;" @click="play(song.url, song.songname)">{{song.songname}}</a>
									</div>
								</td>
								<td>
									<div class="limit">
										{{song.singername}}
									</div>
								</td>
								<td>
									<div class="limit">
										{{song.min}}:{{song.sec}}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import {music as api} from "../config/api.js"
import bus from '../assets/eventBus.js'
export default {
	data() {
		return {
			songList: [],												//音乐列表
			activeItem: 'america',										//当前栏目
			songSrc: 'http://ws.stream.qqmusic.qq.com/200812326.m4a?fromtag=46',
			// http://ws.stream.qqmusic.qq.com/200221528.m4a?fromtag=46
			songStatus: 'glyphicon-play',								//播放器状态
			songStatusMap: {
				play: 'glyphicon-play',
				pause: 'glyphicon-pause',
				stop: 'glyphicon-stop'
			},
			songName: '---',											//当前音乐名称
			songVal: ''													//搜索框model
		}
	},
	methods: {
		getAmerica() {
			getData.call(this, api.america, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'america'
			})
		},
		getMainland() {
			getData.call(this, api.mainland, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'mainland'
			})
		},
		getHongkong() {
			getData.call(this, api.hongkong, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'hongkong'
			})
		},
		getKorea() {
			getData.call(this, api.korea, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'korea'
			})
		},
		getJapan() {
			getData.call(this, api.japan, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'japan'
			})
		},
		getBallad() {
			getData.call(this, api.ballad, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'ballad'
			})
		},
		getRock() {
			getData.call(this, api.rock, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'rock'
			})
		},
		getBestSeller() {
			getData.call(this, api.bestSeller, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'bestSeller'
			})
		},
		getHot() {
			getData.call(this, api.hot, list => {
				sec2Min(list);
				this.songList = list;
				this.activeItem = 'hot'
			})
		},
		change() {

		},
		search() {
			bus.$emit('loading', true);
			this.$http.get(api.search.url, {
				params: api.search.params(this.songVal)
			}).then(res => {
				bus.$emit('loading', false);
				if(res.body.showapi_res_code === 0) {
					let songList;
					try{
						songList = res.body.showapi_res_body.pagebean.contentlist.slice(0,10);
						sec2Min(songList);
						this.songList = songList;
						this.activeItem = 'search'
					} catch (e) {
						console.log(e)
					}
				} else {
					console.log('接口信息错误')
				}
			})
		},
		swift() {
			let audio = document.querySelector("#audio")
			if (audio.paused) {
				audio.play()
				this.songStatus = this.songStatusMap['play'];
			} else {
				audio.pause();
				this.songStatus = this.songStatusMap['pause'];
			}
		},
		play(url, name) {
			this.songName = name
		}
	},
	created() {
		getData.call(this, api.america, list => {
			sec2Min(list);
			this.songList = list;
			this.activeItem = 'america'
		})
	},
	computed:{
		isAmerica() {
			return this.activeItem === "america"
		},
		isMainLand() {
			return this.activeItem === "mainland"
		},
		isHongkong() {
			return this.activeItem === "hongkong"
		},
		isKorea() {
			return this.activeItem === "korea"
		},
		isJapan() {
			return this.activeItem === "japan"
		},
		isBallad() {
			return this.activeItem === "ballad"
		},
		isRock() {
			return this.activeItem === "rock"
		},
		isBestSeller() {
			return this.activeItem === "bestSeller"
		},
		isHot() {
			return this.activeItem === "hot"
		},
	}
}
function getData(district, handler) {
	bus.$emit('loading', true);
	this.$http.get(district.url, {
		params: district.params()
	}).then(res => {
		bus.$emit('loading', false);
		if(res.body.showapi_res_code === 0) {
			let songList;
			try{
				songList = res.body.showapi_res_body.pagebean.songlist.slice(0,10);
			} catch (e) {
				console.log(e)
			}
			handler(songList);
		} else {
			console.log('接口信息错误')
		}
	})
}

function sec2Min(list) {
	list.forEach(function(v, i) {
		if(!v.seconds) v.seconds = 0;
		list[i].min = parseInt(v.seconds / 60);
		list[i].sec = v.seconds % 60;
	})
}
</script>

<style scoped>
.table > tbody > tr > td{
	line-height: 107px;
	padding: 0;
}
.btn-active{
	color: #ffffff;
	background-color: #48c9b0;
	border-color: #48c9b0;
}
.limit{
	max-width: 300px;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
#player{
	margin: 10px auto;
}
#music{
	padding-bottom: 100px;
}
#songName{
	max-width: 100%;
	overflow: hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
#searchMusic{
	text-align: center;
}
</style>