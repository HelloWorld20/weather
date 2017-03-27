<template>
	<div id="weather" class="container">
		<div class="row">
			<div class="col-md-4">
				<div class="todo mrm">
		            	<div class="todo-search">
		    				<input class="todo-search-field" type="search" value="" placeholder="Search" v-model="input" />
						</div>
						<ul>
		    				<li v-for="(city,index) in cityLists" :class="{ 'todo-done': activeList[index] }" :data-id="city.id" @click="toggleActive(index)">
						        <div class="todo-icon fui-man-24"></div>
						        <div class="todo-content">
		            				<h4 class="todo-name">
		            					{{city.countryZh}} - {{city.leaderZh}} - {{city.cityZh}}
		                    			<!-- Meet <strong>Adrian</strong> at <strong>6pm</strong> -->
		                  			</h4> 
		                  			{{city.lat}} {{city.lon}}
		        				</div>
		    				</li>
						</ul>
					</div>
			</div>
			<div class="col-md-8">
				<div id="weatherView" style="height: 400px; width: 100%"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<h4>{{basic.cnty}}-{{basic.city}}</h4>
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th>日期</th>
								<th>星期</th>
								<th>最高温度</th>
								<th>最低温度</th>
								<th>白天天气</th>
								<th>夜间天气</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in daily">
								<td>{{item.date}}</td>
								<td>{{item.week}}</td>
								<td>{{item.tmp.max}}</td>
								<td>{{item.tmp.min}}</td>
								<td>{{item.cond.txt_d}}</td>
								<td>{{item.cond.txt_n}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div id="hazeView" style="height:500px;width:100%;"></div>
			</div>
		</div>
	</div>
</template>

<script>
import {weather as api} from '../config/api.js'
import cityList from '../config/cityList.js'
import ingAndLat from '../config/lngAndLat.js'
import apiData from '../config/aqi-3-27.js'
import bus from '../assets/eventBus.js'
// import snow from '../../static/js/snowfall.jquery.min.js'

export default {
	data() {
		return {
			input: '',								//搜索框的model
			basic: {},								//返回数据的basic
			daily: [],								//返回数据的daily_forecase，
			maxTmp: [],								//三天时间的最高温度
			minTmp: [],								//三天时间的最低温度
			cityList: cityList,						//全局城市列表
			cityLists: cityList.slice(1518, 1522),	//展示部分的城市列表
			activeList: [true, false, false, false],//城市列表是否选中
			date: [],								//存储三天时间，用于填充echarts的option			
			weekList: {
				'Mon': '星期一',
				'Tue': '星期二',
				'Wed': '星期三',
				'Thu': '星期四',
				'Fri': '星期五',
				'Sat': '星期六',
				'Sun': '星期日'
				}	//星期列表
		}
	},
	methods: {
		toggleActive(index) {
			bus.$emit('loading', true);
			this.activeList = [false, false, false, false];
			this.$set(this.activeList, index, !this.activeList[index])
			this.$nextTick(function() {
				var selectedCity = document.querySelector('.todo-done')

				this.$http.get(api.url, {
					params: api.params(selectedCity.getAttribute('data-id'))
				}).then(res => {
					bus.$emit('loading', false);
					let data;
					try{
						data = res.body.HeWeather5[0]
					}catch(e) {
						console.warn(e)
					}
					if(data.status === "ok") {
						convert2Chart.call(this, data);
						showWeatherChart(this);
					}
				})

			})
		}
		// fullScreen() {
		// 	document.querySelector('#weatherView').webkitRequestFullScreen();
		// }
	},
	created() {
		bus.$emit('loading', true);
		//加载时，获取广州数据
		this.$http.get(api.default).then(function(res) {
			bus.$emit('loading', false);
			let data;
			try{
				data = res.body.HeWeather5[0]
			}catch(e) {
				console.warn(e)
			}
			if(data.status === "ok") {
				convert2Chart.call(this, data)
				showWeatherChart(this);
			}
		});

	},
	mounted() {
		showHazeChart();
		//页面装载，添加雪花效果。
		// $(document).snowfall({
		// 	image: './static/img/flake.png',
		// 	minSize: 10, 
		// 	maxSize:32
		// })

		let hazeView = document.getElementById("hazeView");
		
		hazeView.onclick = function(e) {
			var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
			if(fullscreenElement) {
				exitFullscreen()
			} else {
				launchFullscreen(hazeView)
			}

			setTimeout(function() {
		    	showHazeChart();
		    }, 20)
		    
		    console.log(fullscreenElement)
		}
		
	},
	watch: {
		input: function(val, oldVal) {
			this.activeList = [false, false, false, false];
			var filted = this.cityList.filter(function(v) {
				if(v.cityEn.indexOf(val) !== -1)
					return true
				else 
					return false
			})
			if(val === "") {
				this.cityLists = this.cityList.slice(1518, 1522)
				return;
			}

			if(filted.length === 0) {
				this.cityLists = this.cityList.slice(1518, 1522);
			} else {
				this.cityLists = filted.slice(0,4)
			}
		}
	}
}

function showWeatherChart(that){
	let weatherChart = echarts.init(document.querySelector('#weatherView'));
	let option = {
	    title : {
	        text: '未来一周气温变化',
	        // subtext: '纯属虚构'
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['最高气温','最低气温']
	    },
	    // toolbox: {
	    //     show : true,
	    //     feature : {
	    //         mark : {show: true},
	    //         dataView : {show: true, readOnly: false},
	    //         magicType : {show: true, type: ['line', 'bar']},
	    //         restore : {show: true},
	    //         saveAsImage : {show: true}
	    //     }
	    // },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            // data : ['周一','周二','周三','周四','周五','周六','周日']
	            data: that.date
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            // min: 'auto',
	            // max: 'auto',
	            scale: true,
	            axisLabel : {
	                formatter: '{value} °C'
	            }
	        }
	    ],
	    series : [
	        {
	            name:'最高气温',
	            type:'line',
	            // data: [11,11,15],
	            data: that.maxTmp,
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name:'最低气温',
	            type:'line',
	            // data: [4,6,11],
	            data: that.minTmp,
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name : '平均值'}
	                ]
	            }
	        }
	    ]
	};
	weatherChart.setOption(option)
}

