<template>
<div>

  <input class="input-file" id="uploadExcelInput" type="file" @change="exportData"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
 <input class="input-file"  type="file" id="uploadTxtInput" @change="exportTxt"
           accept=".txt,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
 
  <el-button @click="uploadExcel">导入千牛数据</el-button>
  <el-button @click="uploadReportData">导入报账数据</el-button>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
      <div style="padding-top:10px">
          筛选条件
          <el-checkbox-group v-model="checkList" style="padding-top:20px">
          <el-checkbox label="技术已报账"></el-checkbox>
          <el-checkbox label="客服已报账"></el-checkbox>
          <el-checkbox label="未报账"></el-checkbox>
        </el-checkbox-group>
        </div>  
      </div>
    </el-col>
  </el-row>
  <el-row style="padding-top:10px">
    <el-col :span="6" offset="2"><div class="grid-content bg-purple">
      <el-input placeholder="" v-model="orderId">
        <template slot="prepend">订单号:</template>
      </el-input>
    </div></el-col>
    <el-col offset="1" :span="6">
      <div class="grid-content bg-purple-light">
         <el-input placeholder="" v-model="techId">
        <template slot="prepend">技术ID：</template>
      </el-input>
      </div>
    </el-col>
    
    <el-col offset="1" :span="6">
      <div class="grid-content bg-purple-light">
         <el-input placeholder="" v-model="kId">
        <template slot="prepend">客服ID：</template>
      </el-input>
      </div>
    </el-col>
    
  </el-row>
 
   <el-row>
    <el-col :span="4" offset="10" style="padding-top:10px"><div class="grid-content bg-purple-dark">
      <el-button type="primary" @click="getOrderData">搜索</el-button>

      </div></el-col>
  </el-row>
  <el-table border
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="客服ID">
            <span>{{ props.row.KID }}</span>
          </el-form-item>
          <el-form-item label="订单号">
            <span>{{ props.row.OrderID }}</span>
          </el-form-item>
          <el-form-item label="QQ群">
            <span>{{ props.row.QQ }}</span>
          </el-form-item>
          <el-form-item label="支付宝订单号">
            <span>{{ props.row.ZfbID}}</span>
          </el-form-item>
          <el-form-item label="技术姓名">
            <span>{{ props.row.TechName }}</span>
          </el-form-item>
          <el-form-item label="技术支付宝">
            <span>{{ props.row.TechZfb }}</span>
          </el-form-item>
          <el-form-item label="订单金额">
            <span>{{ props.row.Money }}</span>
          </el-form-item>
          <el-form-item label="是否已报账">
            <span>{{ props.row.Report }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="客服ID"
      prop="KID">
    </el-table-column>
    <el-table-column
      label="订单号"
      prop="OrderID">
    </el-table-column>
    <el-table-column
      label="技术姓名"
      prop="TechName">
    </el-table-column>
    <el-table-column
      label="技术支付宝"
      prop="TechZfb">
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="Money">
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="100">
　　　　<template slot-scope="scope">
　　　　　　<el-button type="info" @click="modifyOrder(scope.row.phone)">报账</el-button>
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
<el-dialog :visible.sync="dialogTableVisible">
  <el-table :data="resultData" height="250"
    border
    style="width: 100%">
    <el-table-column property="orderId" label="支付宝订单号" width="200"></el-table-column>
    <el-table-column property="zfbId" label="订单号" width="200"></el-table-column>
    <el-table-column property="money" label="金额" width="150"></el-table-column>
  </el-table>
  <el-button type="success" @click="uploadOrderInfo()" plain>上传订单</el-button>
  <el-button type="danger" @click="dialogTableVisible=false" plain>取消</el-button>
</el-dialog>
<el-dialog :visible.sync="dialogTableVisible1">
  
    <el-tooltip :v-if="isVisitable" class="item" effect="dark" content="请检查是否没有录入支付宝订单还是该订单号有问题。" placement="top">
      <el-button>请检查下述订单号：</el-button>
    </el-tooltip>
  <el-table :data="reportData" height="250"
    border
    style="width: 100%">
    <el-table-column property="orderId" label="支付宝订单号" width="180"></el-table-column>
    <el-table-column property="kId" label="客服ID" width="100"></el-table-column>
    <el-table-column property="techName" label="技术姓名" width="100"></el-table-column>
    <el-table-column property="techZfb" label="技术支付宝" width="120"></el-table-column>
    <el-table-column property="qq" label="QQ群名" width="100"></el-table-column>
    <el-table-column property="money" label="金额" width="100"></el-table-column>
  </el-table>
  <el-button type="success" @click="reportOrderData()" plain>上传报账数据</el-button>
  <el-button type="danger" @click="dialogTableVisible1=false" plain>取消</el-button>
</el-dialog>
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

import { uploadZfbOrder,getOrderList,AddReportData} from "@/api/common.js";
import XLSX from 'xlsx'
  export default {
    data() {
      return {
        tableData: [],
       /*分页数据*/
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 10, // 每页的数据条数 
        resultData:[],
        reportData:[],
        inputvisible:false,
        isVisitable:false,
        dialogTableVisible:false,
        dialogTableVisible1:false,
        checkList: ['客服已报账','技术已报账'],
        orderId:"",
        techId:"",
        kId:""
      }
    },
    mounted() {
        this.getOrderData()
    },
     methods: {
      uploadExcel () {
        document.querySelector('#uploadExcelInput').click()
      },
      getOrderData() {
        var data = {page:this.currentPage,size:this.pageSize}
        if(/^\d+$/.test(this.kId)){
          data["kId"] = parseInt(this.kId)
        }
        if(/^\d+$/.test(this.techId)) {
          data["techId"]=parseInt(this.techId)
        }
        if(/^\d+$/.test(this.orderId)) {
          data["orderId"]=this.orderId
        }
          getOrderList(data).then(res => {
             let {code, msg, data} = res.data
             if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.tableData = data.orderList
              this.total = data.total
            }
          })
      },
      uploadOrderInfo () {
        let _this = this
        uploadZfbOrder(this.resultData).then(res => {
           // 根据返回的code判断是否成功
            let {code, msg, user} = res.data
            if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: "上传成功"
              })
              _this.dialogTableVisible = false
            }
        })
        
       
      },
      reportOrderData() {
        let _this = this
        AddReportData(this.reportData).then(res => {
           // 根据返回的code判断是否成功
            let {code, msg, user} = res
            if (code != 20000) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: "上传成功"
              })
              if(user.length == 0) {
                 _this.dialogTableVisible1 = false
                 _this.isVisitable = false
              } else {
                _this.isVisitable = true
              }
              _this.resultData = user
            }
        })
      },
      uploadReportData() {
        document.querySelector("#uploadTxtInput").click();
      },
      exportTxt(event) {
        
        let _this = this;
        if (!event.currentTarget.files.length) {
          return
        }
        const that = this
        // 拿取文件对象
        var f = event.currentTarget.files[0]
        // 用FileReader来读取
        var reader = new FileReader()
        reader.readAsText(f,"UTF-8")
        reader.onload = function (e) {
            // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
            var orderList = []
            var tmpUserName=""
            var tmpZfb=""
            var tmpKID = 0
            var flag = 0
            var tOrderItem = e.target.result.split("\n")
            for (var i = 0; i < tOrderItem.length; i++) {
              // console.log(tOrderItem[i])
              if(tOrderItem[i].trim().length == 0) {
                 continue
              } 
              var nameZfb = tOrderItem[i].split(" ")
              if(nameZfb.length == 1) {
                tmpKID = nameZfb[0]
                // console.log("KID"+tmpKID)
                continue
              }
              if(nameZfb.length == 2) {
                tmpUserName = nameZfb[1]
                tmpZfb = nameZfb[0]
                continue
              } 
              if(nameZfb.length == 3) {
                var order = {"kId":parseInt(tmpKID.trim()),"techZfb":tmpZfb.trim(),"techName":tmpUserName.trim(),"orderId":nameZfb[1].trim(),"qq":nameZfb[0].trim(),"money":parseInt(nameZfb[2].trim())}
                orderList.push(order)
              }
            }
            
           document.querySelector("#uploadTxtInput").value= ""
            _this.reportData= orderList
            _this.dialogTableVisible1=true
        }
      },
      exportData (event) {
        let _this = this;
        if (!event.currentTarget.files.length) {
          return
        }
        const that = this
        // 拿取文件对象
        var f = event.currentTarget.files[0]
        // 用FileReader来读取
        var reader = new FileReader()
        // 重写FileReader上的readAsBinaryString方法
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = ''
          var wb // 读取完成的数据
          var outdata // 你需要的数据
          var reader = new FileReader()
          reader.onload = function (e) {
            // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
            var bytes = new Uint8Array(reader.result)
            var length = bytes.byteLength
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            // 接下来就是xlsx了，具体可看api
            wb = XLSX.read(binary, {
              type: 'binary'
            })
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            // 自定义方法向父组件传递数据
            // console.log('outdata = ' + JSON.stringify(outdata))
            let arr = []
            outdata.map(v=> {
              let obj = {};
              obj['orderId'] = v['订单编号'];
              obj['zfbId'] = v['支付单号'];
              obj['money'] = parseFloat(v['买家实际支付金额']);
              arr.push(obj)
            })
            // console.log(arr)
            _this.dialogTableVisible = true
            _this.resultData = arr            
            document.querySelector('#uploadExcelInput').value= ""
          }
          reader.readAsArrayBuffer(f)
        }
        reader.readAsBinaryString(f)
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