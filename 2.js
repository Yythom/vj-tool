// 计算每月定投后的总资产
function calculateTotalAsset(monthlyInvestment, months, annualInterestRate) {
  // 将年利率转换为月利率
  const monthlyInterestRate = annualInterestRate / 12 / 100

  // 使用复利公式计算总资产
  // 公式: FV = PMT * ((1 + r)^n - 1) / r * (1 + r)
  // 其中:
  // FV = 未来价值(总资产)
  // PMT = 每期投入金额(月投资)
  // r = 利率(月利率)
  // n = 期数(月数)

  const totalAsset =
    monthlyInvestment *
    ((Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate) *
    (1 + monthlyInterestRate)

  return totalAsset
}

// 参数设置
const monthlyInvestment = 2600 // 每月投入2.55万
const months = 360 // 60个月
const annualInterestRate = 2.8 // 年利率2.8%

// 计算结果
const totalAsset = calculateTotalAsset(
  monthlyInvestment,
  months,
  annualInterestRate,
)
// 列出每个月的资产情况
console.log('\n每月资产情况:')
console.log('月份\t本金累计(元)\t利息累计(元)\t总资产(元)')

let monthlyAsset = 0
let totalInterest = 0

for (let month = 1; month <= months; month++) {
  // 计算当前月份的资产
  const currentAsset = calculateTotalAsset(
    monthlyInvestment,
    month,
    annualInterestRate,
  )

  // 计算本金累计
  const principal = monthlyInvestment * month

  // 计算利息累计
  const interest = currentAsset - principal

  // 输出当前月份的资产情况
  console.log(
    `${month}\t${principal.toFixed(2)}\t${interest.toFixed(2)}\t${currentAsset.toFixed(2)}`,
  )
}

// 输出结果
console.log(
  `每月投入${monthlyInvestment}元，年利率${annualInterestRate}%，${months}个月后的总资产为：${totalAsset.toFixed(2)}元`,
)
console.log(`其中本金为：${(monthlyInvestment * months).toFixed(2)}元`)
console.log(
  `利息收益为：${(totalAsset - monthlyInvestment * months).toFixed(2)}元`,
)
