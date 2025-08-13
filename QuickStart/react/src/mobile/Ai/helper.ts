export async function getToken(appId: string, accessKey: string) {
  const result = await fetch(' http://localhost:3000/get-token', {
    method: 'POST',
    headers: {
      // Authorization: `Bearer; ${accessKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      appId,
      accessKey,
      duration: 300 // 单位秒，默认1小时
    })
  })
    .then(res => res.json())
    .then(res => res.jwt_token)
  return result
}
