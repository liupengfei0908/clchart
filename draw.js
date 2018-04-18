'use strict'
/* globals ClChart, getMockData, ListMenus */
// 开始画图
const canvas = document.getElementById('myChart')
const ctx = canvas.getContext('2d')
const syscfg = {
  canvas,
  scale: window.devicePixelRatio,
  context: ctx
}
const Chart = ClChart.createSingleChart(syscfg)
// 画分钟线
function handleMin (code) {
  console.log('Draw ====> Min Line')
  // 清除画布，及数据
  Chart.clear()
  // 初始化数据
  Chart.initData(20180413, ClChart.DEF_DATA.STOCK_TRADETIME)
  // 设置相应的数据
  Chart.setData('INFO', ClChart.DEF_DATA.FIELD_INFO, getMockData(code, 'INFO'))
  Chart.setData('MIN', ClChart.DEF_DATA.FIELD_MIN, getMockData(code, 'MIN'))
  Chart.setData('TICK', ClChart.DEF_DATA.FIELD_TICK, getMockData(code, 'TICK'))
  Chart.setData('NOW', ClChart.DEF_DATA.FIELD_NOW, getMockData(code, 'NOW'))
  // 设置画布尺寸
  let mainHeight = canvas.height * 2 / 3
  let mainWidth = canvas.width * 3 / 4
  if (code === 'SH000001') mainWidth = canvas.width
  // 设置画布区域布局
  const mainLayoutCfg = {
    layout: ClChart.DEF_CHART.CHART_LAYOUT,
    config: ClChart.DEF_CHART.CHART_NOW,
    rectMain: {
      left: 0,
      top: 0,
      width: mainWidth,
      height: mainHeight
    }
  }
  const mainChart = Chart.createChart('MIN', 'CHART.LINE', mainLayoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(mainChart, 'MIN')

  const volumeLoyoutCfg = {
    layout: ClChart.DEF_CHART.CHART_LAYOUT,
    config: ClChart.DEF_CHART.CHART_NOWVOL,
    rectMain: {
      left: 0,
      top: mainHeight,
      width: mainWidth,
      height: canvas.height - mainHeight
    }
  }
  const volumeChart = Chart.createChart('MINNOW', 'CHART.LINE', volumeLoyoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(volumeChart, 'MIN')

  if (code !== 'SH000001') {
    const orderLayoutCfg = {
      layout: ClChart.DEF_CHART.CHART_LAYOUT,
      config: ClChart.DEF_CHART.CHART_ORDER,
      rectMain: {
        left: mainWidth,
        top: 0,
        width: canvas.width - mainWidth,
        height: canvas.height
      }
    }
    const orderChart = Chart.createChart('ORDER', 'CHART.ORDER', orderLayoutCfg, function (result) {
      //  console.log(result)
    })
    // ??? 为什么可以不绑定数据
    // Chart.bindData(orderChart, 'TICK')
  }

  Chart.onPaint()
}
// 画五日线
function handleFiveDay (code) {
  console.log('Five Day Line')
  Chart.clear()
  Chart.initData(20180413, ClChart.DEF_DATA.STOCK_TRADETIME)
  Chart.setData('INFO', ClChart.DEF_DATA.FIELD_INFO, getMockData(code, 'INFO'))
  Chart.setData('DAY5', ClChart.DEF_DATA.FIELD_DAY5, getMockData(code, 'DAY5'))
  Chart.setData('MIN', ClChart.DEF_DATA.FIELD_MIN, getMockData(code, 'MIN'))
  const mainHeight = canvas.height * 2 / 3
  const mainLayoutCfg = {
    layout: ClChart.DEF_CHART.CHART_LAYOUT,
    config: ClChart.DEF_CHART.CHART_DAY5,
    rectMain: {
      left: 0,
      top: 0,
      width: canvas.width,
      height: mainHeight
    }
  }
  const KBarChart = Chart.createChart('DAY5', 'CHART.LINE', mainLayoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(KBarChart, 'DAY5')

  const volumeLoyoutCfg = {
    layout: ClChart.DEF_CHART.CHART_LAYOUT,
    config: ClChart.DEF_CHART.CHART_DAY5VOL,
    rectMain: {
      left: 0,
      top: mainHeight,
      width: canvas.width,
      height: canvas.height - mainHeight
    }
  }
  const KVBarChart = Chart.createChart('VLINE5', 'CHART.LINE', volumeLoyoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(KVBarChart, 'DAY5')

  Chart.onPaint()
}
// 画日线
function handleKline (fullCode, peroid) {
  let source = peroid
  if (peroid === 'WEEK' || peroid === 'MON') source = 'DAY'
  Chart.clear()
  Chart.initData(20180413, ClChart.DEF_DATA.STOCK_TRADETIME)
  Chart.setData('INFO', ClChart.DEF_DATA.FIELD_INFO, getMockData('SZ300545', 'INFO'))
  Chart.setData('RIGHT', ClChart.DEF_DATA.FIELD_RIGHT, getMockData('SZ300545', 'RIGHT'))
  Chart.setData(source, ClChart.DEF_DATA.FIELD_DAY, getMockData('SZ300545', source))
  const mainHeight = canvas.height * 2 / 3
  const mainLayoutCfg = {
    layout: {
      offset: {
        left: 5,
        right: 50
      }
    },
    buttons: ClChart.DEF_CHART.CHART_BUTTONS,
    config: ClChart.DEF_CHART.CHART_KBAR,
    rectMain: {
      left: 0,
      top: 0,
      width: canvas.width,
      height: mainHeight
    }
  }
  const KBarChart = Chart.createChart('KBAR', 'CHART.LINE', mainLayoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(KBarChart, peroid)

  const volumeLoyoutCfg = {
    layout: {
      offset: {
        left: 5,
        right: 50
      }
    },
    config: ClChart.DEF_CHART.CHART_VBAR,
    rectMain: {
      left: 0,
      top: mainHeight,
      width: canvas.width,
      height: canvas.height - mainHeight
    }
  }
  const KVBarChart = Chart.createChart('VBAR', 'CHART.LINE', volumeLoyoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(KVBarChart, peroid)

  Chart.onPaint()
}
function handleSeer () {
  Chart.clear()
  Chart.initData(20180413, ClChart.DEF_DATA.STOCK_TRADETIME)
  Chart.setData('INFO', ClChart.DEF_DATA.FIELD_INFO, getMockData('SZ300545', 'INFO'))
  Chart.setData('RIGHT', ClChart.DEF_DATA.FIELD_RIGHT, getMockData('SZ300545', 'RIGHT'))
  Chart.setData('DAY', ClChart.DEF_DATA.FIELD_DAY, getMockData('SZ300545', 'DAY'))
  Chart.setData('SEER', ClChart.PLUGINS.FIELD_SEER, getMockData('SZ300545', 'SEER'))
  Chart.setData('SEERHOT', {}, ['17'])
  const mainHeight = canvas.height * 2 / 3
  const mainLayoutCfg = {
    layout: {
      offset: {
        left: 5,
        right: 100,
        top: 20,
        bottom: 20
      }
    },
    buttons: [ { key: 'zoomin' }, { key: 'zoomout' } ],
    config: ClChart.PLUGINS.CHART_SEER,
    rectMain: {
      left: 0,
      top: 0,
      width: canvas.width,
      height: mainHeight
    }
  }
  const KBarChart = Chart.createChart('SEER', 'CHART.LINE', mainLayoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(KBarChart, 'DAY')

  const volumeLayoutCfg = {
    layout: {
      offset: {
        left: 5,
        right: 50
      }
    },
    config: ClChart.DEF_CHART.CHART_VBAR,
    rectMain: {
      left: 0,
      top: mainHeight,
      width: canvas.width,
      height: canvas.height - mainHeight
    }
  }
  const KVBarChart = Chart.createChart('VBAR', 'CHART.LINE', volumeLayoutCfg, function (result) {
    //  console.log(result)
  })
  Chart.bindData(KVBarChart, 'DAY')

  Chart.onPaint()
}

const menuTypes = {
  MIN: handleMin,
  DAY5: handleFiveDay,
  DAY: handleKline,
  WEEK: handleKline,
  MON: handleKline,
  M5: handleKline,
  SEER: handleSeer
}

// 画图
function drawChart (data) {
  data = data || {}
  const drawFunc = menuTypes[data.type]
  if (typeof drawFunc === 'function') {
    drawFunc(data.fc, data.type)
  }
}

const typeMenusCfg = [
  { type: 'MIN', fc: 'SH000001', label: '分时(指数)' },
  { type: 'DAY5', fc: 'SH000001', label: '五日(指数)' },
  { type: 'MIN', fc: 'SZ300545', label: '分时' },
  { type: 'DAY5', fc: 'SZ300545', label: '五日' },
  { type: 'DAY', fc: 'SZ300545', label: '日K' },
  { type: 'WEEK', fc: 'SZ300545', label: '周线' },
  { type: 'MON', fc: 'SZ300545', label: '月线' },
  { type: 'M5', fc: 'SZ300545', label: '5分钟' },
  { type: 'SEER', fc: 'SZ300545', label: '预测' }
]
const langMenusCfg = [
  { type: 'zh', label: '中文' },
  { type: 'en', label: 'English' }
]
let drawMenus
let langMenus
window.onload = function () {
  drawChart(typeMenusCfg[0])
  drawMenus = new ListMenus('drawMenu', typeMenusCfg)
  drawMenus.createMenus(function (activeData) {
    drawChart(activeData)
  })
  langMenus = new ListMenus('langMenu', langMenusCfg)
  langMenus.createMenus(function (activeData) {
    console.log(activeData)
  })
}
window.onresize = function () {
  canvas.width = canvas.clientWidth * window.devicePixelRatio
  canvas.height = canvas.clientHeight * window.devicePixelRatio
  drawChart(drawMenus.active)
}