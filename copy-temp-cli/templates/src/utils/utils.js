import Store from "../store/index.js";
import { getDepartmentList } from "../api/aas.js";

export function arrToSelectArr(arr, labelName, valueName) {
  let result = [];
  arr.forEach((item) => {
    result.push({
      value: item[valueName],
      label: item[labelName],
    });
  });
  return result;
}

export function tableDel({
  renderData = [], //用于渲染的tableData
  submitData = [], //用于提交的tableData
  rowData = {}, //删除行数据
  idName, //当前点击行比对标识名称
  rowIndex = 0, //当前点击行的
}) {
  const currentIndex = submitData.findIndex(function (item) {
    return item[idName] == rowData[idName];
  });
  if (rowData[idName]) {
    //如果是编辑, 修改数据del为true
    submitData[currentIndex].delFlag = 1;
  } else {
    //如果是新增, 直接从数组中删除
    submitData.splice(currentIndex, 1);
  }
  renderData.splice(rowIndex, 1);
}

export function timeFormatter(row, column, cellValue, index) {
  return cellValue ? cellValue.split(" ")[0] : "--";
}

// 树数组转扁平数组
export function treeToArray(tree) {
  var res = [];
  for (const item of tree) {
    const { children, ...i } = item;
    if (children && children.length) {
      res = res.concat(treeToArray(children));
    }
    res.push(i);
  }
  return res;
}
//标单重置
export function resetFormData(form) {
  let fromData = JSON.parse(JSON.stringify(form));
  Object.keys(fromData).forEach((key) => {
    let types = typeof fromData[key];
    if (types == Array) {
      fromData[key] = [];
    } else if (types == Boolean) {
      fromData[key] = null;
    } else if (types == String) {
      fromData[key] = {};
    } else {
      fromData[key] = "";
    }
  });
  return fromData;
}
//金额 千分位加逗号保留两位小数
export function amountFormat(num) {
  var numArr = Number(num).toFixed(2).split(".");
  num = numArr[0];
  var result = "";
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  result = result + "." + numArr[1];
  return result;
}
// 数字金额转化成人民币的中文
function toDx(n) {
  //阿拉伯数字转换函数
  switch (n) {
    case "0":
      return "零";
    case "1":
      return "壹";
    case "2":
      return "贰";
    case "3":
      return "叁";
    case "4":
      return "肆";
    case "5":
      return "伍";
    case "6":
      return "陆";
    case "7":
      return "柒";
    case "8":
      return "捌";
    case "9":
      return "玖";
  }
}
// 转换算法主函数
export function numberToChinese(m) {
  m *= 100;
  m += "";
  var length = m.length;
  let unit = new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分");
  var result = "";
  for (var i = 0; i < length; i++) {
    if (i == 2) {
      result = "元" + result;
    } else if (i == 6) {
      result = "万" + result;
    }
    if (m.charAt(length - i - 1) == 0) {
      if (i != 0 && i != 1) {
        if (
          result.charAt(0) != "零" &&
          result.charAt(0) != "元" &&
          result.charAt(0) != "万"
        ) {
          result = "零" + result;
        }
      }
      continue;
    }
    result =
      this.toDx(m.charAt(length - i - 1)) +
      unit[this.unit.length - i - 1] +
      result;
  }
  result += result.charAt(result.length - 1) == "元" ? "整" : "";
  this.text = result;
}
