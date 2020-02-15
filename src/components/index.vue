<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">活动</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>回顾</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">关于我们</a></el-menu-item>
          <el-menu-item index="5">登录</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from './header/Header.vue'
export default {
  components: { Header },
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    count: {
      get () {
        return this.$store.getters.Search.count
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .el-header {
    margin: 0;
    padding: 0;
  }
</style>