function showHazeChart() {

	let hazeChart = echarts.init(document.querySelector('#hazeView'));

	let geoCoordMap = {};
	let apiMap = [];

	for(let i in ingAndLat) {
		let detail = ingAndLat[i];
		let tArr = [];

		tArr.push(detail.lng)
		tArr.push(detail.lat)

		geoCoordMap[i] = tArr;
	}

	for(let i in apiData) {
		let tObj = {}
		let current = apiData[i];
		
		try{
			tObj.name = current.city
			tObj.value = current.value.aqi
		} catch (e) {
			console.log('部分aqi参数为空')
		}

		apiMap.push(tObj)
	}

	var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var geoCoord = geoCoordMap[data[i].name];
	        if (geoCoord) {
	            res.push(geoCoord.concat(data[i].value));
	        }
	    }
	    return res;
	};

	let option = {
	    title: {
	        text: '全国主要城市空气质量',
	        left: 'center',
	        textStyle: {
	            color: '#fff'
	        }
	    },
	    backgroundColor: '#404a59',
	    visualMap: {
	        min: 0,
	        max: 500,
	        splitNumber: 5,
	        inRange: {
	            color: ['#d94e5d','#eac736','#50a3ba'].reverse()
	        },
	        textStyle: {
	            color: '#fff'
	        }
	    },
	    geo: {
	        map: 'china',
	        label: {
	            emphasis: {
	                show: false
	            }
	        },
	        roam: true,
	        itemStyle: {
	            normal: {
	                areaColor: '#323c48',
	                borderColor: '#111'
	            },
	            emphasis: {
	                areaColor: '#2a333d'
	            }
	        }
	    },
	    series: [{
	        name: 'AQI',
	        type: 'heatmap',
	        coordinateSystem: 'geo',
	        data: convertData(apiMap)
	    }]
	};
	hazeChart.setOption(option)
}

function convert2Chart(data) {
	let self = this;
	let daily = data.daily_forecast

	this.basic = data.basic

	this.date = [daily[0].date.slice(-2) + "号",daily[1].date.slice(-2) + "号",daily[2].date.slice(-2) + "号"]
	this.maxTmp = [parseInt(daily[0].tmp.max), parseInt(daily[1].tmp.max), parseInt(daily[2].tmp.max)];
	this.minTmp = [parseInt(daily[0].tmp.min), parseInt(daily[1].tmp.min), parseInt(daily[2].tmp.min)];

	let dailyWeek = [];
	daily.forEach(function(v, i) {
		let tDate = new Date(v.date).toString().slice(0,3);
		daily[i].week = self.weekList[tDate]
	})
	this.daily = daily
}

function launchFullscreen(element) {
  	if(element.requestFullscreen) {
    	element.requestFullscreen();
  	} else if(element.mozRequestFullScreen) {
    	element.mozRequestFullScreen();
  	} else if(element.msRequestFullscreen){
    	element.msRequestFullscreen();
  	} else if(element.webkitRequestFullscreen) {
    	element.webkitRequestFullScreen();
  	}
}

function exitFullscreen() {
  	if (document.exitFullscreen) {
    	document.exitFullscreen();
  	} else if (document.msExitFullscreen) {
    	document.msExitFullscreen();
  	} else if (document.mozCancelFullScreen) {
    	document.mozCancelFullScreen();
  	} else if (document.webkitExitFullscreen) {
    	document.webkitExitFullscreen();
  	}
}
//爬取空气质量node代码
// const fs = require('fs');
// const superagent = require('superagent');
// const cityList = require('./supportCityList.js');

// let url = 'http://route.showapi.com/104-29?city=';
// const params = '&showapi_appid=34207&showapi_sign=4b506e41578e4b31a556377023b49060'

// // var params = function() {
// //         return {
// //             city: '广州',
// //             showapi_appid: 34207,
// //             showapi_sign: "4b506e41578e4b31a556377023b49060"
// //         }
// //     }
// const len = cityList.length
// let i = 0;
// console.time('count')
// fetch(cityList[i], i < len);

// result = [];
// // fs.writeFile('./result.js', JSON.stringify(result), function() {

// // })
// function fetch(city, flag) {
// 	if(!flag) {
// 		fs.writeFile('./result.js', JSON.stringify(result))
// 		console.timeEnd('count')
// 		return;
// 	}
// 	superagent.get(url + encodeURI(city) + params)
// 		.end(function(err, res) {
// 			if(err) {
// 				throw new Error('Custom Error : ' + err)
// 				return;
// 			}
// 			// console.log(JSON.parse(res.text).showapi_res_body.pm)
// 			let pm = JSON.parse(res.text).showapi_res_body.pm;
// 			console.log(pm);
// 			var temp = {}
// 			temp['city'] = city;
// 			temp['value'] = pm
// 			result.push(temp);
// 			setTimeout(() => {
// 				fetch(cityList[i++], i < len)
// 			}, 1000)
// 		})
// }

// module.exports = {
	
// }


</script>

<style scoped>

</style>