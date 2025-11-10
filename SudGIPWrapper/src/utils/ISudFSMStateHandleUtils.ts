/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

import { MGStateResponse } from "../state/MGStateResponse"
import { ISudFSMStateHandle } from '../type/core'

export class ISudFSMStateHandleUtils {
  /**
 * 回调游戏，成功
 *
 * @param handle
 */
  public static handleSuccess(handle: ISudFSMStateHandle) {
    const response: MGStateResponse = new MGStateResponse()
    response.ret_code = MGStateResponse.SUCCESS
    response.ret_msg = "success"
    handle.success(JSON.stringify(response))
  }
}
