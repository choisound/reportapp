<style>
  
</style>
<template>
  <div>
    <el-tabs v-model="currentView" @tab-click="tabChange">
        <el-tab-pane label="订单管理" name="Order"></el-tab-pane>
        <el-tab-pane label="技术管理" name="Tech"></el-tab-pane>
        <el-tab-pane label="报账管理" name="Report"></el-tab-pane>
    </el-tabs>
    <!--
      动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。
    -->
    <div :is="currentView"></div>
  </div>
</template>

<script>
 // 导入子组件
 import Order from '@/views/order';
 import Tech from '@/views/tech';
 import Report from '@/views/report';

 export default {
   data () {
     return {
       Order: 'Order',
       Tech: 'Tech',
       Report: 'Report',
       currentView: 'Order' // 默认选中第一项
     };
   },
   methods: {
     tabChange(tabItem,event) {
       console.log(tabItem.name)
       this.currentView = tabItem.name;
     }
   },
   components: {
     Order,
     Tech,
     Report
   }
 };
</script>>