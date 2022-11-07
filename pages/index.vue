<template>
  <div>
    <h1 class="font-bold text-6xl text-center mb-6">Crypto</h1>

    <div class="mb-5">
      <span>Selected currency</span>
      <select
        v-model="coinStore.selectedCurr"
        class="block mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
      >
        <option
          class="text-"
          v-for="(cur, index) in coinStore.allCurrencies"
          :key="index"
        >
          {{ cur }}
        </option>
      </select>
    </div>

    <div class="carousel carousel-center mx-4 p-4 space-x-4 bg-gray-100 rounded-box">
      <div
        class="carousel-item card bg-white w-[250px] shadow-md ml-4"
        v-for="(coin, index) in coinStore.allCoins"
        :key="index"
      >
        <div class="card-body">
          <h2 class="card-title">{{ coin }}</h2>
          <span v-if="coinStore.coinsRT[coin]">
            <strong class="uppercase">${{ coinStore.selectedCurr }}</strong>
            {{ coinStore.coinsRT[coin][coinStore.selectedCurr].toFixed(2) }}
          </span>
          <div class="card-actions justify-end">
            <button @click="coinStore.toggleCoinSelected(coin)" class="btn btn-primary">
              Consult history
            </button>
          </div>
        </div>
      </div>
    </div>

    <section v-if="coinStore.selectedCoin" class="">
      <div class="card card-bordered mx-4">
        <div class="card-body">
          <div class="card-title text-center">Check value</div>

          <label class="block">
            <span class="text-gray-700">Date</span>
            <input
              type="date"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
              @input="dateInput"
            />
          </label>

          <label class="block">
            <span class="text-gray-700">Price</span>
            <input
              v-model="inputValue"
              type="number"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
              disabled
            />
          </label>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCoinStore } from "@/stores/coins";
const coinStore = useCoinStore();
let history = ref(null);
let inputValue = ref(0);

coinStore.getCoinsInfo();

const rt = setInterval(async () => {
  console.log("Update prices!");
  await coinStore.getCoinsInfo();
}, 30000);

async function dateInput(event) {
  const orderDate = event.target.value.split("-").reverse().join("-");

  const data = await $fetch(
    `https://api.coingecko.com/api/v3/coins/${coinStore.selectedCoin}/history?date=${orderDate}`
  );

  history.value = data;
  inputValue.value = data.market_data.current_price[coinStore.selectedCurr].toFixed(2);
}
</script>

<style scoped></style>
