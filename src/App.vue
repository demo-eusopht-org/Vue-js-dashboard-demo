<!-- @format -->

<template>
	<div>
		<navheader v-if="isAuthenticated" />
		<router-view />
	</div>
</template>

<script setup>
import { ref, provide } from "vue"
import NavHeader from "./components/NavHeader.vue"
import { useRouter } from "vue-router"

const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true")

const authenticate = () => {
	isAuthenticated.value = true
	localStorage.setItem("isAuthenticated", "true")
}

provide("authenticate", authenticate)
provide("isAuthenticated", isAuthenticated)
</script>

<style scoped>
/* Add your styles here */
</style>

