<script setup>
import axios from "axios";

import { useNuxtApp } from "#app";

const toast = useNuxtApp().$toast;

const route = useRoute();
const router = useRouter();

const momentTitle = ref("");
const momentDate = ref("");
const momentDetails = ref("");
const momentNotFound = ref(false);

const fetchMomentDetails = async () => {
  try {
    console.log("Route params:", route.params); // Debugging statement
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `https://eventful-moments-api.onrender.com/api/v1/moment/${route.params._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response.data); // Debugging statement
    const moment = response.data.data;

    momentTitle.value = moment.title;
    momentDate.value = new Date(moment.futureDate).toLocaleDateString();
    momentDetails.value = moment.details;
  } catch (error) {
    console.error(
      "Fetch moment details error:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.status === 404) {
      momentNotFound.value = true;
      toast.error("Moment not found for this user", {
        position: "top-right",
      });
    } else {
      toast.error("Failed to fetch moment details! Please try again", {
        position: "top-right",
      });
    }
  }
};

const deleteMoment = async () => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(
      `https://eventful-moments-api.onrender.com/api/v1/moment/${route.params._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Moment deleted successfully!", {
      position: "top-right",
    });
    router.push("/MyBucket"); // Redirect to MyBucket page after deletion
  } catch (error) {
    console.error(
      "Delete moment error:",
      error.response ? error.response.data : error.message
    );
    toast.error("Failed to delete moment! Please try again", {
      position: "top-right",
    });
  }
};

onMounted(() => {
  fetchMomentDetails();
});
</script>

<template>
  <div>
    <div v-if="momentNotFound" class="mx-5 md:mx-15 my-10 md:my-9">
      <h1 class="text-black font-display font-bold text-xl">
        Moment Not Found
      </h1>
      <p class="text-[#5271FF] text-xs font-display mt-2">
        The moment you are looking for does not exist or has been deleted.
      </p>
    </div>
    <div v-else>
      <!-- Event title -->
      <div class="mx-5 md:mx-15 my-10 md:my-9">
        <h1 class="text-black font-display font-bold text-xl">
          {{ momentTitle }}
        </h1>
        <p class="text-[#5271FF] text-xs font-display mt-2">{{ momentDate }}</p>
      </div>

      <!-- Event details -->
      <div class="mx-5 md:mx-15 my-9">
        <div class="text-black text-md font-display mb-10 text-justify">
          {{ momentDetails }}
        </div>
      </div>

      <!-- Delete and Edit buttons -->
      <div class="flex items-center gap-5 mx-15 my-9">
        <NuxtLink
          :to="`/edit-moment/${route.params._id}`"
          class="bg-[#5271FF] p-3 rounded-md w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
        >
          Edit
        </NuxtLink>

        <button
          @click="deleteMoment"
          class="bg-[#C34F06] p-3 rounded-md w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
