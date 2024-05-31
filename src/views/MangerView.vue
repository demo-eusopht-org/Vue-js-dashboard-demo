<template>
	<div class="container mx-auto p-4 h-screen bg-light-100">
		<div
			class="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
			<h2 class="text-2xl font-bold">Managers</h2>
			<button
				@click="addManager"
				class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
				>Add Manager</button
			>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md">
			<vue-good-table
				:columns="columns"
				:rows="rows"
        max-height="500px"
				:pagination-options="{ enabled: true, perPage: 10 }"
				:search-options="{ enabled: true, placeholder: 'Search...' }"
				class="shadow-lg rounded-lg" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import axios from "axios";
import { useRouter } from "vue-router"; // Import useRouter hook

// Define table columns
const columns = ref([
  { label: "Name", field: "name" },
  { label: "Username", field: "username" },
  { label: "Email", field: "email" },
  { label: "Created Date", field: "created_at" },
  // { label: "Operations", field: "operations" }, // No need to specify format
]);

// Define table rows
const rows = ref([]);

// Fetch managers data from API
const fetchManagers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/get-managers");
    rows.value = response.data.users.map((manager, index) => ({
      ...manager,
      created_at: new Date(manager.created_at).toLocaleString(), // Format the date
      operations: [
        {
          type: 'edit',
          id: manager.id
        },
        {
          type: 'resetPassword',
          id: manager.id
        },
        {
          type: 'disable',
          id: manager.id
        }
      ]
    }));
  } catch (error) {
    console.error("Error fetching managers:", error);
  }
};

const router = useRouter();
const addManager = () => {
  router.push('/create-manager');
};

const editManager = (id) => {
  console.log("Edit Manager with id:", id);
};

const resetPassword = (id) => {
  console.log("Reset Password for manager with id:", id);
};

const disableManager = (id) => {
  console.log("Disable Manager with id:", id);
};

const handleOperation = (type, id) => {
  switch (type) {
    case 'edit':
      editManager(id);
      break;
    case 'resetPassword':
      resetPassword(id);
      break;
    case 'disable':
      disableManager(id);
      break;
  }
};

onMounted(() => {
  fetchManagers();
});
</script>

<style scoped></style>
