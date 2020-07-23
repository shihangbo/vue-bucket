import Observer from './observer'
import {isObject} from '../util/index'

export function observer(data) {
  if (!isObject(data)) {
    return
  }
  return new Observer(data)
}