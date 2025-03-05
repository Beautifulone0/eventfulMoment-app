<script setup>
import axios from "axios";
import { useNuxtApp } from "#app";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

let notyf;

onMounted(() => {
  notyf = new Notyf();
});
// const toast = useNuxtApp().$toast;

const route = useRoute();
const router = useRouter();


const date = ref("");
const title = ref("");
const details = ref("");

const fetchMomentDetails = async () => {
  try {
    console.log("Route params:", route.params); // Debugging statement
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `https://eventful-moments-api.onrender.com/api/v1/moment/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const moment = response.data.data;
    date.value = moment.futureDate.split("T")[0]; // Format date for input
    title.value = moment.title;
    details.value = moment.details;
  } catch (error) {
    console.error(
      "Fetch moment details error:",
      error.response ? error.response.data : error.message
    );
    notyf.error("Failed to fetch moment details! Please try again");
    // $toast.error("Failed to fetch moment details! Please try again", {
    //   position: "top-right",
    // });
  }
};

const updateMoment = async () => {
  try {
    console.log("Updating moment with ID:", route.params.id);
    console.log(
      "Update API URL:",
      `https://eventful-moments-api.onrender.com/api/v1/moment/${route.params.id}`
    ); // Debugging statement
    const token = localStorage.getItem("authToken");
    await axios.patch(
      `https://eventful-moments-api.onrender.com/api/v1/moment/${route.params.id}`,
      {
        futureDate: date.value,
        title: title.value,
        details: details.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    notyf.success("Moment updated successfully!");
    // $toast.success("Moment updated successfully!", {
    //   position: "top-right",
    // });
    router.push(`/single-moment/${route.params.id}`); // Redirect to the moment details page after update
  } catch (error) {
    console.error(
      "Update moment error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    notyf.error("Failed to update moment! Please try again");
  //   $toast.error("Failed to update moment! Please try again", {
  //     position: "top-right",
  //   });
  }
};

onMounted(() => {
  fetchMomentDetails();
});
</script>

<template>
  <div>
    <!-- Edit Item -->
    <div>
      <form @submit.prevent="updateMoment" class="mx-4 md:mx-10 my-5 p-5">
        <div>
          <label for="Date" class="font-display text-black text-md"
            >Date in the future</label
          >
          <input
            type="date"
            name="Date"
            id="Date"
            v-model="date"
            class="border border-gray-500 focus:outline-none w-80 md:w-100 h-8 block rounded-sm text-sm font-display text-black mt-3 mb-3 p-3"
          />
        </div>
        <div>
          <label for="Title" class="font-display text-black text-md"
            >Title</label
          >
          <input
            type="text"
            name="Title"
            id="Title"
            v-model="title"
            class="border border-gray-500 focus:outline-none w-80 md:w-100 h-8 block rounded-sm text-sm font-display text-black mt-3 mb-3 p-3"
          />
        </div>
        <div>
          <label for="Details" class="font-display text-black text-md"
            >Details</label
          >
          <textarea
            name="Details"
            id="Details"
            cols="30"
            rows="10"
            v-model="details"
            class="border border-gray-500 focus:outline-none w-80 md:w-100 block rounded-sm text-xs font-display text-black p-3"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="bg-[#5271FF] p-3 rounded-md w-30 mt-5 mx-25 text-white font-display text-sm font-bold border border-gray-500 text-center"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
