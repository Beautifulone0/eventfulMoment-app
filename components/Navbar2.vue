<script setup></script>
<template>
    <div>
    <!-- Nav Bar -->
    <div>
      <div
        class="navbar bg-[#008289] flex items-center justify-between w-full p-5"
      >
        <div class="title">
          <h1
            class="font-display text-md text-white opacity-100 italic font-bold"
          >
            Eventful Moments.
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-5">
            <li class="font-display text-sm text-white">
              <NuxtLink to="/">Logout</NuxtLink >
            </li>
            <li class="font-display text-sm text-white">
              <NuxtLink to="/myBucket">My Bucket</NuxtLink >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>