<script setup>
import { useNuxtApp } from "#app";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

onMounted(() => {
  notyf = new Notyf();
});

// const toast = useNuxtApp().$toast;

const router = useRouter();
const fullname = ref("");
const email = ref("");
const password = ref("");
const fullnameerror = ref("");
const emailerror = ref("");
const passworderror = ref("");

const { $axios } = useNuxtApp();


// Form validation
const validateForm = () => {
  fullnameerror.value = "";
  emailerror.value = "";
  passworderror.value = "";

  if (!fullname.value) {
    fullnameerror.value = "Please enter your full name";
    return false;
  }

  if (!email.value.includes("@")) {
    emailerror.value = "Please enter a valid email address";
    return false;
  } else if (!email.value.includes("@")) {
    emailerror.value = 'Email address must contain a "@" symbol';
    return false;
  } else {
    emailerror.value = "";
  }

  if (!password.value) {
    passworderror.value = "Please enter password";
    return false;
  } else if (password.value.length < 8) {
    passworderror.value = "Password must be at least 8 characters long";
    return false;
  } else {
    passworderror.value = "";
  }

  return true;
};

// Form submission
const handleSubmit = async (event) => {
  event.preventDefault();

  if (validateForm()) {
    try {
      const response = await $axios.post(
        "https://eventful-moments-api.onrender.com/api/v1/users/signup",
        {
          fullname: fullname.value,
          email: email.value,
          password: password.value,
        }
      );

      const { token, user } = response.data;

      // store auth token and user data in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("isAuthenticated", true);

      notyf.success("Registration Successful! Redirecting to Login...");
      // toast.success("Registration Successful! Redirecting to Login...", {
      //   position: "top-right",
      // });

      // redirect to login page
      router.push("/");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      notyf.error("Registration Failed! Please try again");
      // toast.error("Registration Failed! Please try again", {
      //   position: "top-right",
      // });
    }
  }
};

// custom layout is used for this page
definePageMeta({
  layout: "custom",
});
</script>
<template>
  <div>
    <div class="flex flex-col items-center">
      <div class="w-96 my-5">
        <!-- main -->
        <div class="mx-3 mt-15 w-110 leading-6">
          <h1 class="font-display text-2xl font-bold">Create an account,</h1>
        </div>
        <div>
          <!-- form -->
          <form @submit="handleSubmit" class="mt-5">
            <div class="mx-3">
              <div>
                <label for="FullName" class="font-display text-xs"
                  >Full Name</label
                >
                <input
                  type="text"
                  name="FullName"
                  id="FullName"
                  v-model="fullname"
                  class="block w-90 md:min-w-110 grow py-1.5 pr-3 pl-1 mt-3 mb-3 border border-gray-600 rounded-sm focus:outline-none font-display text-xs"
                />
                <p v-if="fullnameerror" class="text-red-500 text-xs ml-2">
                  {{ fullnameerror }}
                </p>
              </div>
              <div>
                <label for="Email" class="font-display text-xs">Email</label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  v-model="email"
                  class="block w-90 md:min-w-110 grow py-1.5 pr-3 pl-1 mt-3 mb-3 border border-gray-600 rounded-sm focus:outline-none font-display text-xs"
                />
                <p v-if="emailerror" class="text-red-500 text-xs ml-2">
                  {{ emailerror }}
                </p>
              </div>
              <div>
                <label for="Password" class="font-display text-xs"
                  >Password</label
                >
                <input
                  type="Password"
                  name="Password"
                  id="Password"
                  v-model="password"
                  class="block w-90 md:min-w-110 grow py-1.5 pr-3 pl-1 mt-3 mb-3 border border-gray-600 rounded-sm focus:outline-none font-display text-xs"
                />
                <p v-if="passworderror" class="text-red-500 text-xs ml-2">
                  {{ passworderror }}
                </p>
              </div>
              <div class="flex items-center justify-center">
                <button
                  type="submit"
                  class="bg-[#5271FF] p-3 rounded-sm w-30 mt-5 text-white font-display text-sm font-bold align-center text-center"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
