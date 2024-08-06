<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { Bar } from "vue-chartjs";
import { useAuthStore } from "@/stores/authStore";
import { phoneInfo } from "@/lib/cv"; // Promise that fetches phone info
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  scales,
} from "chart.js";
import TheSpinner from "@/components/TheSpinner.vue";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Initialize auth store
const authStore = useAuthStore();

// Initialize state variables
const loading = ref(true);
const rawData = ref([]); // Store fetched data here
const names = ref([]);
const activeName = ref();
const apps = ref([
  "Tiktok",
  "Instagram",
  "Whatsapp",
  "Twitter",
  "Navegador",
  "Youtube",
  "Spotify",
  "Streaming",
  "Facebook",
  "Juegos",
]);
const activeApps = ref([
  "Tiktok",
  "Instagram",
  "Whatsapp",
  "Twitter",
  "Navegador",
  "Youtube",
  "Spotify",
  "Streaming",
  "Facebook",
  "Juegos",
]);

const colors = {
  Tiktok: "#333333",
  Instagram: "#FF00FF",
  Whatsapp: "#3C873A",
  Twitter: "#69B3F5",
  Navegador: "#FF9900",
  Youtube: "#FF0000",
  Spotify: "#1ED760",
  Streaming: "#9B59B6",
  Facebook: "#0D47A1",
  Juegos: "#F1C40F",
};

// Functions to fetch and process data
async function fetchData() {
  const res = await phoneInfo;
  rawData.value = res;
  names.value = [...new Set(res.map((item) => item.Nombre))].sort();
  data.value = calculateTotals(res.filter((item) => item.Nombre === ""));
  activeApps.value = apps.value;
  loading.value = false;
}

function calculateTotals(dataset, activeApps) {
  console.log(dataset);
  return dataset.reduce((totals, entry) => {
    if (!entry.Nombre || !entry.Dia) return totals;

    if (!totals[entry.Dia]) {
      totals[entry.Dia] = {};
      for (let i = 0; i < activeApps.length; i++) {
        const element = activeApps[i];
        totals[entry.Dia][element] = 0;
      }
    }

    for (const app in totals[entry.Dia]) {
      totals[entry.Dia][app] += Number(entry[app] || 0) / 60;
    }

    return totals;
  }, {});
}

// Reactive data and options for the chart
const data = ref({});

// Methods for filtering data
function filterByName(name) {
  loading.value = true;
  activeName.value = name;
  updateData();
  loading.value = false;
}

function filterByApp(app) {
  loading.value = true;
  if (activeApps.value.length === apps.value.length) {
    activeApps.value = [app];
  } else if (activeApps.value.includes(app)) {
    activeApps.value = activeApps.value.filter((item) => item !== app);
  } else {
    activeApps.value = [...activeApps.value, app];
  }

  if (app === "Todas") {
    activeApps.value = apps.value;
  }

  updateData();
  loading.value = false;
}

function updateData() {
  const filtered = rawData.value.filter(
    (item) => item.Nombre === activeName.value
  );
  data.value = calculateTotals(filtered, activeApps.value);
}

// computed property to draw chart

const chartData = computed(() => {
  const labels = Object.keys(data.value).filter((day) => day !== "Consolidado");
  const datasets = apps.value.map((app) => ({
    label: app,
    backgroundColor: colors[app],
    data: labels.map((day) => data.value[day][app] || 0),
  }));

  return { labels, datasets };
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Uso de Aplicación por Dia" },
  },
  scales: {
    y: {
      max: 16,
      title: {
        display: true,
        text: "Horas por día",
      },
    },
  },
});

// Lifecycle hook
onBeforeMount(fetchData);
</script>

<template>
  <TheSpinner :loading="loading" />

  <!-- && authStore.isSignedIn -->
  <section
    class="container"
    :class="`${!loading && authStore.isSignedIn ? 'show' : 'hide'}`"
  >
    <div class="section-content">
      <div class="filters_wrapper">
        <p>Nombre</p>
        <div class="filters">
          <div v-for="name in names" :key="name">
            <p
              @click="filterByName(name)"
              :class="activeName == name ? 'selected' : ''"
            >
              {{ name }}
            </p>
          </div>
        </div>
        <p>Aplicación</p>
        <div class="filters">
          <div v-for="app in apps" :key="app">
            <p
              @click="filterByApp(app)"
              :class="activeApps.includes(app) ? 'selected' : ''"
            >
              {{ app }}
            </p>
          </div>
          <div v-if="activeApps.length !== apps.length">
            <p @click="filterByApp('Todas')" style="border-radius: 0px">
              Todas
            </p>
          </div>
        </div>
      </div>

      <div class="data">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  transition: all 0.5s;
}

.section-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.selected {
  background-color: gray;
  color: white;
}

.filters_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 10px 0px;
  }
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  p {
    margin: 0px;
    font-size: 0.8rem;
    text-transform: lowercase;
    border: 1px solid gray;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
  }

  p:hover {
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.8);
    color: white;
  }
}

.data {
  max-width: 1200px;
  margin: 0 auto;
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
}
</style>
