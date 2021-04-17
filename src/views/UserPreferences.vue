<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="deep-purple accent-4"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>User Preferences</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(preference, i) in preferences"
          :key="i"
        >
          <v-checkbox
            v-model="preference.value"
            :label="preference.text"
          ></v-checkbox>
        </v-list-item>
      </v-list-item-group>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserPreferences",
  data: () => ({
    collapseOnScroll: true,
    preferences: [
      { text: 'Notify when link is accessed', value: ''},
      { text: 'Notification for items that are not lost', value: ''},
      { text: 'Where to notify', value: ''},
    ],
  }),
  components: {
    //
  },
};
</script>
