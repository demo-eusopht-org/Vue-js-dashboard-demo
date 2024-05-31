<template>
	<div class="container mx-auto p-4 h-screen">
	  <!-- First row with gradient cards -->
	  <div class="grid grid-cols-2 gap-4 mb-4">
		<div class="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-6 rounded-lg shadow-md">
		  <h2 class="text-2xl">Projects</h2>
		  <p class="text-4xl">{{ projectCount }}</p>
		</div>
		<div class="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow-md">
		  <h2 class="text-2xl">Employees</h2>
		  <p class="text-4xl">{{ employeeCount }}</p>
		</div>
	  </div>
  
	  <!-- Second row with tables -->
	  <div class="grid grid-cols-2 gap-4">
		<!-- Todays Attendance Table -->
		<div class="bg-white p-6 rounded-lg shadow-md">
		  <h2 class="text-xl mb-4">Todays Attendance</h2>
		  <vue-good-table
			:columns="attendanceColumns"
			:rows="attendanceRows" />
		</div>
  
		<!-- Project Stage Table -->
		<div class="bg-white p-6 rounded-lg shadow-md">
		  <h2 class="text-xl mb-4">Project Stage</h2>
		  <vue-good-table
			:columns="projectStageColumns"
			:rows="projectStageRows"
			:pagination-options="{ enabled: true }"
			:search-options="{ enabled: true }" 
		  />
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import 'vue-good-table-next/dist/vue-good-table-next.css';
  import { VueGoodTable } from 'vue-good-table-next';
  
  // Data and columns definition
  const projectCount = ref(0);
  const employeeCount = ref(0);
  
  const attendanceColumns = ref([
	{ label: "S. No", field: "sNo" },
	{ label: "Name", field: "name" },
	{ label: "Project", field: "project" },
	{ label: "Project ID", field: "projectId" },
	{ label: "Activity", field: "activity" },
	{ label: "Status", field: "status" },
	{ label: "Date", field: "date" },
  ]);
  
  const attendanceRows = ref([]);
  
  const projectStageColumns = ref([
	{ label: "S. No", field: "sNo" },
	{ label: "Project", field: "project" },
	{ label: "Project ID", field: "projectId" },
	{ label: "Customer", field: "customer" },
	{ label: "Stage", field: "stage" },
	{ label: "Expected Hours", field: "expectedHours" },
	{ label: "Current Hours", field: "completedHours" },
	{ label: "Updated By", field: "updatedby" },
	{ label: "Date Time", field: "datetime" },
  ]);
  
  const projectStageRows = ref([]);
  
  // Fetch data from the backend
  onMounted(async () => {
	try {
	  const response = await fetch('http://127.0.0.1:8000/api/home');
	  const data = await response.json();
	  projectCount.value = data.projects.length;
	  employeeCount.value = data.employees.length;
	  attendanceRows.value = data.attendanceLogs.map((log, index) => ({
		sNo: index + 1,
		name: log.created_by,
		project: log.project_id,
		projectId: log.project_id,
		activity: log.activity_id,
		status: log.check_in_out,
		date: log.created_at,
	  }));
	  projectStageRows.value = data.projectLogs.map((project, index) => ({
		sNo: index + 1,
		project: project.name,
		projectId: project.id,
		customer: project.customer_id,
		stage: project.stage,
		expectedHours: project.expected_hours,
		completedHours: project.completed_hours,
		updatedby: project.updated_by,
		datetime: project.updated_at,
	  }));
	} catch (error) {
	  console.error('Failed to fetch data:', error);
	}
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  