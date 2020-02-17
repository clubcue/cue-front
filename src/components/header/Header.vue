<template>
  <div id='header'>
    <el-col :offset="4" :span="16">
      <el-menu active-text-color="#F56C6C" text-color="#409EFF" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">活动</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">回顾</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">回顾</el-menu-item>
        <el-menu-item index="4">关于我们</el-menu-item>
        <el-col :offset="1" span="4">
          <el-input style="margin-top: 10px"/>
        </el-col>
        <el-menu-item index="5" style="float: right"><i class="el-icon-user-solid"></i>登陆</el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Header',
      activeIndex: '1'
    }
  }
}
</script>

<style scoped>
  .header {
    margin: 0;
    padding: 0;
  }
</style>
