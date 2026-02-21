# File Management System (Server Side)

The server-side code for the **File Management System**. It handles file uploads, storage, deletion, and interaction with the database. The server is built using **Node.js** and **Express**, with **MySQL** as the database.

## Technologies Used

- **Node.js:** Backend JavaScript runtime.
- **Express.js:** Web framework for Node.js apps.
- **Multer:** Middleware for handling file uploads.
- **MySQL**: Open-source SQL database for storing file metadata.

## Future Improvements

- [ ] **Security Enhancements**: Implement authorization headers and tokens for secure API access.
- [ ] **Folder Support:** Enable the creation and upload of folders for better organization.
- [ ] **Preview Support:** Extend support for file previews including common formats like PDFs.
- [ ] **Throttling and Rate Limits**: Prevent abuse by limiting number of file uploads and downloads in a given time frame.
- [ ] **File Compression**: Automatically compress files during uploads to optimize storage usage.

## API Endpoints

- **POST** `/api/files`: Upload file(s). The server validates and saves files. Successful uploads returns HTTP 201 with success message and the number of files uploaded.

- **GET** `/api/files`: Retrieve all files. Use `?query=` to search by file name or extension.

- **GET** `/api/files/:id/content`: Get the file content for viewing or download. To download, include the `download` query parameter. Without `download`, the file is returned for viewing.

- **PATCH** `/api/files/:id`: Rename a file by providing the new name in the request body. The filename stored in the database is updated.

- **DELETE** `/api/files/:id`: Permanently delete a file. The file is removed from disk and its record is deleted from the database. Success or error messages are returned.
