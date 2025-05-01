<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const apiUrl = import.meta.env.VITE_APP_API_URL;

const handleSignup = async () => {
  // Reset error message
  errorMessage.value = "";

  // Validate inputs
  if (
    !name.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = "Please fill in all fields";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords don't match";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters";
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Registration successful - redirect to login or dashboard
    router.push("/login");
  } catch (error: any) {
    errorMessage.value =
      error.message || "Registration failed. Please try again.";
    console.error("Signup error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <!-- Main content -->
    <main class="flex-grow flex items-center py-12">
      <div class="container mx-auto px-4 max-w-md">
        <div class="bg-white rounded-xl shadow-md p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">Create an Account</h1>
            <p class="text-neutral-600">
              Join our community to access all teachings and resources
            </p>
          </div>

          <form @submit.prevent="handleSignup" class="space-y-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-neutral-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-neutral-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-neutral-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
              />
              <p class="mt-1 text-xs text-neutral-500">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label
                for="confirm-password"
                class="block text-sm font-medium text-neutral-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
              />
            </div>

            <div v-if="errorMessage" class="text-red-500 text-sm text-center">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              class="w-full btn btn-primary"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Sign Up</span>
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-neutral-600">
            Already have an account?
            <router-link
              to="/login"
              class="text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign in
            </router-link>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-neutral-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
