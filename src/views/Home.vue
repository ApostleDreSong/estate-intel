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
  padding: 0 5%;
  background-color: #F5F9FC;
}
</style>
