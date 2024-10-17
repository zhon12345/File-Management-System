import axios from "axios";

const baseURL = "http://localhost:8080";
const URL = "/api/files";

const http = axios.create({
	baseURL: baseURL,
});

class FileService {
	upload(data) {
		return http.post(`${URL}/upload`, data);
	}

	getAll() {
		return http.get(`${URL}`);
	}

	search(query) {
		return http.get(`${URL}?query=${query}`);
	}

	download(id) {
		return http.get(`${URL}/${id}/download`, {
			responseType: "blob",
		});
	}

	view(id) {
		return `${baseURL}${URL}/${id}/view`;
	}

	rename(id, name) {
		return http.put(`${URL}/${id}/rename`, { name });
	}

	delete(id) {
		return http.delete(`${URL}/${id}/delete`);
	}
}

export default new FileService();
