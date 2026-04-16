import { useDict } from '@/utils/dict'
import { getConfigKey } from '@/api/system/config'
import {
  parseTime,
  resetForm,
  addDateRange,
  handleTree,
  selectDictLabel,
  selectDictLabels
} from '@/utils/helpers'
import { download } from '@/utils/request'

declare module 'vue' {
  export interface ComponentCustomProperties {
    useDict: typeof useDict
    download: typeof download
    parseTime: typeof parseTime
    resetForm: typeof resetForm
    handleTree: typeof handleTree
    addDateRange: typeof addDateRange
    getConfigKey: typeof getConfigKey
    selectDictLabel: typeof selectDictLabel
    selectDictLabels: typeof selectDictLabels
  }
}
