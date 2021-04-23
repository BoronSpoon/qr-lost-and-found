<template>
  <div>
    <Header :title="title"/>
    <v-progress-circular
      indeterminate
      v-if="!dataReady"
    ></v-progress-circular>
    <v-card class="overflow-hidden" v-if="dataReady">
      <v-expansion-panels v-model="panels">
        <v-expansion-panel
          v-for="(item, i) in items.slice(shownItem.start,shownItem.end)"
          :key="i"
        >
          <v-expansion-panel-header class="pa-0">
            <v-container class="ma-0">
              <v-row no-gutters>
                <v-col align="start">
                  {{item.name}}
                </v-col>
                <v-col align="end">
                  <v-chip
                    class="mx-1 my-0"
                    :color="item.lost? 'red': 'grey'"
                    label
                    text-color="white"
                    @click.stop="item.lost = !item.lost"
                    v-text="item.lost? 'lost': 'not lost'"
                  >
                  </v-chip>
                  <v-chip
                    class="mx-1 my-0"
                    :color="item.found? 'red': 'grey'"
                    label
                    text-color="white"
                    v-text="item.found? 'found': 'not found'"
                  >
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>            
            <template v-slot:actions>
              <v-chip
                class="mx-1 my-0"
                color="grey darken-3"
                label
                text-color="white"
              >
                QR
                <v-icon>
                  mdi-chevron-down
                </v-icon>
              </v-chip>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <QR :itemName="items[shownItem.start+i].value" :clicked="panels.includes(i)"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> 
      <v-col cols="10">
        <v-pagination
          v-model="currentPage"
          class="my-4"
          :length="totalPages"
        ></v-pagination>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import Header from '@/components/Header'
import QR from '@/components/QR'
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "ItemList",
  data: () => ({
    items: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    shownItem: {},
    title: 'Item List',
    dataReady: false,
    panels: [],
  }),
  components: {
    Header,
    QR
  },
  watch: {
    currentPage(){
      this.shownItem = {
        start: (this.currentPage-1)*this.itemsPerPage, // start item no for current page
        end: Math.min((this.currentPage)*this.itemsPerPage, this.items.length) // end item no for current page
      };
    }
  },
  mounted() {
    this.getAllItems().then((data) => {
      this.items = data;
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      this.shownItem = {
        start: (this.currentPage-1)*this.itemsPerPage, // start item no for current page
        end: Math.min((this.currentPage)*this.itemsPerPage, this.items.length) // end item no for current page
      };
      // eslint-disable-next-line no-unused-vars
      Object.keys(this.items).map((key, index) => {
        this.items[key].show = true;
      });
      this.dataReady = true;
    });
  },
  mixins: [DatabaseOps]
};
</script>
