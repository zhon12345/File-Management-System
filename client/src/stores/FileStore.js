import { defineStore } from "pinia";
import FileService from "@/services/FileService";

export const useFileStore = defineStore("file", {
	state: () => ({
		files: [],
	}),
	actions: {
		async fetchFiles() {
			try {
				const response = await FileService.getAll();
				this.files = response.data;
			} catch (err) {
				console.log(`Error fetching files: ${err.message}`);
			}
		},
		async uploadFiles(formData) {
			try {
				await FileService.upload(formData);
				await this.fetchFiles();
			} catch (err) {
				console.log(`Error uploading file: ${err.message}`);
			}
		},
		async searchFiles(query) {
			try {
				const response = await FileService.search(query);
				this.files = response.data;
			} catch (err) {
				console.log(`Error searching files: ${err.message}`);
			}
		},
		async downloadFile(id, name, ext) {
			try {
				const response = await FileService.download(id);

				const url = window.URL.createObjectURL(new Blob([response.data]));

				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", `${name}${ext}`);

				document.body.appendChild(link);
				link.click();

				link.remove();
				window.URL.revokeObjectURL(url);
			} catch (err) {
				console.log(`Error downloading file: ${err.message}`);
			}
		},
		viewFile(id) {
			return FileService.view(id);
		},
		async renameFile(id, name) {
			try {
				await FileService.rename(id, name);
				await this.fetchFiles();
			} catch (err) {
				console.log(`Error renaming file: ${err.message}`);
			}
		},
		async deleteFile(id) {
			try {
				await FileService.delete(id);
				await this.fetchFiles();
			} catch (err) {
				console.log(`Error deleting file: ${err.message}`);
			}
		},
	},
});
