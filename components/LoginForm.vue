<script setup>
// import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useNuxtApp } from "#app";
// import { useRouter } from "vue-router";


const email = ref("");
const password = ref("");
const emailerror = ref("");
const passworderror = ref("");

const router = useRouter();
const toast = useToast();
const { $axios } = useNuxtApp();

// Auto-fill user data when component loads
onMounted(() => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && isAuthenticated) {
    email.value = storedUser.email || "";
  } else {
    email.value = "";
    password.value = "";
  }
});

// Validate Form
const validateForm = () => {
  emailerror.value = "";
  passworderror.value = "";

  if (!email.value) {
    emailerror.value = "Please enter your email address.";
    return false;
  } else if (!email.value.includes("@")) {
    emailerror.value = "Please enter a valid email address.";
    return false;
  }

  if (!password.value) {
    passworderror.value = "Please enter your password";
    return false;
  } else if (password.value.length < 8) {
    passworderror.value = "Password must be at least 8 characters long.";
    return false;
  }

  return true;
};

// Submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await $axios.post("/users/login", {
      email: email.value,
      password: password.value,
    });

    const { token, user } = response.data;

    // store the authentication token in localstorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("isAuthenticated", "true");

    toast.success("Login successful!", { position: "top-right" });

    // redirect to mybucket after success
    setTimeout(() => {
      router.push("/MyBucket");
    }, 2000);
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    toast.error("Invalid email or password!", { position: "top-right" });
  }
};
</script>

<template>
  <div class="flex flex-col items-center min-h-screen p-4">
    <div class="w-full max-w-md">
      <!-- main -->
      <div class="mt-10 leading-6 mx-5">
        <h1 class="font-display text-2xl font-bold">Welcome back,</h1>
        <p class="mt-5 mb-5 font-display text-md">
          Hi, my name is Eventful Moments, I am a bucket… no, not the bucket of
          water but I store awesome moments you will like to have in coming
          years.
        </p>
      </div>
      <div>
        <!-- form -->
        <form @submit="handleSubmit" class="mt-5 mx-5">
          <div class="mb-4">
            <label for="Email" class="font-display block mb-2">Email</label>
            <input
              type="email"
              name="Email"
              id="Email"
              v-model="email"
              class="block w-full py-2 px-3 border border-gray-600 rounded-sm focus:outline-none"
            />
            <p v-if="emailerror" class="text-red-500 text-xs mt-1">
              {{ emailerror }}
            </p>
          </div>
          <div class="mb-4">
            <label for="Password" class="font-display block mb-2"
              >Password</label
            >
            <input
              type="Password"
              name="Password"
              id="Password"
              v-model="password"
              class="block w-full py-2 px-3 border border-gray-600 rounded-sm focus:outline-none"
            />
            <p v-if="passworderror" class="text-red-500 text-xs mt-1">
              {{ passworderror }}
            </p>
          </div>
          <div class="flex items-center justify-center">
            <button
              type="submit"
              class="bg-[#5271FF] p-3 rounded-sm w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>