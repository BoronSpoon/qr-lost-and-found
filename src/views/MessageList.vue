<template>
  <div>
    <Header :title="title"/>
    <v-progress-circular
      indeterminate
      v-if="!dataReady"
    ></v-progress-circular>
    <v-card class='overflow-hidden' v-if="dataReady">
      <v-list>
        <v-list-message-group
          v-model="selectedMessage"
          color='primary'
        >
          <v-list-message
            v-for="(message, i) in messages.slice(shownMessage.start,shownMessage.end)"
            :key="i"
          >
            <v-list-message-content>
              <v-row class='align-start'>
                <v-col
                  cols='auto'
                  class='mr-auto px-3 py-2'  
                >
                  {{message.message}}
                </v-col>
                <v-col
                  cols='auto'
                  class='mr-auto px-3 py-2'  
                >
                  {{message.sender}}
                </v-col>
                <v-col
                  cols='auto'
                  class='mr-auto px-3 py-2'  
                >
                  {{message.timestamp}}
                </v-col>
                <v-col 
                  cols='12'
                  class='pa-1 text-center'
                >
                  <v-container
                    class='fluid fill-height'
                    v-show="message.expand"
                  >
                    {{message.text}}
                  </v-container>
                </v-col>
              </v-row>
            </v-list-message-content>
          </v-list-message> 
        </v-list-message-group>
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
  name: 'MessageList',
  data: () => ({
    messages: [],
    currentPage: 1,
    messagesPerPage: 10,
    totalPages: 0,
    shownMessage: {},
    selectedMessage: '',
    title: 'Message List',
    dataReady: false,
    panels: [],
    colors: ['gray', 'grey darken-1', 'grey darken-2', 'grey darken-3', 'black', 'red']
  }),
  components: {
    Header,
    QR
  },
  watch: {
    selectedMessage () { 
      // when message different from expanded one is clicked
      if ((typeof this.selectedMessage !== 'undefined') && (this.selectedMessage !== -1)){ // if none is clicked, selectedMessage is undefined or -1
        if (this.messages[this.shownMessage.start+this.selectedMessage].expand === false){
          this.changeExpandState(-1); // set expand to false for all list
        };
      } 
    },
    currentPage(){
      this.shownMessage = {
        start: (this.currentPage-1)*this.messagesPerPage, // start message no for current page
        end: Math.min((this.currentPage)*this.messagesPerPage, this.messages.length) // end message no for current page
      };
      this.changeExpandState(-1); // set expand to false for all list
      this.selectedMessage = '';
    }
  },
  mounted() {
    this.getAllMessages().then((data) => {
      this.messages = data;
      this.totalPages = Math.ceil(this.messages.length / this.messagesPerPage);
      this.shownMessage = {
        start: (this.currentPage-1)*this.messagesPerPage, // start message no for current page
        end: Math.min((this.currentPage)*this.messagesPerPage, this.messages.length) // end message no for current page
      };      
      // eslint-disable-next-line no-unused-vars
      Object.keys(this.messages).map((key, index) => {
        this.$set(this.messages[key], 'expand', false);
      });
      this.dataReady = true;
    });
  },
  mixins: [DatabaseOps],
  methods: {
    changeExpandState(index){ // expand qr for clicked list message, close for others
      this.selectedMessage = index; // enable hover color on expanded component
      for (var i = 0; i < this.messagesPerPage; i++){
        var message = this.messages[this.shownMessage.start+i];
        if (i == index){ // expand
          this.$set(message, 'expand', !message.expand);
        } else { // close
          this.$set(message, 'expand', false);
        }
      }
    }
  }
};
</script>
