<template>
<!-- 歌词https -->
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

				<div id="gallery">

					<button @click="getMusic('bestSeller')" :class="{'btn-active': isBestSeller}" class="btn btn-inverse btn-block">销量</button>
					<button @click="getMusic('hot')" :class="{'btn-active': isHot}" class="btn btn-inverse btn-block">热歌</button>
					<button @click="getMusic('america')" :class="{'btn-active': isAmerica}" class="btn btn-inverse btn-block">欧美</button>
					<button @click="getMusic('mainland')" :class="{'btn-active': isMainLand}" class="btn btn-inverse btn-block">内地</button>
					<button @click="getMusic('hongkong')" :class="{'btn-active': isHongkong}" class="btn btn-inverse btn-block">港台</button>
					<button @click="getMusic('korea')" :class="{'btn-active': isKorea}" class="btn btn-inverse btn-block">韩国</button>
					<button @click="getMusic('japan')" :class="{'btn-active': isJapan}" class="btn btn-inverse btn-block">日本</button>
					<button @click="getMusic('ballad')" :class="{'btn-active': isBallad}" class="btn btn-inverse btn-block">民谣</button>
					<button @click="getMusic('rock')" :class="{'btn-active': isRock}" class="btn btn-inverse btn-block">摇滚</button>
				</div>
				
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
									<a href="javascript:;" @click="play(song)">
										<img :src="http2S(song.albumpic_small)" :alt="song.songname">
									</a>
								</td>
								<td>
									<div class="limit">
										<a href="javascript:;" @click="play(song)">{{song.songname}}</a>
									</div>
								</td>
								<td>
									<div class="limit">
										{{song.singername}}
									</div>
								</td>
								<td>
									<div class="limit">
										{{song.timeFormated}}
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
import core from '../assets/core.js'
export default {
	data() {
		return {
			songList: [],													//音乐列表
			activeItem: 'bestSeller',										//当前栏目
			songVal: '',													//搜索框model
		}
	},
	methods: {
		getMusic(key) {
			getData.call(this, api[key], null, list => {
				list.forEach((v, i) => {
					list[i].timeFormated = core.sec2Min(v.seconds).formated
				})
				this.songList = list;
				this.activeItem = key;
			})
		},
		search() {
			core.fetch.call(this, api.search, this.songVal, res => {
				if(res.showapi_res_code === 0) {
					let songList;
					try{
						songList = res.showapi_res_body.pagebean.contentlist.slice(0,10);
						songList = searchData2SongList(songList);
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
		play(info) {
			let lyrics
			core.fetch.call(this, api.lyrics, info.albumid, res => {
				try{
					lyrics = res.showapi_res_body.lyric_txt;
				} catch (e) {
					console.warn('获取歌词失败')
				}

				bus.$emit('play', {
					info: info,
					lyrics: lyrics
				})
			})

		},
		http2S(url) {
			return url.replace('http://', 'https://')
		}
	},
	created() {
		this.getMusic('bestSeller');
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
function getData(key, id, handler) {
	// console.log(core.fetch)
	core.fetch.call(this, key, id, res => {
		if(res.showapi_res_code === 0) {
			let songList;
			try{
				songList = res.showapi_res_body.pagebean.songlist.slice(0,10);
			} catch (e) {
				console.log(e)
			}
			handler(songList);
		} else {
			console.log('接口信息错误')
		}
	})

}

//搜索结果的数据格式转换成播放列表model
function searchData2SongList(list) {
	list.forEach(function(v, i) {
		list[i].url = v.m4a;
		list[i].min = list[i].sec = '--'
	})
	return list;
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
	max-width: 100%;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
#player{
	margin: 10px auto;
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
#audio{
	width: 100%;
	margin: 10px auto 0 auto;
}
#gallery{
	margin: 10px 0;
}

.ui-slider-horizontal .ui-slider-handle {
  	top: -0.3em;
    margin-left: -0.6em;
}

</style>