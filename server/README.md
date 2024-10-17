# File Management System (Server Side)

The server-side code for the **File Management System**. It is responsible for handling file uploads, storage, deletion, and interaction with the database. The server is built using **Node.js** and **Express**, with **MySQL** as the database.

## Technologies Used

-   **Node.js:** Backend JavaScript runtime.
-   **Express.js:** Web framework for Node.js apps.
-   **Multer:** Middleware for handling file uploads.
-   **MySQL**: Open-source SQL database for file metadata.
    storing

## Future Improvements

-   [ ] **Security Enhancements**: Implement authorization headers and tokens for secure API access.
-   [ ] **Folder Support:** Enable the creation and upload of folders for better organization.
-   [ ] **Preview Support:** Extend support for file previews including common formats like PDFs.
-   [ ] **Throttling and Rate Limits**: Prevent abuse by limiting number of file upload and downloads in a given time frame.
-   [ ] **File Compression**: Automatically compress files during uploads to optimize storage usage.

## Installation

To run the server locally, follow these steps:

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/prebuilt-installer)
-   [MySQL](https://dev.mysql.com/doc/refman/5.7/en/installing.html)

### Setup

1. Clone the repository

```bash
  https://github.com/zhon12345/File-Management-System.git
```

2. Navigate to the `client` directory

```bash
  cd File-Management-System/server
```

3. Install dependencies:

```bash
  npm install
```

4. Update the MySQL config in `app/config/db.config.js` accordingly.

5. Start the server:

```bash
  npm run dev
```

5. The server will run on `http://localhost:8080` by default.

## API Endpoints

-   **POST** `/api/files/upload`: Upload files, with the server handling validation and saving. A success or error message is returned base on the result.

-   **GET** `/api/files`: Retrieve all files or filter using `?query=` to search for matching file name or extensions.

-   **GET** `/api/files/:id/:action`: `:id` refers to the file's ID, and `:action` is either `download` or `view`. This triggers a file download or opens it for viewing.

-   **PUT** `/api/files/:id/rename`: Rename a file by providing its `:id` and the new name in the request body. The filename is updated in the database.

-   **DELETE** `/api/files/:id/delete`: Permanently delete a file using its `:id`. A success or error message will confirm the result.
