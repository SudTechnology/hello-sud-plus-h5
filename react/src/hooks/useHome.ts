import { getList } from 'api/game'
import { useEffect, useState } from 'react'

export const useHome = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    getList().then(res => {
      console.log(res)
      setList(res.data)
    })
  }, [])

  return { list }
}
