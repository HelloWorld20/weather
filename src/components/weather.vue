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
				<div id="main" style="height: 400px; width: 100%" @click="fullScreen"></div>
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
								<th>最高温度</th>
								<th>最低温度</th>
								<th>白天天气</th>
								<th>夜间天气</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in daily">
								<td>{{item.date}}</td>
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
	</div>
</template>

<script>
import Vue from 'vue'
import api from '../config/api.js'
import cityList from '../config/cityList.js'
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
			date: []								//存储三天时间，用于填充echarts的option			
		}
	},
	methods: {
		toggleActive(index) {
			this.activeList = [false, false, false, false];
			this.$set(this.activeList, index, !this.activeList[index])
			this.$nextTick(function() {
				var selectedCity = document.querySelector('.todo-done')

				this.$http.get(api.forcast + "?key=" + api.key + "&city=" + selectedCity.getAttribute('data-id')).then(res => {
					let data;
					try{
						data = res.body.HeWeather5[0]
					}catch(e) {
						console.warn(e)
					}
					if(data.status === "ok") {
						convert2Chart(this, data);
						showChart(this);
					}
				})

			})
		},
		fullScreen() {
			document.querySelector('#main').webkitRequestFullScreen();
		}
	},
	created() {
		//加载时，获取广州数据
		this.$http.get(api.guangzhou).then(function(res) {
			let data;
			try{
				data = res.body.HeWeather5[0]
			}catch(e) {
				console.warn(e)
			}
			if(data.status === "ok") {
				convert2Chart(this, data);
				showChart(this);
			}
		});
		//页面装载，添加雪花效果。
		// $(document).snowfall({
		// 	image: './static/img/flake.png',
		// 	minSize: 10, 
		// 	maxSize:32
		// })
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

function showChart(that){
	let myChart = echarts.init(document.querySelector('#main'));
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
	myChart.setOption(option)
}

function convert2Chart(that, data) {
	let daily = data.daily_forecast

	that.basic = data.basic

	that.daily = daily
	that.date = [daily[0].date.slice(-2) + "号",daily[1].date.slice(-2) + "号",daily[2].date.slice(-2) + "号"]
	that.maxTmp = [parseInt(daily[0].tmp.max), parseInt(daily[1].tmp.max), parseInt(daily[2].tmp.max)];
	that.minTmp = [parseInt(daily[0].tmp.min), parseInt(daily[1].tmp.min), parseInt(daily[2].tmp.min)];

}

</script>

<style scoped>
	th{
		text-align: center
	}
</style>