<template>
  <div>
    <Header :title="title"/>
    <v-progress-circular
      indeterminate
      v-if="!dataReady"
    ></v-progress-circular>
    <v-card class='overflow-hidden' v-if="dataReady">
      <v-list>
        <v-list-item-group
          v-model="selectedItem"
          color='primary'
        >
          <v-list-item
            v-for="(item, i) in items.slice(shownItem.start,shownItem.end)"
            :key="i"
          >
            <v-list-item-content>
              <v-row class='align-start'>
                <v-col
                  cols='auto'
                  class='mr-auto px-3 py-2'  
                >
                  {{item.name}}
                </v-col>
                <v-spacer/>
                <v-col
                  cols='auto'
                  class='ml-auto pa-1'
                >
                  <v-chip
                    class='mx-1 my-0'
                    :color="item.lost? colors[5]: colors[1]"
                    label
                    text-color='white'
                    @click.stop="changeLostState(i)"
                    v-text="item.lost? 'lost': 'not lost'"
                  >
                  </v-chip>
                  <v-chip
                    class='mx-1 my-0'
                    :color="item.found? colors[5]: colors[1]"
                    label
                    text-color='white'
                    v-text="item.found? 'found': 'not found'"
                  >
                  </v-chip>
                </v-col>
                <v-col
                  cols='auto'
                  class='ml-auto pa-1'
                >
                  <v-chip
                    class='mx-1 my-0'
                    :color="colors[3]"
                    label
                    text-color='white'
                    @click.stop="changeExpandState(i)"
                  >
                    QR
                    <v-icon>
                      mdi-chevron-down
                    </v-icon>
                  </v-chip>
                </v-col>
                <v-col 
                  cols='12'
                  class='pa-1 text-center'
                >
                  <v-container
                    class='fluid fill-height'
                    v-show="item.expand"
                  >
                    <QR :itemName="item.name" :clicked="item.expand" :itemId="item.id"/>
                  </v-container>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item> 
        </v-list-item-group>
      </v-list>
      <v-row no-gutters>
        <v-col cols='12'>
          <v-pagination
            v-model="currentPage"
            class='my-4'
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
  name: 'ItemList',
  data: () => ({
    items: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    shownItem: {},
    selectedItem: '',
    title: 'Item List',
    dataReady: false,
    panels: [],
    colors: ['gray', 'grey darken-1', 'grey darken-2', 'grey darken-3', 'black', 'red']
  }),
  components: {
    Header,
    QR
  },
  watch: {
    selectedItem () { 
      // when item different from expanded one is clicked
      if ((typeof this.selectedItem !== 'undefined') && (this.selectedItem !== -1)){ // if none is clicked, selectedItem is undefined or -1
        if (this.items[this.shownItem.start+this.selectedItem].expand === false){
          this.changeExpandState(-1); // set expand to false for all list
        };
      } 
    },
    currentPage(){
      this.shownItem = {
        start: (this.currentPage-1)*this.itemsPerPage, // start item no for current page
        end: Math.min((this.currentPage)*this.itemsPerPage, this.items.length) // end item no for current page
      };
      this.changeExpandState(-1); // set expand to false for all list
      this.selectedItem = '';
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
        this.$set(this.items[key], 'expand', false);
      });
      this.dataReady = true;
    });
  },
  mixins: [DatabaseOps],
  methods: {
    changeExpandState(index){ // expand qr for clicked list item, close for others
      this.selectedItem = index; // enable hover color on expanded component
      for (var i = 0; i < this.itemsPerPage; i++){
        var item = this.items[this.shownItem.start+i];
        if (i == index){ // expand
          this.$set(item, 'expand', !item.expand);
        } else { // close
          this.$set(item, 'expand', false);
        }
      }
    },
    changeLostState(index){
      var item = this.items[this.shownItem.start+index];
      this.$set(item, 'lost', !item.lost);
      this.updateItem(item.id, item);
    }
  }
};
</script>
