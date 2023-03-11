<template>
    <div>
      <div class="container-fluid">
        <div class="row">
          <div v-for="table in tables" :key="table.id" class="col-md-2 my-2">
            <router-link :to="{ name: 'Menu', params: { tableId: table.id } }">
              <div
                class="card p-1"
                style="width: 15rem; height: 100%;"

                @click="selectTable(table.id)"
              >
                <div class="card-body">
                  <h3 class="">Table No.: <span class="fw-bold">{{ table.id }}</span></h3>

                  <p>status -> <span>{{ table.selected ? 'Selected' : 'Vacant' }}</span></p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="selectedTable" class="mt-3">
        <p>Selected Table: {{ selectedTable.id }}</p>
        <p>Status: {{ selectedTable.selected ? 'Selected' : 'Vacant' }}</p>
      </div>
    </div>
  </template>


  <script>
  export default {
    props: {
      selectedTableId: Number // add a prop for selectedTableId
    },
    data() {
      return {
        tables: [
          { id: 1, selected: false },
          { id: 2, selected: false },
          { id: 3, selected: false },
          { id: 4, selected: false },
          { id: 5, selected: false },
          { id: 6, selected: false },
          { id: 7, selected: false },
          { id: 8, selected: false },
          { id: 9, selected: false },
          { id: 10, selected: false },
          { id: 11, selected: false },
          { id: 12, selected: false },
          { id: 13, selected: false },
          { id: 14, selected: false },
          { id: 15, selected: false },
          { id: 16, selected: false },
          { id: 17, selected: false },
          { id: 18, selected: false },
          { id: 19, selected: false },
          { id: 20, selected: false }
        ]
      };
    },
        methods: {
            selectTable(tableId) {
                // Set the selected property for the selected table to true
                // and set the selected property for other tables to false
                this.tables.forEach(table => {
                table.selected = table.id === tableId;
                });

                // Set the selectedTableId prop to the selected table ID
                this.$emit("select-table", tableId);
            }
        },
        computed: {
        selectedTable() {
            // Find the selected table in the tables array and return it
            return this.tables.find(table => table.selected);
        }
    }
  };
  </script>

  <style scoped>
  .card {
    cursor: pointer;
    background-color: #add8e6;
  }
  .card:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
  </style>
