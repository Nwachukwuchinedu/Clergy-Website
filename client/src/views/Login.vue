<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  // Reset error message
  errorMessage.value = "";

  // Validate inputs
  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all fields";
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid email or password");
    }

    // Store the token (using localStorage for simplicity)
    localStorage.setItem("authToken", data.token);

    // Store user data if needed
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // Redirect to home/dashboard
    router.push("/");
  } catch (error: any) {
    errorMessage.value = error.message || "Login failed. Please try again.";
    console.error("Login error:", error);
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
            <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
            <p class="text-neutral-600">
              Sign in to access your account and continue learning
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
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
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-neutral-700"
                >
                  Remember me
                </label>
              </div>

              <router-link
                to="/forgot-password"
                class="text-sm text-primary-600 hover:text-primary-500"
              >
                Forgot password?
              </router-link>
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
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-neutral-600">
            Don't have an account?
            <router-link
              to="/signup"
              class="text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign up
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
