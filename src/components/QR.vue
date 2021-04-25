<template>
  <div>
    <div id="qrcodeImage"></div>
    <div id="qrcodeDiv" class="container">
      <span class="qrcodeText" style="font-weight: bold">StopLosingStuff(Lost＆Found contact)</span>
      <span class="qrcodeText" style="font-weight: bold">[忘れ物連絡タグ]</span>
      <span class="qrcodeText">Please contact owner using QR code below</span>
      <span class="qrcodeText">拾った方はQRコードで所有者へ連絡をお願い致します</span>
      <span class="qrcodeText" id="qrcodeItemName"></span>
      <div id="qrcode" style="padding-top:4px"></div>
    </div>
  </div>
</template>

<style lang="scss">
.qrcodeText {
  all:initial;
  line-height: 13px;
  font-size: 10px;
  text-align: center;
  display: block;
  color: #000000;
}
.container {
  all:initial;
  background-color: #ffffff;
  border-radius: 2px;
  border-style: solid;
  border-color: #000000;
  width: 270px;
  text-align: center;
  margin: 0px;
  padding: 2px !important;
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
      var item = {
        'currentLocation': '',
        'foundLocation': '',
        'found': false,
        'lost': false,
        'name': this.itemName
      }
      var itemId = this.pushItems(item);
      this.setItemIds(itemId);
      var url = 'http://127.0.0.1:5000/?foundItemId='+itemId;
      var qrcodeImageElementId = 'qrcodeImage';
      document.getElementById(qrcodeImageElementId).innerHTML = ''; // delete the previous QR code images
      this.generateQrcode(url, this.itemName);
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
  }
};
</script>

