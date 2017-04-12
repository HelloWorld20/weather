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
        url: 'https://route.showapi.com/104-41',
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
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 3,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    mainland: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 5,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    hongkong: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 6,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    korea: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 16,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    japan: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 17,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    ballad: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 18,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    rock: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 19,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    bestSeller: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 23,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    hot: {
        url: 'https://route.showapi.com/213-4?showapi_appid=34207',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 26,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    search: {
        url: 'https://route.showapi.com/213-1?showapi_appid=34207',
        params: (key) => {
            return {
                keyword: key,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
            }
        },
    },
    lyrics: {
        url: 'https://route.showapi.com/213-2',
        params: (id) => {
            return {
                showapi_appid: 34207,
                showapi_sign: '4b506e41578e4b31a556377023b49060',
                musicid: id
            }
        }
    }

}