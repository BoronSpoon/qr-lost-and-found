<template>
  <div>
    <Header :title="title"/>
    <v-card class="overflow-hidden">
      <v-sheet>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(preference, i) in preferences"
            :key="i"
          >
            <v-text-field
              v-if="preference.type === 'textField'"
              v-model="preference.value"
              :label="preference.text"
            ></v-text-field>
            <v-checkbox
              v-if="preference.type === 'checkbox'"
              v-model="preference.value"
              :label="preference.text"
            ></v-checkbox>
            <v-select
              v-if="preference.type === 'select'"
              v-model="preference.value"
              :items="preference.values"
              :label="preference.text"
            ></v-select>
          </v-list-item>
        </v-list-item-group> 
        <v-spacer/>
        <v-list-item>
          <v-btn
            class="mr-4"
            @click="clicked = true"
          >
            Submit
          </v-btn>         
        </v-list-item>
        <v-spacer/>
        <v-list-item>     
          <QR :itemName="preferences[0].value" :clicked.sync="clicked" itemId=""/>
        </v-list-item>
      </v-sheet>
    </v-card>
  </div>
</template>


<script>
import Header from '@/components/Header'
import QR from '@/components/QR'

export default {
  name: "ItemRegisteration",
  data: () => ({
    preferences: [
      { text: 'Name of Item', value: '', type: 'textField'}
    ],
    title: 'Item Registeration',
    itemName: '',
    clicked: false,
  }),
  components: {
    Header,
    QR
  },
  methods: {
    //
  }
};
</script>
