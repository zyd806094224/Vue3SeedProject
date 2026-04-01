<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>后台管理系统</h2>
        <p>欢迎使用后台管理系统，基于 Vue3 + Element Plus 构建。</p>
      </el-col>
      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="8">
            <h2>技术栈</h2>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="clearfix">
                  <span>前端技术</span>
                </div>
              </template>
              <div class="text item">Vue3</div>
              <div class="text item">Vite</div>
              <div class="text item">Element Plus</div>
              <div class="text item">Pinia</div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="clearfix">
                  <span>后端技术</span>
                </div>
              </template>
              <div class="text item">Spring Boot</div>
              <div class="text item">Spring Security</div>
              <div class="text item">MyBatis</div>
              <div class="text item">Redis</div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index"></script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }
}
</style>
