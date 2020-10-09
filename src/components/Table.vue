<template>
  <div class="wrapper">
    <div class="scroller">
      <table>
        <tr>
          <th class="fixed heading">
            <div class="head">Project Name</div>
          </th>
          <th class="heading">
            <div class="head">Developer</div>
          </th>
          <th class="heading"><div class="head">Main Contractor</div></th>
          <th class="heading"><div class="head">Area</div></th>
          <th class="heading"><div class="head">State</div></th>
          <th class="heading">
            <div class="status head">
              <div
                class="status-icon"
                @click="viewingOptions = !viewingOptions"
              >
                <div>Status</div>
                <div>
                  <svg
                    class="arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30px"
                    viewBox="-30 -30 60 60"
                  >
                    <path fill="#FFFFFF" d="M -8,-5 h 16 l -8,14 z" />
                  </svg>
                </div>
              </div>
              <div v-if="viewingOptions" class="statuses">
                <p @click="toggleOptions('all')">All</p>
                <p
                  v-for="status in statuses"
                  :key="status"
                  @click="toggleOptions(status)"
                >
                  {{ status }}
                </p>
              </div>
            </div>
          </th>
          <th class="heading"><div class="head">Sector</div></th>
        </tr>
        <tr v-for="(row, i) in filteredRows" :key="i">
          <td class="fixed">
            {{ row.project_name }}
          </td>
          <td>
            <span> {{ row.developer }}</span>
          </td>
          <td>{{ row.main_contractor }}</td>
          <td>{{ row.country }}</td>
          <td>{{ row.state }}</td>
          <td>
            <span
              :style="{
                backgroundColor: `${
                  row.status === 'Completed'
                    ? 'green'
                    : row.status === 'Under construction'
                    ? '#FDE0AF'
                    : row.status === 'On hold'
                    ? 'blue'
                    : row.status === 'Conceptual'
                    ? '#FFA500'
                    : 'red'
                }`,
                padding: '5px 10px',
                color: 'white',
              }"
            >
              {{ row.status }}
            </span>
          </td>
          <td>{{ row.sector }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import fetchFromApi from "../services/fetchFromApi";
export default {
  data() {
    return {
      rows: [],
      viewingOptions: false,
      selectedOption: "all",
    };
  },
  computed: {
    statuses() {
      let statuses = this.rows.map((r) => r.status);
      return new Set(statuses);
    },
    filteredRows() {
      console.log(this.rows.filter((r) => r.status === this.selectedOption));
      return this.selectedOption !== "all"
        ? this.rows.filter((r) => r.status === this.selectedOption)
        : this.rows;
    },
  },
  methods: {
    callApi() {
      fetchFromApi()
        .then((response) => {
          this.rows = response.data.data;
        })
        .catch(() => {
        });
    },
    toggleOptions(val) {
      this.viewingOptions = !this.viewingOptions;
      this.selectedOption = val;
    },
  },
  mounted() {
    this.callApi();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.status-icon {
  display: flex;
  align-items: center;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  line-height: 20px;
}
td {
  text-align: left;
  padding: 12px;
  height: 60px;
}
th {
  text-align: left;
  padding: 0px;
  .head {
    display: flex;
    align-items: center;
    height: 60px;
    min-width: 200px;
    padding: 8px;
  }
}

tr:nth-child(even) td {
  background-color: #f6fafd;
}

.heading {
  background-color: #28394b;
  color: white;
}
.wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.scroller {
  margin-left: 180px;
  width: calc(100% - 180);
  overflow-x: scroll;
}
.fixed {
  left: 0;
  position: absolute;
  top: auto;
  width: 180px;
}
td.fixed {
  box-shadow: 7px 0 5px -2px #eaedee;
}
.status {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.statuses {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 5px;
  position: absolute;
  top: 43px;
  left: -32px;
  border: 1px solid #eee;
  width: 200px;
  z-index: 200;
  p {
    border-bottom: 1px solid #eee;
    margin-bottom: 2px;
    color: #28394b;
    font-size: 12px;
    margin: 5px 0;
    cursor: pointer;
    padding: 8px;
  }
}
</style>
