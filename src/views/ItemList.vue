<template>
  <div>
    <Header :title="title"/>
    <v-progress-circular
      indeterminate
      v-if="!dataReady"
    ></v-progress-circular>
    <v-card class="overflow-hidden" v-if="dataReady">
      <v-list>
        <v-list-item
          v-for="(item, i) in items.slice(shownItem.start,shownItem.end)"
          :key="i"
        >
          <v-list-item-content>
            <v-row>
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
              <v-col align="end">
                <v-chip
                  class="mx-1 my-0"
                  color="grey darken-3"
                  label
                  text-color="white"
                  @click.stop="changeExpandState(i)"
                >
                  QR
                  <v-icon v-if="expand[i]">
                    mdi-chevron-up
                  </v-icon>
                  <v-icon v-if="!expand[i]">
                    mdi-chevron-down
                  </v-icon>
                </v-chip>
              </v-col>
              <v-col cols="12">
                <QR :itemName="item.name" :clicked="expand[i]" :itemId="item.id"/>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item> 
      </v-list>
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
    expand: [],
  }),
  components: {
    Header,
    QR
  },
  watch: {
    'expand[0]' (){
        console.log(this.expand[0]);
    },
    currentPage(){
      this.shownItem = {
        start: (this.currentPage-1)*this.itemsPerPage, // start item no for current page
        end: Math.min((this.currentPage)*this.itemsPerPage, this.items.length) // end item no for current page
      };
      this.expand.fill(false);
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
      this.expand = new Array(this.itemsPerPage).fill(false);
      this.dataReady = true;
    });
  },
  mixins: [DatabaseOps],
  methods: {
    s(e){
      console.log(e)
    },
    changeExpandState(i){
      console.log("click");
      this.expand[i] = !this.expand[i];
      console.log(this.expand[i]);
    }
  }
};
</script>
