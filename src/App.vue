<script setup>
import { ref, computed } from 'vue';

const food = ref('');
const stage = ref(0);
const wakeUpTime = ref('07:00');

const time = computed(() => {
  if (/cereal/i.test(food.value)) return 2;
  if (/oatmeal/i.test(food.value)) return 45;
  if (/pancake/i.test(food.value)) return 25;
  return 5;
});

const alarmTime = computed(() => '06:00am');
</script>

<template>
  <div class="h-[100vh] flex bg-pink-100">
    <div class="m-auto mt-32 max-w-md text-center">
      <form @submit.prevent="stage = 1">
        <p class="text-2xl">
          Hello! What would you like to eat tomorrow morning?
        </p>
        <input
          v-model="food"
          type="text"
          class="rounded w-full mt-8"
          autofocus
        />
      </form>
      <Transition name="app-fade">
        <div v-if="stage >= 1" class="flex flex-col">
          <p class="mt-10">
            I think it will take
            <span class="font-bold">{{ time }}</span>
            minutes to prepare your
            <span class="font-bold">{{ food }}</span
            >. What time would you like to be ready by in the morning?
          </p>
          <div class="flex mt-4 mx-auto">
            <input
              v-model="wakeUpTime"
              type="time"
              class="rounded-tl rounded-bl"
            />
            <button
              class="bg-blue-400 w-12 hover:bg-blue-500 transition-colors border-y border-r border-blue-500 rounded-tr rounded-br"
              @click="stage = 2"
            >
              OK
            </button>
          </div>
        </div>
      </Transition>
      <Transition name="app-fade">
        <div v-if="stage >= 2" class="flex flex-col">
          <p class="mt-10">
            Got it! I'll set your alarm for
            <span class="font-bold">{{ alarmTime }}</span>
            tomorrow, so you can eat your
            <span class="font-bold">{{ food }}</span> and be ready on time.
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>
