import moment from "moment";
// 年月日
export const shortTime = function (value) {
  return moment(value).format("YYYY-MM-DD");
};

// 年月日-时分秒
export const time = function (value) {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
};

// 年月
export const monthTime = function (value) {
  return moment(value).format("YYYY-MM");
};

// 年
export const yearTime = function (value) {
  return moment(value).format("YYYY");
};

// 月
export const getMonth = function (value) {
  return moment(value).format("MM");
};

// 时分秒
export const secondsTime = function (value) {
  return moment(value).format("HH:mm:ss");
};

//获取当前日期的周六
export const saturdayTime = function (value) {
  return moment(value).endOf("week").format("YYYY-MM-DD");
};

//获取当前日期的周日
export const sundayTime = function (value) {
  return moment(value).day(7).format("YYYY-MM-DD");
};

//计算日期之间的天数
export const DateDiff = function (sDate1, sDate2) {
  var aDate, oDate1, oDate2, iDays;
  aDate = sDate1.split("-");
  oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为02-05-2018格式
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) + 1; //把相差的毫秒数转换为天数
  return iDays;
};

/**  addDate: 获取几天之后的时间
 *  date：起始时间对象
 *  days: Number 当前时间'2019/12/24',传入6,则返回'2019/12/30'
 *  key => years: 'y'   quarters: 'Q'   months: 'M'   weeks: 'w'    days: 'd'  hours: 'h'
 *
 */
export const addDate = function (
  date,
  days,
  key = "d",
  forchart = "YYYY-MM-DD"
) {
  return moment(date).add(days, key).format(forchart);
};

/** 通过减去时间来改变原始的 moment */
export const subDate = function (
  date,
  days,
  key = "d",
  forchart = "YYYY-MM-DD"
) {
  return moment(date).subtract(days, key).format(forchart);
};

export const diffDate = function (start, end = new Date()) {
  let b = moment(end);
  let y = b.diff(start, "y");
  let m = b.diff(start, "M");
  let d = b.diff(start, "d");
  return { y, m, d };
};

export const yersMonth = function () {
  var dataArr = [];
  var data = new Date();
  var year = data.getFullYear();
  data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
  for (var i = 0; i < 12; i++) {
    data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
    var m = data.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    dataArr.push(data.getFullYear() + "-" + m);
  }
  console.log(dataArr);
  return dataArr;
};

// 自定义列方法(百位补零)
export const indexMethod = (index) => {
  let cur = index + 1
  switch (true) {
      case (cur > 0 && cur < 10): return '00' + cur
      case (cur >= 10 && cur <= 99): return '0' + cur
      default: return cur
  }
}
