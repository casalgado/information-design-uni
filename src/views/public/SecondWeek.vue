<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { Bar } from "vue-chartjs";
import { useAuthStore } from "@/stores/authStore";
import { phoneInfo } from "@/lib/cv"; // Promise that fetches phone info
import { secondWeek } from "@/lib/cv"; // Promise that fetches phone info
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
const rawData = ref({ week_one: [], week_two: [] }); // Store fetched data here
const data = ref({}); // Reactive data and options for the chart
const names = ref([]);
const activeName = ref();
const apps = ref([
  "Tiktok",
  "Tiktok2",
  "Instagram",
  "Instagram2",
  "Whatsapp",
  "Whatsapp2",
  "Twitter",
  "Twitter2",
  "Navegador",
  "Navegador2",
  "Youtube",
  "Youtube2",
  "Spotify",
  "Spotify2",
  "Streaming",
  "Streaming2",
  "Facebook",
  "Facebook2",
  "Juegos",
  "Juegos2",
]);
const activeApps = ref([
  "Tiktok",
  "Tiktok2",
  "Instagram",
  "Instagram2",
  "Whatsapp",
  "Whatsapp2",
  "Twitter",
  "Twitter2",
  "Navegador",
  "Navegador2",
  "Youtube",
  "Youtube2",
  "Spotify",
  "Spotify2",
  "Streaming",
  "Streaming2",
  "Facebook",
  "Facebook2",
  "Juegos",
  "Juegos2",
]);

const colors = {
  Tiktok: "#333333",
  Tiktok2: "#666666", // More contrasted
  Instagram: "#FF00FF",
  Instagram2: "#FF66FF", // More contrasted
  Whatsapp: "#3C873A",
  Whatsapp2: "#6FAF6D", // More contrasted
  Twitter: "#69B3F5",
  Twitter2: "#99D0FF", // More contrasted
  Navegador: "#FF9900",
  Navegador2: "#ffc163", // More contrasted
  Youtube: "#FF0000",
  Youtube2: "#FF6666", // More contrasted
  Spotify: "#1ED760",
  Spotify2: "#66E891", // More contrasted
  Streaming: "#9B59B6",
  Streaming2: "#C39BD3", // More contrasted
  Facebook: "#0D47A1",
  Facebook2: "#1976D2", // More contrasted
  Juegos: "#F1C40F",
  Juegos2: "#F7DC6F", // More contrasted
};

// Functions to fetch and process data
async function fetchData() {
  const res = await phoneInfo;
  const res_two = await secondWeek;
  rawData.value.week_one = res;
  rawData.value.week_two = res_two;
  console.log("res_two", res_two);
  names.value = [
    ...new Set(
      res_two.filter((e) => e.Tiktok2 !== "").map((item) => item.Nombre)
    ),
  ].sort();
  activeApps.value = apps.value;
  loading.value = false;
}

function calculateTotals(dataset, activeApps) {
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
  const filtered = rawData.value.week_one.filter(
    (item) => item.Nombre === activeName.value
  );
  const filtered_two = rawData.value.week_two.filter(
    (item) => item.Nombre === activeName.value
  );
  console.log("f1", filtered);
  console.log("f2", filtered_two);
  const topApps = getTopApps(
    filtered.filter((e) => e.Dia == "Consolidado")[0],
    4
  );
  let keysToInclude = topApps.map((e) => [e, e + 2]).flat();
  activeApps.value = topApps.map((e) => [e, e + 2]).flat();
  keysToInclude.push("Dia");
  keysToInclude.push("Consecutivo");
  keysToInclude.push("Nombre");
  console.log("topApps", topApps);
  let combined = [...filtered, ...filtered_two];
  combined = combined.map((item) => {
    return Object.fromEntries(
      Object.entries(item).filter(([key]) => keysToInclude.includes(key))
    );
  });
  console.log("combined", combined);
  data.value = calculateTotals(combined, activeApps.value);
  console.log("data", data.value);
}

// computed property to draw chart

const chartData = computed(() => {
  const labels = Object.keys(data.value).filter((day) => day !== "Consolidado");
  const datasets = activeApps.value.map((app) => ({
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

function getTopApps(data, number) {
  // Extract app usage data, convert values to numbers, sort, and get top 4 apps
  console.log("data", data);
  return Object.entries(data)
    .filter(
      ([key, value]) =>
        !["Consecutivo", "Dia", "Nombre", "Total por Dia"].includes(key)
    )
    .map(([app, usage]) => [app, Number(usage)])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([app]) => app);
}

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
        <p style="display: none">Aplicación</p>
        <div style="display: none" class="filters">
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
  width: 1200px;
  margin: 0 auto;
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
}
</style>
