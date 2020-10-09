<template>
  <div class="home">
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: {
    Table
  }
}
</script>

<style scoped lang="scss">
.home{
  padding: 0 100px;
  background-color: #F5F9FC;
}
</style>
