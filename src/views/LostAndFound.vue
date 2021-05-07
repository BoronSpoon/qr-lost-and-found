<template>
  <div>
    <v-card class="overflow-hidden">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(preference, i) in preferences"
          :key="i"
        >
          <v-text-field
            v-if="preference.type == 'textField'"
            v-model="preference.value"
            :label="preference.text"
          ></v-text-field>
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
        <v-btn
          class="mr-4"
          @click.stop="formSubmit"
        >
          Submit
        </v-btn>      
      </v-list-item-group> 
    </v-card>
  </div>
</template>

<script>
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "UserPreferences",
  data: () => ({
    preferences: [
      { text: 'Your User Name', value: this.userId, type: 'textField'},
      { text: 'Where was the item found?', value: 'name of building, where in the building...', type: 'textField'},
      { text: 'What is the current location of this item?', value: 'did you send it to the police station or is it still in your hands?', type: 'textField'},
      { text: 'Message to owner', value: 'ex) I have sent the item to NYC police station', type: 'textField'},
    ],
    itemId: '',
    userId: '',
  }),
  components: {
    //
  },
  mounted(){
    this.itemId = this.$route.query.itemid;
    this.userId = this.$route.query.userid;
  },
  methods: {
    formSubmit() {
      var userPreferences = {
        'foundLocation': this.preferences[1].value,
        'currentLocation': this.preferences[2].value,
      };
      var message = {
        'item': this.itemId,
        'sender': this.preferences[0].value,
        'text': this.preferences[3].value
      };
      this.updatePublicItemData(this.userId, this.itemId, userPreferences);
      this.pushMessage(message);
    }
  },
  mixins: [DatabaseOps]
};
</script>
