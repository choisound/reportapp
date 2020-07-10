<template>
<div>
  <el-button @click="reportAll">一键报账</el-button>
  <el-button @click="exportFunc">下载报账数据</el-button>
   <el-table border
    id = "out-table"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="类型"
      prop="type">
    </el-table-column>
    <el-table-column
      label="支付宝"
      prop="Zfb">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="Name">
    </el-table-column>
    <el-table-column
      label="金额"
      prop="Money">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="Tag">
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="100">
　　　　<template slot-scope="scope">
　　　　　　<el-button type="info" @click="reportOrder(scope.$index,scope.row)">报账</el-button>
　　　　</template>
　　</el-table-column>
  </el-table>
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

import { reportData,getReportData} from "@/api/common.js";
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
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
        this.getReportData1()
    },
     methods: {
         reportAll() {
            reportData(this.tableData).then(res => {
             let {code, msg, data} = res.data
             if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
                this.$message({ 
                    type:   'success',
                    message: "报账成功",
                })
                this.getReportData1()
            } 
         });
         },
         reportOrder(rowId, row) {
            console.log(rowId, row)
            reportData([row]).then(res => {
             let {code, msg, data} = res.data
             if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
                this.$message({
                    type:   'success',
                    message: "报账成功",
                })
                console.log("aaa")
                this.getReportData1()
            }
          })
         },
         exportFunc: function(e) {
        // 从表生成工作簿对象
        var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
        // 得到二进制字符串作为输出
        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'binary'
        });
        FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
            type: 'application/octet-stream'
        }), 'a.xlsx')
      },
      s2ab: function(s) {
      var cuf;
      var i;
      if (typeof ArrayBuffer !== 'undefined') {
        cuf = new ArrayBuffer(s.length);
        var view = new Uint8Array(cuf);
        for (i = 0; i !== s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return cuf;
      } else {
        cuf = new Array(s.length);
        for (i = 0; i !== s.length; ++i) {
          cuf[i] = s.charCodeAt(i) & oxFF;
        }
        return cuf;
      }
    },
      getReportData1() {
            getReportData().then(res => {
             let {code, msg, data} = res.data
             if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.tableData = data
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