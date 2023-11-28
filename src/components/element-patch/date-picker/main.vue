<template>
  <span>
    <template v-if="isHasSlot">
      <DatePickerPatch ref="refDatePickerPatch"
        :value="pickerValue"
        @input="changeValue"
        v-bind="$attrs"
      />
      <span class="span-datepicker-label-wrapper" @click="clickLabel">
        <slot></slot>
      </span>
    </template>
    <el-date-picker ref="elDatePicker" v-else
      :value="pickerValue"
      @input="changeValue"
      v-bind="$attrs"
    >
    </el-date-picker>
    <div>pickerValue+{{ pickerValue }}+</div>
  </span>
</template>

<script>
import { DatePicker } from 'element-ui'

const DatePickerPatch = {
  extends: DatePicker,
  name: 'SpanDatePicker',
  data () {
    return {
      referenceDom: null
    }
  },
  computed: {
    reference () {
      return this.referenceDom || this.$refs.reference.$el.nextElementSibling
    }
  },
  mounted () {
    this.$refs.reference.$el.style.display = 'none'
  }
}
export default {
  name: 'dashdl-kahsdkj',
  components: {
    DatePickerPatch
  },
  data () {
    return {
      pickerValue: this.value,
      isHasSlot: false
    }
  },
  mounted () {
    const _default = this.$slots?.default ?? []
    if (_default && _default.length > 0) {
      this.isHasSlot = true
      this.$nextTick(() => {
        this.$refs.refDatePickerPatch.referenceDom = _default[0]?.elm ?? ''
      })
    } else {
      this.isHasSlot = false
    }
  },
  methods: {
    clickLabel () {
      this.$refs.refDatePickerPatch.showPicker()
    },
    changeValue (val) {
      this.pickerValue = val
      this.$nextTick(() => {
        this.isHasSlot ? this.$emit('input', this.$refs.refDatePickerPatch.displayValue) : this.$emit('input', this.$refs.elDatePicker.displayValue)
      })
    }
  }
}
</script>
