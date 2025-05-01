<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTeachingStore } from "../store/teachingStore";
import { useSeriesStore } from "../store/seriesStore";
import HeroBanner from "../components/HeroBanner.vue";
import TeachingCard from "../components/TeachingCard.vue";
import SeriesCard from "../components/SeriesCard.vue";
import NewsletterSignup from "../components/NewsletterSignup.vue";
import type { Teaching, Series } from "../types";

const router = useRouter();
const teachingStore = useTeachingStore();
const seriesStore = useSeriesStore();

const latestTeaching = ref<Teaching | null>(null);
const featuredSeries = ref<Series[]>([]);

onMounted(async () => {
  // Fetch latest teaching
  await teachingStore.fetchTeachings({}, 1, 1);
  if (teachingStore.teachings.length > 0) {
    latestTeaching.value = teachingStore.teachings[0];
  }

  // Fetch featured series
  await seriesStore.fetchAllSeries();
  if (seriesStore.allSeries.length > 0) {
    // Get up to 3 series for the featured section
    featuredSeries.value = seriesStore.allSeries.slice(0, 3);
  }
});

const navigateToTeaching = (slug: string) => {
  router.push(`/teaching/${slug}`);
};
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroBanner
      :title="latestTeaching ? latestTeaching.title : null"
      :subtitle="
        latestTeaching
          ? `Part of the series: ${latestTeaching.seriesName}`
          : undefined
      "
      ctaText="Read Latest Teaching"
      :ctaLink="latestTeaching ? `/teaching/${latestTeaching.slug}` : null"
      bgImage="https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      overlay
    />

    <!-- Latest Teaching Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-2">Latest Teaching</h2>
          <p class="text-neutral-600 max-w-2xl mx-auto">
            Fresh biblical insights to encourage and strengthen your faith
          </p>
        </div>

        <div v-if="teachingStore.isLoading" class="flex justify-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
          ></div>
        </div>

        <div
          v-else-if="!latestTeaching"
          class="text-center py-12 text-neutral-500"
        >
          <p>No teachings available at the moment. Please check back later.</p>
        </div>

        <div v-else class="max-w-4xl mx-auto">
          <TeachingCard :teaching="latestTeaching" size="large" />
        </div>

        <div class="text-center mt-10">
          <router-link to="/teachings" class="btn btn-outline">
            View All Teachings
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Series Section -->
    <section class="py-16 bg-neutral-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-2">Featured Series</h2>
          <p class="text-neutral-600 max-w-2xl mx-auto">
            Explore collections of teachings around key biblical themes
          </p>
        </div>

        <div v-if="seriesStore.isLoading" class="flex justify-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
          ></div>
        </div>

        <div
          v-else-if="featuredSeries.length === 0"
          class="text-center py-12 text-neutral-500"
        >
          <p>No series available at the moment. Please check back later.</p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div v-for="series in featuredSeries" :key="series.id">
            <SeriesCard :series="series" />
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/series" class="btn btn-outline">
            View All Series
          </router-link>
        </div>
      </div>
    </section>

    <!-- Pastor Bio Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl font-bold mb-4">About Pastor Michael</h2>
              <p class="text-neutral-700 mb-4">
                Pastor Michael Johnson has been teaching the Word of God for
                over 20 years, helping believers deepen their understanding of
                Scripture and apply biblical principles to everyday life.
              </p>
              <p class="text-neutral-700 mb-6">
                With a passion for clear, practical Bible teaching, Pastor
                Michael focuses on helping Christians grow in their faith and
                find hope in God's promises.
              </p>
              <router-link to="/about" class="btn btn-primary">
                Learn More About Pastor Michael
              </router-link>
            </div>
            <div class="order-1 md:order-2">
              <img
                src="https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Pastor Michael Johnson"
                class="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-primary-800 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p class="mb-8">
            Receive weekly teachings, event notifications, and spiritual
            encouragement straight to your inbox.
          </p>
          <NewsletterSignup color="dark" />
        </div>
      </div>
    </section>
  </div>
</template>
