import { getList } from 'api/game'
import { useEffect, useState } from 'react'

export const useHome = () => {
  const [list, setList] = useState([])
  const [llmbotList, setLlmbotList] = useState([])
  useEffect(() => {
    getList().then(res => {
      console.log(res)
      setList(res.data)
      setLlmbotList(res.data.filter((item: any) => item.llmbot))
    })
  }, [])

  return { list, llmbotList }
}
