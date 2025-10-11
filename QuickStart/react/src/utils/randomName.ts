const surnames = [
  // 单姓（常见）
  '林', '周', '沈', '顾', '陆', '叶', '苏', '程', '谢', '萧',
  // 单姓（意境）
  '云', '风', '江', '山', '墨', '白', '宁', '岑', '晏', '凌',
  // 复姓
  '欧阳', '上官', '慕容', '司徒', '南宫', '诸葛', '东方', '端木', '闻人', '夏侯'
]

// 拆分为单字池（合并现代/古典/自然风格）
const allGivenNameChars = [
  // 现代名
  '一', '然', '予', '安', '司', '衡', '景', '和', '知', '远', '星', '冉',
  '若', '洲', '清', '川', '南', '舟', '云', '起',
  // 古典名
  '疏', '桐', '砚', '舟', '镜', '玄', '怀', '瑾', '墨', '珩', '清', '晏',
  '昭', '明', '溪', '亭', '望', '舒', '攸', '宁',
  // 自然名
  '雪', '松', '云', '溪', '星', '河', '鹤', '鸣', '栖', '野', '听', '澜',
  '屿', '枫', '鹿', '蹊', '汀', '兰', '竹', '隐'
]

export function generateName() {
  // 1. 随机姓氏
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const isCompound = surname.length > 1

  let givenName = ''
  if (!isCompound) {
    for (let i = 0; i < 2; i++) {
      givenName += allGivenNameChars[
        Math.floor(Math.random() * allGivenNameChars.length)
      ]
    }
  } else {
    givenName = allGivenNameChars[
      Math.floor(Math.random() * allGivenNameChars.length)
    ]
  }

  return surname + givenName // 固定3字输出
}
