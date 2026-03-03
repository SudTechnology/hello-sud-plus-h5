import { getList } from 'api/game'
import { useEffect, useState } from 'react'

export const useHome = () => {
  const [list, setList] = useState([])
  const [llmbotList, setLlmbotList] = useState([])
  useEffect(() => {
    getList().then(res => {
      console.log(res)
      const resList = res.data.sceneVOList
      setList(resList)
      setLlmbotList(resList.filter((item: any) => item.llmbot))
    })
  }, [])

  return { list, llmbotList }
}
