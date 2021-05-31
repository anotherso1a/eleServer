// 配置文件
module.exports = {
  urls: [ // 需要截图的地址
    {
      link: 'https://live.kuaishou.com/cate/SYXX/22431',
      name: "军棋"
    },  // 军旗
    {
      link: 'https://live.kuaishou.com/cate/SYXX/22429',
      name: "斗地主"
    },  // 斗地主
    {
      link: 'https://live.kuaishou.com/cate/SYXX/22430',
      name: "麻将"
    },  // 麻将
  ],
  wait: 2000, // 等待网页访问后多久截屏，单位毫秒(1s = 1000ms)
  time: 20 // 每次截屏的时间间隔，单位分钟
}