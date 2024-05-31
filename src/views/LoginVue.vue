<!-- @format -->

<template>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div
			class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<div
				class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1
						class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						Sign in to your account
					</h1>
					<form
						@submit.prevent="login"
						class="space-y-4 md:space-y-6">
						<div>
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Your email</label
							>
							<input
								type="text"
								name="email"
								id="email"
								v-model="username"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@company.com"
								required />
							<div
								v-if="errors.username"
								class="text-red-500 text-sm"
								>{{ errors.username }}</div
							>
						</div>
						<div>
							<label
								for="password"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Password</label
							>
							<input
								type="password"
								name="password"
								id="password"
								v-model="password"
								placeholder="••••••••"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required />
							<div
								v-if="errors.password"
								class="text-red-500 text-sm"
								>{{ errors.password }}</div
							>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-start">
								<div class="flex items-center h-5">
									<input
										id="remember"
										aria-describedby="remember"
										type="checkbox"
										v-model="remember"
										class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
								</div>
								<div class="ml-3 text-sm">
									<label
										for="remember"
										class="text-gray-500 dark:text-gray-300"
										>Remember me</label
									>
								</div>
							</div>
							<a
								href="#"
								class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
								>Forgot password?</a
							>
						</div>
						<button
							type="submit"
							class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
							Sign in
						</button>
						<p
							class="text-sm font-light text-gray-500 dark:text-gray-400">
							Don’t have an account yet?
							<a
								href="#"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>Sign up</a
							>
						</p>
					</form>
					<div v-if="flashMessage" class="mt-4 text-red-500">{{
						flashMessage
					}}</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, reactive, inject } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const authenticate = inject("authenticate")

const username = ref("")
const password = ref("")
const remember = ref(false)
const errors = reactive({
	username: "",
	password: "",
})
const flashMessage = ref("")

async function login() {
	if (!username.value || !password.value) {
		flashMessage.value = "Please enter both username and password."
		return
	}

	try {
		const formData = new FormData()
		formData.append("username", username.value)
		formData.append("password", password.value)

		const response = await fetch("http://127.0.0.1:8000/api/user/login", {
			method: "POST",
			body: formData,
		})

		const responseData = await response.json()

		if (response.ok) {
			localStorage.setItem("token", responseData.access_token)
			localStorage.setItem("user", JSON.stringify(responseData.user))

			authenticate()

			router.push("/dashboard")
		} else {
			flashMessage.value =
				responseData.message ||
				"Invalid login attempt. Please try again!"
		}
	} catch (error) {
		flashMessage.value =
			"An unexpected error occurred. Please try again later."
	}
}
</script>

<style scoped>
/* Add your styles here */
</style>
