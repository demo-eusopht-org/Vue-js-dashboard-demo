@format

<template>
	<div class="container mx-auto p-4 h-screen">
		<!-- First row with gradient cards -->
		<div class="grid grid-cols-2 gap-4 mb-4">
			<div
				class="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-6 rounded-lg shadow-md">
				<h2 class="text-2xl">Projects</h2>
				<p class="text-4xl">0</p>
			</div>
			<div
				class="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow-md">
				<h2 class="text-2xl">Employees</h2>
				<p class="text-4xl">0</p>
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
					:pagination-options="{
						enabled: true,
					}" 
					:search-options="{
						enabled: true,
					}" 
          />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import "vue-good-table-next/dist/vue-good-table-next.css"
import { VueGoodTable } from "vue-good-table-next"

// Register the VueGoodTable component
const attendanceColumns = ref([
	{ label: "S. No", field: "sNo" },
	{ label: "Name", field: "name" },
	{ label: "Project", field: "project" },
	{ label: "Project ID", field: "projectId" },
	{ label: "Activity", field: "activity" },
	{ label: "Status", field: "status" },
	{ label: "Date", field: "date" },
])

const attendanceRows = ref([])

const projectStageColumns = ref([
	{ label: "S. No", field: "sNo" },
	{ label: "Project", field: "project" },
	{ label: "Project ID", field: "projectId" },
	{ label: "Customer", field: "customer" ,thClass: 'items-center justify-center'},
	{ label: "Stage", field: "stage" },
	{ label: "Expected Hours", field: "expectedHours" },
	{ label: "Current Hours", field: "completedHours" },
	{ label: "Updated By", field: "updatedby" },
	{ label: "Date Time", field: "datetime", width: '100px', thClass: 'items-center'},
])

const projectStageRows = ref([
  {
    sNo: 1,
    project: "Project Alpha",
    projectId: "PA-001",
    customer: "John Doe",
    stage: "Initiation",
    expectedHours: 10,
    completedHours: 5,
    updatedby: "Admin",
    datetime: "2022-01-01 10:00:00"
  },
  {
    sNo: 2,
    project: "Project Bravo",
    projectId: "PB-002",
    customer: "Jane Smith",
    stage: "Planning",
    expectedHours: 20,
    completedHours: 10,
    updatedby: "Manager",
    datetime: "2022-01-05 14:00:00"
  },
  {
    sNo: 3,
    project: "Project Charlie",
    projectId: "PC-003",
    customer: "Bob Johnson",
    stage: "Execution",
    expectedHours: 30,
    completedHours: 20,
    updatedby: "Team Lead",
    datetime: "2022-01-10 16:00:00"
  },
  {
    sNo: 1,
    project: "Project Alpha",
    projectId: "PA-001",
    customer: "John Doe",
    stage: "Initiation",
    expectedHours: 10,
    completedHours: 5,
    updatedby: "Admin",
    datetime: "2022-01-01 10:00:00"
  },
  
 
])
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
