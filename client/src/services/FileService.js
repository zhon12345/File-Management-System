import axios from "axios";

const baseURL = "http://localhost:8080";
const URL = "/api/files";

const http = axios.create({
	baseURL: baseURL,
});

class FileService {
	upload(data) {
		return http.post(`${URL}`, data);
	}

	getAll() {
		return http.get(`${URL}`);
	}

	search(query) {
		return http.get(`${URL}?query=${query}`);
	}

	download(id) {
		return http.get(`${URL}/${id}/content?download`, {
			responseType: "blob",
		});
	}

	view(id) {
		return `${baseURL}${URL}/${id}/content`;
	}

	rename(id, name) {
		return http.patch(`${URL}/${id}`, { name });
	}

	delete(id) {
		return http.delete(`${URL}/${id}`);
	}
}

export default new FileService();
