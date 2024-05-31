<!-- @format -->

<template>
	<div class="flex bg-light-100">
		<div
			id="default-sidebar"
			class="flex w-[15%] bg-light-200"
			aria-label="Sidebar">
			<div
				class="h-full pb-4 overflow-y-auto w-full bg-gray-200 dark:bg-gray-800">
				<router-link
					to="/dashboard"
					class="h-20 bg-purple-400 flex justify-center items-center"
					exact
					active-class="active-link">
					<img :src="logo" alt="Logo" class="w-[130px]" />
				</router-link>

				<ul class="space-y-2">
					<li>
						<p class="text-black w-full pl-3 py-4 text-lg bg-white"
							>Accounts Management</p
						>
						<router-link
							to="/managers"
							exact
							active-class="bg-slate-100"
							class="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
							<svg
								class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 21">
								<path
									d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
								<path
									d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
							</svg>
							<span class="ms-3 text-lg">Create Manager</span>
						</router-link>

						<router-link
							to="#"
							class="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p group">
							<svg
								class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 18">
								<path
									d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
							</svg>
							<span class="ms-3 text-lg">Disable Manager</span>
						</router-link>
					</li>
					<li>
						<p class="text-black w-full pl-3 py-4 text-lg bg-white"
							>Customer Management</p
						>
						<router-link
							to="#"
							class="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
							<svg
								class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 21">
								<path
									d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
								<path
									d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
							</svg>
							<span class="ms-3 text-lg">Create Customer</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>

		<div class="flex-1">
			<nav class="bg-light-0 shadow-lg h-20 items-center">
				<div
					class="flex items-center justify-between flex-row-reverse py-4 px-2 w-full h-full text-lg">
					<!-- Navbar links -->
					<div class="items-center">
						<nav>
							<router-link
								to="/about"
								class="text-black px-3 py-2 hover:bg-gray-700"
								>About</router-link
							>
							<router-link
								to="/login"
								class="text-black px-3 py-2 hover:bg-gray-700"
								>Logout</router-link
							>
						</nav>
					</div>
					<div class="text-black">{{ formattedDateTime }}</div>
				</div>
			</nav>
			<!-- <div class="h-[100vh]"> -->
			<!-- </div> -->
			<router-view />
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import logo from "@/assets/logo.png"
const now = ref(new Date())

const formattedDateTime = computed(() => {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}
	return now.value.toLocaleDateString("en-US", options)
})
</script>

<style scoped>
/* Add your scoped styles here */
</style>
