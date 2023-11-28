<template>
  <div class="home">
    <!-- format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" -->
    <!-- <LabelDatePicker format="yyyy 第 WW 周" value-format="yyyy-WW"
      type="week"
      v-model="value1"
    >
      <span style="cursor: pointer">{{ value1 || '请选择' }}</span>
    </LabelDatePicker> -->
    <el-table
      :data="tableData"
      max-height="20vh"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  data () {
    return {
      value1: '',
      value2: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  directives: { Clickoutside },
  methods: {
    handleClose () {
      console.log('%c [  ]-24', 'font-size:13px; background:pink; color:#bf2c9f;')
    }
  }
}
</script>
