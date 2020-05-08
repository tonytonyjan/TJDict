var Donate = {
  settings: {
    medals: {
      bronze: {text: '青銅', color: '#CB6D51'},
      silver: {text: '白銀', color: 'silver'},
      gold: {text: '黃金', color: 'gold'},
      platinum: {text: '白金', color: '#E5E4E2'}
    },
  },

  init: function(){
    Donate.showDonateLinks();
    google.payments.inapp.getSkuDetails({
      parameters: {'env': 'prod'},
      success: Donate.onSkuDetails,
      failure: Donate.onFail
    });
  },

  showDonateLinks: function(){
    chrome.storage.sync.get(DEFAULT_OPTIONS, function(options){
      if(options.show_donate){
        $('#nav_donate').show();
        if(Search.isValidQuery()) $('#top_donate_text').show();
      }else $('#nav_donate,#top_donate_text').hide();
    });
  },

  onSkuDetails: function(skuData){
    Donate.showDonateButtons(skuData);
    Donate.bindDonateButtons();
    Donate.updateView();
  },

  showDonateButtons: function(skuData){
    skuData.response.details.inAppProducts.sort(function(a, b){
      return a.prices[0].valueMicros - b.prices[0].valueMicros;
    });
    for(var i in skuData.response.details.inAppProducts){
      var product = skuData.response.details.inAppProducts[i];
      var localeData = product.localeData[0];
      var price = product.prices[0];
      var row = $('<tr><td>' + localeData.title + '</td><td>' + localeData.description +'</td><td>' + price.valueMicros / 1000000 + '</td><td><a href="#" class="btn btn-success donate-btn" data-sku="' + product.sku + '">我要贊助</a></td></tr>');
      $('#donate_table > tbody').append(row);
    }
  },

  bindDonateButtons: function() {
    $('.donate-btn').click(function(e){
      google.payments.inapp.buy({
        parameters: {'env': 'prod'},
        sku: this.dataset.sku,
        success: Donate.onBought,
        failure: Donate.onBoughtFail
      });
    });
  },

  onBought: function(data){
    Donate.updateView();
  },

  onBoughtFail: function(data){
    console.error("bought failed");
  },

  updateView: function(){
    google.payments.inapp.getPurchases({
      parameters: {'env': 'prod'},
      success: Donate.onLicenseUpdate,
      failure: Donate.onFail
    });
  },

  onLicenseUpdate: function(data){
    Donate.updateDonateText(data.response.details);
  },

  updateDonateText: function(licenDetails){
    for(var i in licenDetails){
      var purchase = licenDetails[i];
      if(purchase.state == 'ACTIVE'){
        $('#donate_avatar').after('<p class="text-center">謝謝你的贊助！</p>');
        document.getElementById('donate_avatar').src = '/img/avatar_smile.png';
        document.getElementById('donate_close_btn').innerText = '關閉';
        $('[data-sku="' + purchase.sku + '"]')
          .removeClass('btn-success').addClass('btn-warning')
          .attr('disabled', 'disabled').text('已贊助');
      }
    }
    Donate.showDonateLinks();
  },

  medalStarClasses: function(medal){
    switch(medal){
      case 'bronze': return ['glyphicon-star-empty'];
      case 'silver': return ['glyphicon-star'];
      case 'gold': return ['glyphicon-star-empty', 'glyphicon-star'];
      case 'platinum': return ['glyphicon-star', 'glyphicon-star'];
      default: return "";
    }
  }
}