<template>
  <el-card class="box-card">
    <zh-bread :level1="'数据统计'" :level2="'数据报表'"></zh-bread>
    <div id="main" style="width: 750px;height:400px;margin-top:16px;"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'reports',
  components: {},
  props: {},
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          { type: 'value' }
        ],
        series: [],

      }
    };
  },
  // 此时,页面上的元素,已经被渲染完毕了
  async mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    const res = await this.$axios.get('reports/type/1');
    if (res.data.meta.status !== 200) return this.$message('获取折线图数据失败!');
    const option1 = res.data.data;
    console.log('echarts', option1);
    this.options.series = [...option1.series]
    this.options.xAxis = [...option1.xAxis]
    // 5.展示数据
    myChart.setOption(this.options);
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  min-height: 100%;
}
</style>