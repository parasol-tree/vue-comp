import { Table } from 'element-ui'
import { parseHeight } from 'element-ui/packages/table/src/util.js'

const tablePatched = {
  extends: Table,
  computed: {
    fixedBodyHeight () {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        }
      } else if (this.maxHeight) {
        let maxHeight = parseHeight(this.maxHeight)
        if (typeof maxHeight === 'number') {
          maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight
          }
          maxHeight -= this.layout.footerHeight
          return {
            'max-height': maxHeight + 'px'
          }
        } else if (maxHeight.match(/\d+(vh|%)/g)) {
          let resHeight = this.layout.scrollX ? `100% - ${this.layout.gutterWidth}px` : '100%'
          if (this.showHeader) {
            resHeight = `${resHeight} - ${this.layout.headerHeight}px`
          }
          resHeight = `${resHeight} - ${this.layout.footerHeight}px`

          return {
            'max-height': `calc(${resHeight})`
          }
        }
      }
      return {}
    }
  },
  mounted () {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
  },
  destroyed () {
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.keyup)
  },
  methods: {
    keydown (event) {
      if (event.key !== 'Alt') {
        return
      }
      const tableBody = this.$children.find(item => item.$options._componentTag === 'table-body')
      if (!tableBody || !tableBody.$refs.tooltip || !tableBody.$refs.tooltip.expectedState) {
        return
      }
      tableBody.$refs.tooltip.handleClosePopperBak = tableBody.$refs.tooltip.handleClosePopper
      tableBody.$refs.tooltip.handleClosePopper = () => {}

      tableBody.$refs.tooltipBak = tableBody.$refs.tooltip
      delete tableBody.$refs.tooltip
    },
    keyup (event) {
      if (event.key !== 'Alt') {
        return
      }
      const tableBody = this.$children.find(item => item.$options._componentTag === 'table-body')
      if (!tableBody || !tableBody.$refs.tooltipBak) {
        return
      }
      tableBody.$refs.tooltip = tableBody.$refs.tooltipBak
      delete tableBody.$refs.tooltipBak

      tableBody.$refs.tooltip.handleClosePopper = tableBody.$refs.tooltip.handleClosePopperBak
      delete tableBody.$refs.tooltip.handleClosePopperBak
    }
  }
}

export default {
  install (Vue) {
    Vue.component(Table.name, tablePatched)
  }
}
