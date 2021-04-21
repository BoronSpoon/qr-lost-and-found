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
        </v-list-item-group> 
        <v-btn
          class="mr-4"
          @click="createQR"
        >
          Submit
        </v-btn>
        <div id="qrcodeImage"></div>
      </v-sheet>
    </v-card>
    <div id="qrcodeDiv" class="container" style="margin: 0px; display: none;">
      <span class="qrcodeText" style="font-weight: bold">"QR Lost and Found" [QRコード忘れ物タグ]</span>
      <span class="qrcodeText">Please contact owner using QR code below</span>
      <span class="qrcodeText">拾った方はQRコードで所有者へ連絡をお願い致します</span>
      <span class="qrcodeText" id="qrcodeItemName"></span>
      <div id="qrcode" style="margin-top: 4px;"></div>
    </div>
  </div>
</template>

<style lang="scss">
.qrcodeText {
  line-height: 13px;
  font-size: 10px;
  display: block;
}
.container {
  background-color: #ffffff;
  border-radius: 2px;
  border-style: solid;
  border-color: #000000;
  width: 270px;
  text-align: center;
}
</style>

<script>
import Header from '@/components/Header'
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "UserPreferences",
  data: () => ({
    preferences: [
      { text: 'Name of Item', value: '', type: 'textField'}
    ],
    title: 'User Preferences'
  }),
  components: {
    Header
  },
  methods: {
    createQR() {
      var itemName = this.preferences[0].value;
      var item = {
        'currentLocation': '',
        'foundLocation': '',
        'found': false,
        'lost': false,
        'name': itemName
      }
      var itemId = this.pushItems(item);
      this.setItemIds(itemId);
      var url = 'http://127.0.0.1:5000/?foundItemId='+itemId;
      var qrcodeImageElementId = 'qrcodeImage';
      document.getElementById(qrcodeImageElementId).innerHTML = ''; // delete the previous QR code images
      this.generateQrcode(url, itemName);
      this.divToImage(qrcodeImageElementId);
    },
    generateQrcode(url, qrcodeItemName) {
      var qrcodeItemNameElementId = 'qrcodeItemName';
      var qrcodeElementId = 'qrcode';
      document.getElementById(qrcodeItemNameElementId).innerHTML = 'Item identifier: '+qrcodeItemName;
      document.getElementById(qrcodeElementId).innerHTML = ''; // reset qr code
      new QRCode(document.getElementById(qrcodeElementId), {
        text: url,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    },
    divToImage(qrcodeImageElementId) {
      var qrcodeDivElementId = 'qrcodeDiv';
      document.getElementById(qrcodeDivElementId).style.display = 'block'; // show the div for converting to image
      html2canvas(document.getElementById(qrcodeDivElementId)).then((canvas) => { // convert div(QR code + text) into image
        document.getElementById(qrcodeImageElementId).appendChild(canvas);
        document.getElementById(qrcodeDivElementId).style.display = 'none'; // hide the original div
      });
    }
  },
  mixins: [DatabaseOps]
};
</script>
