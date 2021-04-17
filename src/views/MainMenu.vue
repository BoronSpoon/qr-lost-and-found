<template>
  <div>  
    <v-card
      class="mx-auto"
      max-width="300"
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
      { text: 'Preferences', icon: 'mdi-account-cog' },
      { text: 'Item Registeration', icon: 'mdi-tag-plus' },
      { text: 'Item List', icon: 'mdi-tag-multiple' },
    ],
  }),
};
</script>
