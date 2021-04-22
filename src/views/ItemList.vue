<template>
  <div>
    <Header :title="title"/>
    <v-card class="overflow-hidden">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items.slice(shownItem.start,shownItem.end)"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group> 
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
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "ItemList",
  data: () => ({
    items: [
      { text: 'Notify when link is accessed', icon: 'mdi-account-cog'},
      { text: 'Notification for items that are not lost', icon: 'mdi-account-cog'},
      { text: 'Where to notify', icon: 'mdi-account-cog'},
      { text: 'Notify when link is accessed', icon: 'mdi-account-cog'},
      { text: 'Notification for items that are not lost', icon: 'mdi-account-cog'},
      { text: 'Where to notify', icon: 'mdi-account-cog'},
      { text: 'Notify when link is accessed', icon: 'mdi-account-cog'},
      { text: 'Notification for items that are not lost', icon: 'mdi-account-cog'},
      { text: 'Where to notify', icon: 'mdi-account-cog'},
      { text: 'Notify when link is accessed', icon: 'mdi-account-cog'},
      { text: 'Notification for items that are not lost', icon: 'mdi-account-cog'},
      { text: 'Where to notify', icon: 'mdi-account-cog'},
      { text: 'Notify when link is accessed', icon: 'mdi-account-cog'},
      { text: 'Notification for items that are not lost', icon: 'mdi-account-cog'},
      { text: 'Where to notify', icon: 'mdi-account-cog'},
      { text: 'Notify when link is accessed', icon: 'mdi-account-cog'},
      { text: 'Notification for items that are not lost', icon: 'mdi-account-cog'},
      { text: 'Where to notify', icon: 'mdi-account-cog'},
    ],
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    shownItem: {},
    title: 'Item List'
  }),
  components: {
    Header
  },
  methods: {
    //
  },
  mounted() {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.shownItem = {
      start: (this.currentPage-1)*this.itemsPerPage, // start item no for current page
      end: Math.min((this.currentPage)*this.itemsPerPage, this.items.length) // end item no for current page
    };
  },
  mixins: [DatabaseOps]
};
</script>
