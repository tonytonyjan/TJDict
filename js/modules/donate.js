var Donate = {
  init: function(){
    Donate.showDonate();
  },

  showDonate: function(){
    google.payments.inapp.getSkuDetails({
      parameters: {'env': 'prod'},
      success: Donate.onSkuDetails,
      failure: Donate.onSkuDetailsFail
    });
  },

  onSkuDetails: function(data){
    data.response.details.inAppProducts.sort(function(a, b){
      return a.prices[0].valueMicros - b.prices[0].valueMicros;
    });
    for(var i in data.response.details.inAppProducts){
      var product = data.response.details.inAppProducts[i];
      var localeData = product.localeData[0];
      var price = product.prices[0]
      var row = $('<tr><td>' + localeData.title + '</td><td>' + localeData.description +'</td><td>' + price.valueMicros / 1000000 + '</td><td><a href="#" class="btn btn-success donate-btn" data-sku="' + product.sku + '" data-track-click="' + product.sku + '">贊助</a></td></tr>');
      row.find('[data-track-click]').click(Logger.onTrackClick);
      $('#donate_table > tbody').append(row);
    }
    Donate.bindDonateButtons();
  },

  onSkuDetailsFail: function(data){
    console.error(data);
  },

  bindDonateButtons: function(argument) {
    $('.donate-btn').click(function(e){
      google.payments.inapp.buy({
        'parameters': {'env': 'prod'},
        'sku': this.dataset.sku,
        'success': Donate.onPurchase,
        'failure': Donate.onPurchaseFail
      });
    });
  },

  onPurchase: function(data){
    Donate.logPurchase(data.response);
  },

  onPurchaseFail: function(data){
    Donate.logPurchase(data.response);
  },

  logPurchase: function(response){
    chrome.identity.getProfileUserInfo(function(info){
      Logger.firebase.child('purchases').push({
        response: response,
        uid: info.id
      });
    });
  }
}