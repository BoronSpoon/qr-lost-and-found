<template>
  <div>  
    <v-card
      class="mx-auto"
      max-width="600"
      tile
    >
      <v-list>
        <v-subheader>Main Menu</v-subheader>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
              <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MainMenu",
  components: {
    //
  },
  data: () => ({
    selectedItem: 1,
    items: [
      { text: 'Preferences', icon: 'mdi-account-cog', link: '/userPreferences'},
      { text: 'Item Registeration', icon: 'mdi-tag-plus' , link: '/itemRegisteration'},
      { text: 'Item List', icon: 'mdi-tag-multiple', link: '/itemList'},
    ],
  }),
};
</script>
