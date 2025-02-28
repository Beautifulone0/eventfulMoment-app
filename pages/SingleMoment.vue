<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const momentTitle = ref('');
const momentDate = ref('');
const momentDetails = ref('');

const fetchMomentDetails = async () => {
  try {
    console.log('Route params:', route.params); // Debugging statement
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/${route.params._id}`);
    console.log('API response:', response.data); // Debugging statement
    const moment = response.data.data;

    momentTitle.value = moment.title;
    momentDate.value = new Date(moment.futureDate).toLocaleDateString();
    momentDetails.value = moment.details;
  } catch (error) {
    console.error('Fetch moment details error:', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchMomentDetails();
});
</script>

<template>
  <div>
    <!-- Event title -->
    <div class="mx-5 md:mx-15 my-10 md:my-9">
      <h1 class="text-black font-display font-bold text-xl">{{ momentTitle }}</h1>
      <p class="text-[#5271FF] text-xs font-display mt-2">{{ momentDate }}</p>
    </div>
    
    <!-- Event details -->
     <div class="mx-5 md:mx-15 my-9">
      <div class="text-black text-md font-display mb-10 text-justify">
        {{ momentDetails }}
      </div>
     </div>

     <!-- Debugging: Display raw data -->
     <div class="mx-5 md:mx-15 my-9">
      <pre>{{ momentDetails }}</pre>
     </div>

     <!-- Delete and Edit buttons -->
      <div class=" flex items-center gap-5 mx-15 my-9">
        <NuxtLink
    
          class="bg-[#5271FF] p-3 rounded-md w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
        >
          Edit
        </NuxtLink>

        <button
          class="bg-[#C34F06]  p-3 rounded-md w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
        > 
          Delete
        </button>
      </div>
  </div>
</template>