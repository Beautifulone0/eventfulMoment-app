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

const router = useRouter();

const futureDate = ref("");
const title = ref("");
const details = ref("");
const futureDateError = ref("");
const titleError = ref("");
const detailsError = ref("");

// form validation
const validateForm = () => {
  futureDateError.value = "";
  titleError.value = "";
  detailsError.value = "";

  if (!futureDate.value) {
    futureDateError.value = "Please enter a future date";
    return false;
  }

  if (!title.value) {
    titleError.value = "Please enter a title";
    return false;
  }

  if (!details.value) {
    detailsError.value = "Please enter details";
    return false;
  }

  return true;
};

// form submission
const handleSubmit = async (event) => {
  event.preventDefault();

  if (validateForm()) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await $axios.post(
        "https://eventful-moments-api.onrender.com/api/v1/moment",
        {
          futureDate: futureDate.value,
          title: title.value,
          details: details.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notyf.success("Event added successfully!");
      // $toast.success("Event added successfully!", {
      //   position: "top-right",
      // });

      // redirect to mybucket page
      router.push("/MyBucket");
    } catch (error) {
      console.error(
        "Add item error:",
        error.response ? error.response.data : error.message
      );
      notyf.error("Failed to add item! Please try again");
      // $toast.error("Failed to add item! Please try again", {
      //   position: "top-right",
      // });
    }
  }
};
</script>
<template>
  <div>
    <!-- Add Item -->
    <div>
      <form @submit="handleSubmit" class="mx-5 md:mx-10 my-10 p-5">
        <div>
          <label for="Date" class="font-display text-black text-md"
            >Date in the future</label
          >
          <input
            type="date"
            name="Date"
            id="Date"
            v-model="futureDate"
            class="border border-gray-500 focus:outline-none w-80 h-8 block rounded-sm text-sm font-display text-black mt-3 mb-3"
          />
          <p v-if="futureDateError" class="text-red-500 text-xs">
            {{ futureDateError }}
          </p>
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
            class="border border-gray-500 focus:outline-none w-80 h-8 block rounded-sm text-sm font-display text-black mt-3 mb-3"
          />
          <p v-if="titleError" class="text-red-500 text-xs">{{ titleError }}</p>
        </div>
        <div>
          <label for="Details" class="font-display text-black text-md"
            >Details</label
          >
          <textarea
            name="Details"
            id="Details"
            v-model="details"
            cols="30"
            rows="10"
            class="border border-gray-500 focus:outline-none w-80 block rounded-sm text-sm font-display text-black"
          ></textarea>
          <p v-if="detailsError" class="text-red-500 text-xs">
            {{ detailsError }}
          </p>
        </div>
        <div>
          <button
            type="submit"
            class="bg-[#5271FF] p-3 rounded-md w-30 mt-5 mx-25 text-white font-display text-sm font-bold border border-gray-500 text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
