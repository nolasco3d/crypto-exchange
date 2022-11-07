import {defineStore} from 'pinia'
const COINS = [
  'bitcoin',
  'ethereum',
  'cosmos',
  'dacxi',
  'terra-luna-2'
]
const CURRENCIES = [
  'brl',
  'usd'
]

export const useCoinStore = defineStore('coin', {
  state: () => ({
    loading: false,
    selectedCoin: '',
    allCoins: COINS,
    allCurrencies: CURRENCIES,
    selectedCurr: CURRENCIES[0],
    coinsRT: []
  }),
  actions: {
    // init () {
    //   const rt = setInterval(async () => {
    //     console.log('Update prices!')
    //     await this.getCoinsInfo();
    //   }, 30000)
    // },
    toggleCoinSelected(coin: string) {
      if (this.selectedCoin === coin) {
        this.selectedCoin = '';
        return
      }
      this.selectedCoin = coin;
    },
    async getCoinsInfo() {
      try {
        this.coinsRT = await $fetch(encodeURI(`https://api.coingecko.com/api/v3/simple/price?ids=${this.allCoins.join(',')}&vs_currencies=${this.allCurrencies.join(',')}`))
      } catch(err) {
        console.log(err)
      }
    }
  },
  getters: {

  }
})