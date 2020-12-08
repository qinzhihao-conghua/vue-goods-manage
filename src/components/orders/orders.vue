<template>
  <el-card class="box-card">
    <zh-bread :level1="'订单管理'" :level2="'订单列表'"></zh-bread>
    <el-table :data="orderList" class="table-container">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号"> </el-table-column>
      <el-table-column prop="order_price" label="订单价格(元)"> </el-table-column>
      <el-table-column label="是否付款">
        <template slot-scope="scope">
          <el-tag type="danger" size="mini" v-if="scope.row.pay_status">未付款</el-tag>
          <el-tag type="success" size="mini" v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"> </el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | frmDate }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="openEditWindow(scope.row)" size="mini" plain icon="el-icon-edit" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="编辑地址" :visible.sync="editWindow">
      <el-form>
        <el-form-item label="省市区/县" :label-width="'100px'">
          <el-cascader v-model="selectedOptions" :options="options" :props="defaultPro" clearable @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="'100px'">
          <el-input v-model="address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editWindow = false">取 消</el-button>
        <el-button type="primary" @click="saveAddress()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import citydata from './citydata.js';
export default {
  name: 'orders',
  components: {},
  props: {},
  data() {
    return {
      orderList: [],
      pagenum: 1,
      pagesize: 15,
      total: -1,
      query: '',
      editWindow: false,
      options: [],
      selectedOptions: [],
      defaultPro: {
        expandTrigger: 'hover',
        label: 'label',
        value: 'value',
        children: 'children'
      },
      address: ''
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    openEditWindow(dataItem) {
      this.editWindow = true;
      this.options = citydata;
    },
    async getOrderList() {
      // user_id
      // pay_status
      // is_send
      // order_fapiao_title
      // order_fapiao_company
      // order_fapiao_content
      // consignee_addr
      const res = await this.$axios.get(`orders?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      if (res.data.meta.status === 200) {
        this.orderList = res.data.data.goods;
        this.total = res.data.data.total;
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    async saveAddress() {
      this.editWindow = false;
    },
    handleChange() { },
    handleSizeChange(value) {
      this.pagenum = 1;
      this.pagesize = value;
      // this.getGoodsList();
    },
    handleCurrentChange(value) {
      this.pagenum = value;
      // this.getGoodsList();
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  min-height: 100%;
  .table-container {
    margin-top: 16px;
    width: 100%;
  }
}
</style>