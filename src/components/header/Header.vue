<template>
  <div id='header'>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
      <el-menu-item index="3" disabled>关于我们</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">登陆</a></el-menu-item>
    </el-menu>
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
