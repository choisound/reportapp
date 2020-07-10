<template>
<div>
    <el-table border
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="技术QQ">
            <span>{{ props.row.QQ }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ props.row.Name }}</span>
          </el-form-item>
          <el-form-item label="支付宝">
            <span>{{ props.row.ZfbAccount }}</span>
          </el-form-item>
          <el-form-item label="方向">
            <span>{{ props.row.Area}}</span>
          </el-form-item>
          <el-form-item label="接单数">
            <span>{{ props.row.Count }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="技术QQ"
      prop="QQ">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="Name">
    </el-table-column>
    <el-table-column
      label="支付宝"
      prop="ZfbAccount">
    </el-table-column>
    <el-table-column
      label="方向"
      prop="Area">
    </el-table-column>
    <el-table-column
      label="接单数"
      prop="Count">
    </el-table-column>
     <el-table-column label="操作" align="center" min-width="100">
　　　　<template slot-scope="scope">
　　　　　　<el-button type="info" @click="modifyTech(scope.row)">修改</el-button>
　　　　　　<el-button type="info" @click="deleteTech(scope.row)">删除</el-button>
　　　　</template>
　　</el-table-column>
  </el-table>
  <el-pagination align='center'
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[1,5,10,20,50]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </div>
</template>

<style>
  .input-file {
        width: 1.46rem;
        height: 100%;
        z-index: 1;
        opacity: 0;
        position: absolute;
        cursor: pointer;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>

import { getTechData} from "@/api/common.js";
export default {
    data() {
      return {
        tableData: [],
       /*分页数据*/
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 10
      }
    },
    mounted() {
        this.getTechDatas()
    },
    methods: {
      modifyTech(techData) {
          
      },
      getTechDatas() {
          var data = {page:this.currentPage,size:this.pageSize}
            getTechData(data).then(res => {
             let {code, msg, data} = res.data
             if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
                this.total =  data.Num
              this.tableData = data.TechDetailList
            }
          })
      },
       //分页点击方法
        handleSizeChange:function(val) {
            this.currentPage = 1;
            this.pageSize = val;
            console.log(this.currentPage + " : " + this.pageSize)
            this.getOrderData()
        },
        handleCurrentChange:function(val) {
            this.currentPage = val;
            console.log(this.currentPage)
            this.getOrderData()
        }
     }
   
  }
</script>
<style.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }>

</style>