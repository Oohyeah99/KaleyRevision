export interface MathTerm {
  en: string
  zh: string
}

export interface MathCategory {
  title: string
  terms: MathTerm[]
}

export const mathCategories: MathCategory[] = [
  {
    title: "Geometry & Shapes (几何与图形)",
    terms: [
      { en: "Radius", zh: "半径" },
      { en: "Diameter", zh: "直径" },
      { en: "Circumference", zh: "圆周 / 周长" },
      { en: "Perimeter", zh: "周长" },
      { en: "Area", zh: "面积" },
      { en: "Volume", zh: "体积" },
      { en: "Angle", zh: "角" },
      { en: "Interior angle", zh: "内角" },
      { en: "Curved", zh: "弯曲的 / 曲线的" },
      { en: "Vertical", zh: "垂直的 / 竖直的" },
      { en: "Horizontal", zh: "水平的" },
      { en: "Parallel", zh: "平行" },
      { en: "Perpendicular", zh: "垂直" },
      { en: "Intersect", zh: "相交" },
      { en: "Polygon", zh: "多边形" },
      { en: "Regular (e.g. Regular Polygon)", zh: "正(如:正多边形)/ 规则的" },
      { en: "Sphere", zh: "球体" },
      { en: "Cylinder", zh: "圆柱体" },
      { en: "Pyramid", zh: "棱锥 / 金字塔形" },
      { en: "Sloping edge", zh: "斜边" },
      { en: "Cross-sectional", zh: "横截面的" },
      { en: "Vertex / Vertices", zh: "顶点" },
    ]
  },
  {
    title: "Numbers & Arithmetic (数字与算术)",
    terms: [
      { en: "Integer", zh: "整数" },
      { en: "Fraction", zh: "分数" },
      { en: "Decimal", zh: "小数" },
      { en: "Even / Odd", zh: "偶数 / 奇数" },
      { en: "Prime Number", zh: "质数 / 素数" },
      { en: "Factor", zh: "因数 / 因子" },
      { en: "Square root", zh: "平方根" },
      { en: "Calculate", zh: "计算" },
      { en: "Multiplies", zh: "乘" },
      { en: "Sum", zh: "和" },
      { en: "Product", zh: "积" },
      { en: "Quotient", zh: "商" },
      { en: "Difference", zh: "差" },
      { en: "Value", zh: "数值" },
    ]
  },
  {
    title: "Algebra & Data (代数与数据)",
    terms: [
      { en: "Simultaneous equations", zh: "联立方程组" },
      { en: "Inequality", zh: "不等式" },
      { en: "Formula", zh: "公式" },
      { en: "Coordinate", zh: "坐标" },
      { en: "Graph / Diagram", zh: "坐标图 / 图表" },
      { en: "Average / Mean", zh: "平均值 / 平均数" },
      { en: "Median", zh: "中位数" },
      { en: "Maximum / Minimum", zh: "最大值 / 最小值" },
      { en: "Ratio", zh: "比例" },
      { en: "Probability", zh: "概率" },
      { en: "Variable", zh: "变量" },
      { en: "Represent", zh: "代表 / 表示" },
      { en: "Standard", zh: "标准 / 标准型" },
    ]
  },
  {
    title: "Science, Measurement & General (科学、测量与综合)",
    terms: [
      { en: "Voltage", zh: "电压" },
      { en: "Circuit", zh: "电路" },
      { en: "Tension", zh: "张力 / 拉力" },
      { en: "Mass", zh: "质量" },
      { en: "Frequency", zh: "频率" },
      { en: "Rate / Speed", zh: "速率 / 速度" },
      { en: "Outward journey", zh: "去程" },
      { en: "Measure / Measurement", zh: "测量" },
      { en: "Centimetre", zh: "厘米" },
      { en: "Amount", zh: "数量 / 总额" },
      { en: "Region", zh: "区域 / 范围" },
      { en: "Characteristic", zh: "特征 / 特性" },
      { en: "Membrane", zh: "膜 / 隔膜" },
      { en: "Distinguish", zh: "区分 / 辨别" },
    ]
  }
]
