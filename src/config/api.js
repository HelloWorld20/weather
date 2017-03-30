export const weather = {
    //和风天气
	key: "60317f77a63c432a872bbacbbed9e204",
	default: 'https://free-api.heweather.com/v5/forecast?city=guangzhou&key=60317f77a63c432a872bbacbbed9e204',
    forecast: {
        url: 'https://free-api.heweather.com/v5/forecast',
        params: (id) => {
            return {
                city: id,
                key: '60317f77a63c432a872bbacbbed9e204'
            }
        }
    },
    //易源数据
    haze: {
        url: 'https://route.showapi.com/104-29',
        params: () => {
            return {
                showapi_appid: 34207,
                showapi_sign: "4b506e41578e4b31a556377023b49060"
            }
        }
    },
    hazeRank: {
        url: 'http://route.showapi.com/104-41',
        params: () => {
            return {
                city: '广州',
                showapi_appid: 34207,
                showapi_sign: "4b506e41578e4b31a556377023b49060"
            }
        }
    }
};
export const music = {
    america: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 3,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    mainland: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 5,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    hongkong: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 6,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    korea: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 16,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    japan: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 17,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    ballad: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 18,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    rock: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 19,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    bestSeller: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 23,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    hot: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 26,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    search: {
        url: 'https://route.showapi.com/213-1?showapi_appid=31967',
        params: (key) => {
            return {
                keyword: key,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    lyrics: {
        url: 'http://route.showapi.com/213-2',
        params: (id) => {
            return {
                showapi_appid: 31967,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
                musicid: id
            }
        }
    }

}