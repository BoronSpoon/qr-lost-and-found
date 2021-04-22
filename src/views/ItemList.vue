<template>
  <div>
    <Header :title="title"/>
    <v-card class="overflow-hidden">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(preference, i) in preferences"
          :key="i"
          :label="preference.text"
        >
        </v-list-item>
      </v-list-item-group> 
    </v-card>
  </div>
</template>

<script>
import Header from '@/components/Header'
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "ItemList",
  data: () => ({
    preferences: [
      { text: 'Notify when link is accessed', value: false, type: 'checkbox'},
      { text: 'Notification for items that are not lost', value: true, type: 'checkbox'},
      { text: 'Where to notify', values: ['email', 'app'], value: 'email', type: 'select'},
    ],
    title: 'Item List'
  }),
  components: {
    Header
  },
  methods: {
    formSubmit() {
      var values = {
        'notifyAtLinkOpen': this.preferences[0].value,
        'notifyNotLostItem': this.preferences[1].value,
        'whereToNotify': this.preferences[2].value
      };
      this.setUserPreferences(values);
    }
  },
  mixins: [DatabaseOps]
};
</script>
