import {createRouteMap} from './create-route-map'
import { createRoute } from './history/base'

// 1.匹配功能 - match，2.添加匹配(动态添加路由) - addRoutes
export function createMatcher(routes) {

  // pathList ['/','/about','/about/a']
  // pathMap {'/':{},'/about':{}}
  let {pathList,pathMap} = createRouteMap(routes)
  function match(location) {
    let record = pathMap[location] // 获取对应的记录
    return createRoute(record, {
      path: location
    })
  }
  function addRoutes(routes) {
    createRouteMap(routes,pathList,pathMap)
  }
  return {
    match, // 根据用户输入路径，获取对应的匹配记录
    addRoutes
  }
}