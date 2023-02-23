<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import { format, subMinutes } from 'date-fns';

const food = ref('');
const stage = ref(0);
const wakeUpTime = ref('07:00');

const requiredMinutes = computed(() => {
  if (/cereal/i.test(food.value)) return 2;
  if (/oatmeal/i.test(food.value)) return 45;
  if (/pancake/i.test(food.value)) return 25;
  return 5;
});

const alarmTime = computed(() => {
  const [hours, minutes] = wakeUpTime.value.split(':');
  const date1 = new Date();
  date1.setHours(Number(hours));
  date1.setMinutes(Number(minutes));

  const date2 = subMinutes(date1, requiredMinutes.value);
  return format(date2, 'h:mm a');
});

const sayParagraph = (id) => {
  const el = document.getElementById(`p${id}`);
  const msg = new SpeechSynthesisUtterance(el.textContent);
  window.speechSynthesis.speak(msg);
};

watch(
  () => stage.value,
  (newVal) => nextTick(() => sayParagraph(newVal))
);

const image = 'goat.png';
</script>

<template>
  <div
    class="h-[100vh] flex bg-pink-50 bg-no-repeat bg-left-bottom"
    :style="{ backgroundImage: 'url(' + image + ')' }"
  >
    <div class="m-auto mt-32 max-w-md text-center">
      <button
        v-if="stage === 0"
        class="ring-indigo-900 ring-4 bg-indigo-200 py-4 px-6 rounded-xl hover:bg-indigo-400 transition-colors"
        @click="stage = 1"
      >
        Start C.A.R.R.Y.
      </button>
      <Transition name="app-fade">
        <form v-if="stage >= 1" @submit.prevent="stage = 2">
          <p id="p1" class="text-2xl">
            Hello! What would you like to eat tomorrow morning?
          </p>
          <input
            v-model="food"
            type="text"
            class="rounded w-full mt-8"
            autofocus
          />
        </form>
      </Transition>
      <Transition name="app-fade">
        <div v-if="stage >= 2" class="flex flex-col">
          <p id="p2" class="mt-10">
            I think it will take
            <span class="font-bold">{{ requiredMinutes }}</span>
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
              class="bg-indigo-400 w-12 hover:bg-indigo-500 transition-colors border-y border-r border-indigo-500 rounded-tr rounded-br"
              @click="stage = 3"
            >
              OK
            </button>
          </div>
        </div>
      </Transition>
      <Transition name="app-fade">
        <div v-if="stage >= 3" class="flex flex-col">
          <p id="p3" class="mt-10">
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
