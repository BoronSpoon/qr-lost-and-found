<template>
  <v-card class="overflow-hidden">
    <v-toolbar
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>User Preferences</v-toolbar-title>
    </v-toolbar>
    <v-sheet>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(preference, i) in preferences"
          :key="i"
        >
          <v-checkbox
            v-if="preference.type == 'checkbox'"
            v-model="preference.value"
            :label="preference.text"
          ></v-checkbox>
          <v-select
            v-if="preference.type == 'select'"
            v-model="preference.value"
            :items="preference.values"
            :label="preference.text"
          ></v-select>
        </v-list-item>
      </v-list-item-group>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "UserPreferences",
  data: () => ({
    collapseOnScroll: true,
    preferences: [
      { text: 'Notify when link is accessed', value: false, type: 'checkbox'},
      { text: 'Notification for items that are not lost', value: true, type: 'checkbox'},
      { text: 'Where to notify', values: ['email', 'app'], value: 'email', type: 'select'},
    ],
  }),
  components: {
    //
  },
};
</script>
