<!-- @format -->

<template>
	<div class="container mx-auto px-4 py-16">
		<div class="bg-white p-12 rounded-lg shadow-md max-w-4xl mx-auto">
			<h2 class="text-3xl font-bold mb-6 text-center">Add Manager</h2>
			<form @submit.prevent="submitForm">
				<div v-if="flashMessage" class="alert alert-primary mb-6">
					{{ flashMessage }}
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-lg"
						>Name <span class="text-red-500">*</span></label
					>
					<input
						v-model="form.name"
						type="text"
						class="form-input mt-1 block w-full p-2 h-12 border-solid border border-gray-300"
						placeholder="Enter a name" />

					<span v-if="errors.name" class="text-red-500 text-sm">{{
						errors.name[0]
					}}</span>
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 p-2 text-lg"
						>Username <span class="text-red-500">*</span></label
					>
					<input
						v-model="form.username"
						type="text"
						class="form-input mt-1 block w-full p-2 h-12 border-solid border border-gray-300"
						placeholder="Enter a username" />
					<span v-if="errors.username" class="text-red-500 text-sm">{{
						errors.username[0]
					}}</span>
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 p-2 text-lg"
						>Email <span class="text-red-500">*</span></label
					>
					<input
						v-model="form.email"
						type="email"
						class="form-input mt-1 block w-full p-2 h-12 border-solid border border-gray-300"
						placeholder="Enter an email" />
					<span v-if="errors.email" class="text-red-500 text-sm">{{
						errors.email[0]
					}}</span>
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-lg"
						>Password <span class="text-red-500">*</span></label
					>
					<input
						v-model="form.password"
						type="password"
						class="form-input mt-1 block w-full p-2 h-12 border-solid border border-gray-300"
						placeholder="Enter a password"  />
					<span v-if="errors.password" class="text-red-500 text-sm">{{
						errors.password[0]
					}}</span>
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-lg"
						>Confirm Password
						<span class="text-red-500">*</span></label
					>
					<input
						v-model="form.password_confirmation"
						type="password"
						class="form-input mt-1 p-2 block w-full border-solid border border-gray-300 h-12"
						placeholder="Confirm your password" />
					<span
						v-if="errors.password_confirmation"
						class="text-red-500 text-sm"
						>{{ errors.password_confirmation[0] }}</span
					>
				</div>
				<div class="flex items-center justify-between">
					<button
						type="submit"
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>Submit</button
					>
					<router-link
						to="/managers"
						class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						>Cancel</router-link
					>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import config from "../config"
import { useRouter } from "vue-router"

import { useToast } from "vue-toast-notification"
import "vue-toast-notification/dist/theme-sugar.css"
const $toast = useToast()

const router = useRouter()

const form = ref({
	name: "",
	username: "",
	email: "",
	password: "",
	password_confirmation: "",
})

const errors = ref({})
const flashMessage = ref("")

const submitForm = async () => {
	try {
		const formData = new FormData()
		formData.append("name", form.value.name)
		formData.append("username", form.value.username)
		formData.append("email", form.value.email)
		formData.append("password", form.value.password)
		formData.append(
			"password_confirmation",
			form.value.password_confirmation
		)

		const response = await fetch(
			`${config.api_base_url}/api/create-managers`,
			{
				method: "POST",
				body: formData,
			}
		)

		const responseData = await response.json()

		if (!response.ok) {
			if (responseData && responseData.errors) {
				errors.value = responseData.errors
			} else {
				throw new Error(response.statusText)
			}
		} else {
			$toast.success("Mangers Added Successfully", {})
			flashMessage.value = responseData.message
			form.value = {
				name: "",
				username: "",
				email: "",
				password: "",
				password_confirmation: "",
			}
			errors.value = {}
		}
	} catch (error) {
		console.error(error)
		// Handle other errors, such as network errors
		flashMessage.value = "An error occurred while processing your request."
	}
}
</script>

<style scoped></style>
