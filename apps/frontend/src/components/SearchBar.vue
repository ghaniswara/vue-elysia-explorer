<script setup lang="ts">
import { api } from 'libs/src/eden';
import { AutoCompleteCompleteEvent, AutoComplete } from 'primevue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { folderTree } from 'backend/src/model/folder'


const route = useRoute()
const username = (route.params.path)
const folders = ref<folderTree[]>([]);
const selectedCountry = ref<folderTree | null>(null);
const filteredCountries = ref<folderTree[]>([]);
const customDT = ref({
    overlay: {
        color: 'red'
    }
});


const search = (event: AutoCompleteCompleteEvent) => {
    setTimeout(async () => {
        if (event.query.trim().length) {
                const response = await api.api.v1.folders[username as string].search.get({
                    $query: {
                        search: event.query
                    }
                })
                console.log(response)
                console.log(event.query)
                folders.value = response?.data?.data ?? []
                filteredCountries.value = folders.value
        }
    }, 250);
}


</script>

<template>
    <div class="test h-10"></div>

    <div class="w-full h-full flex flex-col bg-white p-2 items-center justify-center">
        <AutoComplete class="w-full" v-model="selectedCountry" optionLabel="name" :suggestions="filteredCountries"
            @complete="search" placeholder="Search File or Directory" :dt="customDT">
            <template #option="slotProps">
                <div
                    class="flex flex-row gap-2 bg-gray-50 rounded-md p-2 w-full my-[0.25rem] hover:bg-gray-100 text-sm">
                    <div class="flex items-center justify-center">
                        📁
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm text-gray-800">{{ slotProps.option.name }}</span>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="flex flex-col gap-2 bg-gray-50 w-full rounded-md p-2 shadow-md">
                    <span class="text-sm">No results found</span>
                </div>
            </template>

            <template #footer v-if="filteredCountries?.length > 0">
                <button class="
        hover:bg-gray-100
        px-4 py-2 rounded-md border border-black bg-white text-black text-sm 
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] 
        transition-colors duration-200">
                    View results in explorer
                </button>
            </template>

            <template #loader>
                <div class="bg-pink-900"></div>
            </template>
        </AutoComplete>

    </div>
</template>