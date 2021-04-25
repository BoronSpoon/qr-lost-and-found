<template>
  <div>
    <div id="qrcodeImage" class="qrcodeImage"></div>
    <div id="qrcodeDiv" class="container">
      <span class="qrcodeText" style="font-weight: bold">StopLosingStuff(Lost＆Found contact)</span>
      <span class="qrcodeText" style="font-weight: bold">[忘れ物連絡タグ]</span>
      <span class="qrcodeText">Please contact owner using QR code below</span>
      <span class="qrcodeText">拾った方はQRコードで所有者へ連絡をお願い致します</span>
      <span class="qrcodeText" id="qrcodeItemName"></span>
      <div id="qrcode" class="qrcode"></div>
    </div>
  </div>
</template>

<style lang="scss">
.qrcode {
  all:initial;
  padding:4px;
  margin: 0px;
  text-align:center;
  width: 256px;
  height: 256px;
}
.qrcodeImage {
  all:initial;
  padding:0px;
  margin: 0px;
  text-align:center;
  color:grey darken-3;
}
.qrcodeText {
  all:initial;
  padding:0px;
  margin: 0px;
  font-size: 10px;
  text-align: center;
  display: block;
  color: #000000;
}
.container {
  all:initial;
  background-color: #ffffff;
  width: 256px !important;
  padding: 2px !important;
  margin: 0px;
  text-align: center;
  display: none;
}
</style>

<script>
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "QR",
  components: {
    //
  },
  props: {
    itemName: {
      type: String,
      default: ''
    },
    clicked: {
      type: Boolean,
      default: false
    },
    itemId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    //
  }),
  watch: {
    clicked() {
      if (this.clicked == true){
        this.$emit('update:clicked', false);
        if (this.itemName != ''){
          this.drawQR();
        }
      } 
    }
  },
  mixins: [DatabaseOps],
  methods: {
    drawQR() {
      if (this.itemId == ''){
        var item = {
          'currentLocation': '',
          'foundLocation': '',
          'found': false,
          'lost': false,
          'name': this.itemName
        }
        this.itemId = this.pushItems(item);
        this.updateItems(this.itemId, {
          'id': this.itemId
        });
        this.setItemIds(this.itemId);
      }
      var url = 'http://127.0.0.1:5000/?foundItemId='+this.itemId;
      var qrcodeImageElementId = '#qrcodeImage';
      this.$el.querySelector(qrcodeImageElementId).innerHTML = ''; // delete the previous QR code images
      this.generateQrcode(url, this.itemName);
      this.divToImage(qrcodeImageElementId);
    },
    generateQrcode(url, qrcodeItemName) {
      var qrcodeItemNameElementId = '#qrcodeItemName';
      var qrcodeElementId = '#qrcode';
      this.$el.querySelector(qrcodeItemNameElementId).innerHTML = 'Item identifier: '+qrcodeItemName;
      this.$el.querySelector(qrcodeElementId).innerHTML = ''; // reset qr code
      new QRCode(this.$el.querySelector(qrcodeElementId), {
        text: url,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    },
    divToImage(qrcodeImageElementId) {
      var qrcodeDivElementId = '#qrcodeDiv';
      this.$el.querySelector(qrcodeDivElementId).style.display = 'block'; // show the div for converting to image
      html2canvas(this.$el.querySelector(qrcodeDivElementId)).then((canvas) => { // convert div(QR code + text) into image
        this.$el.querySelector(qrcodeImageElementId).appendChild(canvas);
        this.$el.querySelector(qrcodeDivElementId).style.display = 'none'; // hide the original div
      });
    }
  }
};
</script>

