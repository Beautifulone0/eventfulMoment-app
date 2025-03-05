<script setup>
import { useNuxtApp } from "#app";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

let notyf;

onMounted(() => {
  notyf = new Notyf();
});
// const toast = useNuxtApp().$toast;

const { $axios } = useNuxtApp();

const userName = ref("user");
const events = ref([]);
const visibleEvents = ref(4); // show 4 events

// Fetch user data from localStorage

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("Retrieved user data:", userData); // Debugging step

  if (userData) {
    userName.value = (userData.fullname || userData.fullName || "User").toUpperCase();
  }

  fetchEvents();
});

// onMounted(() => {
//   const userData = JSON.parse(localStorage.getItem("user"));
//   if (userData && userData.fullName) {
//     userName.value = userData.fullName.toUpperCase();
//   } 

//   fetchEvents();
// });

// Fetch events from the API
const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await $axios.get("/moment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response.data); // Log the API response
    events.value = response.data.data[0].data || []; // Ensure events is an array
    console.log("Fetched events:", events.value); // Log the fetched events
  } catch (error) {
    console.error(
      "Fetch events error:",
      error.response ? error.response.data : error.message
    );
    notyf.error("Failed to fetch events! Please try again");
    // $toast.error("Failed to fetch events! Please try again", {
    //   position: "top-right",
    // });
  }
};

// get visible events
const displayedEvents = computed(() => {
  return events.value.slice(0, visibleEvents.value);
});

// load more events
const loadMore = () => {
  visibleEvents.value += 4; // Increase the number of visible events by 4
};
</script>

<template>
  <div>
    <!-- Event Buckets header & add item button -->
    <div
      class="flex flex-col md:flex-row items-center md:justify-between mx-5 md:mx-20 my-9"
    >
      <div>
        <h1 class="font-display text-xl font-bold text-black">
          Welcome {{ userName }}.
        </h1>
        <p class="font-display text-sm text-black">
          Here are items in your eventful moment bucket.
        </p>
        <div v-if="events && events.length === 0" class="mt-5">
          <p class="font-display text-sm text-black">No events found.</p>
        </div>
      </div>

      <NuxtLink to="/AddItem">
        <button
          class="bg-[#5271FF] p-3 rounded-md w-30 mt-5 text-white font-display text-sm font-bold align-center text-center hover:border hover:border-gray-600"
        >
          Add Item
        </button>
      </NuxtLink>
    </div>

    <!-- Event Buckets details -->
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mx-5 md:mx-20 my-9">
        <div
          v-for="event in displayedEvents"
          :key="event._id"
          class="bg-white shadow-lg hover:bg-[#FFF5A7] p-6 md:p-5"
        >
          <div>
            <h2 class="font-display font-bold text-sm text-black mb-5">
              {{ event.title }}
            </h2>
            <p class="font-display text-xs text-black mb-5 text-justify">
              {{ event.details }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="`/single-moment/${event._id}`"
              class="text-[#5271FF]"
            >
              View Details
            </NuxtLink>
            <div class="flex items-center gap-5">
              <p class="text-gray-600 text-sm">
                {{ new Date().toLocaleDateString() }}
              </p>
              <p class="text-black text-sm">
                {{ new Date(event.futureDate).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <button
        @click="loadMore"
        class="bg-[#5271FF] p-3 rounded-sm w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<!-- In the code above, we have a  MyBucket.vue  component that fetches events from the API and displays them in a list. The component uses the  fetchEvents  method to fetch events from the API and store them in the  events  ref. The  displayedEvents  computed property is used to get the visible events based on the  visibleEvents  ref. The  loadMore  method is used to increase the number of visible events by 4 when the "Load More" button is clicked. 
 The component also displays a welcome message with the user's name and a button to add a new event. The events are displayed in a grid layout with each event showing the title, details, and dates.-->
