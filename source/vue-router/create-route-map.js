function addRouteRecord(route,pathList,pathMap,parentRecord) {
  let path = parentRecord?`${parentRecord.path}/${route.path}`:route.path
  let record = {
    path,
    component: route.component,
    // ... 用户定义的其他属性
    parent:parentRecord
  }
  if (!pathMap[path]) {
    pathMap[path] = record
    pathList.push(path)
  }
  if (route.children) {
    route.children.forEach(r => {
      addRouteRecord(r,pathList,pathMap,record)
    })
  }
}

export function createRouteMap(routes,oldPathList,oldPathMap) {
  let pathList = oldPathList || [], pathMap = oldPathMap || {};
  routes.forEach(route => {
    addRouteRecord(route,pathList,pathMap)
  })
  return {
    pathList,
    pathMap
  }
}