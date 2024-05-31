<template>
	<div class="container mx-auto p-4 h-screen">
		<!-- First row with gradient cards -->
		<div class="grid grid-cols-2 gap-4 mb-4">
			<div
				class="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-6 rounded-lg shadow-md">
				<h2 class="text-2xl">Projects</h2>
				<p class="text-4xl">{{ projectsCount }}</p>
			</div>
			<div
				class="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow-md">
				<h2 class="text-2xl">Employees</h2>
				<p class="text-4xl">{{ employeesCount }}</p>
			</div>
		</div>

		<!-- Second row with tables -->
		<div class="grid grid-cols-2 gap-4">
			<!-- Today's Attendance Table -->
			<div class="bg-white p-6 rounded-lg shadow-md">
				<h2 class="text-xl mb-4">Today's Attendance</h2>
				<vue-good-table
					:columns="attendanceColumns"
					:rows="attendanceRows"
				/>
			</div>

			<!-- Project Stage Table -->
			<div class="bg-white p-6 rounded-lg shadow-md">
				<h2 class="text-xl mb-4">Project Stage</h2>
				<vue-good-table
					:columns="projectStageColumns"
					:rows="projectStageRows"
					max-height="500px"
					 
					:pagination-options="{ enabled: true }"
					:search-options="{ enabled: true }"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
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
	{ label: "Updated By", field: "updatedBy" },
	{ label: "Date Time", field: "dateTime", width: '100px', thClass: 'items-center'},
])

const projectStageRows = ref([])

const projectsCount = ref(0)
const employeesCount = ref(0)

onMounted(async () => {
	try {
		const response = await axios.get("http://localhost:8000/api/get-home")
		const data = response.data

		projectsCount.value = data.projects.length
		employeesCount.value = data.attendanceLogs.length

		// Populate attendanceRows
		attendanceRows.value = data.attendanceLogs.map((log, index) => ({
			sNo: index + 1,
			name: log.name,
			project: log.project,
			projectId: log.projectId,
			activity: log.activity,
			status: log.status,
			date: log.date,
		}))

		// Populate projectStageRows
		projectStageRows.value = data.projects.map((project, index) => ({
			sNo: index + 1,
			project: project.name,
			projectId: project.project_id,
			customer: project.customer_id,  // Adjust according to your actual data
			stage: project.stage,
			expectedHours: project.e_time,
			completedHours: project.completed_hours,  // Adjust according to your actual data
			updatedBy: project.updated_by,
			dateTime: project.updated_at,
		}))
	} catch (error) {
		console.error("Failed to fetch data:", error)
	}
})
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
