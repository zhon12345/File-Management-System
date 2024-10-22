# File Management System (Client Side)

The client side code for the **File Management System**, built using **Vue.js**, which offers a simple and familiar user-interface. The frontend supports essential file management features, including file uploads, downloads, renaming and deletion.

## Technologies Used

-   **Vue.js:** Frontend framework for UI development.
-   **Vue-Router:** Manages seamless client-side routing.
-   **Pinia:** State management solution for reactive data handling.
-   **Axios**: Handles API requests to the server.
-   **Bootstrap:** CSS framework for responsive design styling.

## Future Improvements

-   [ ] **Dark Mode**: Automatically detect and use default system theme.
-   [ ] **Responsive Design:** Ensure usability across different devices and screen sizes.
-   [ ] **Folder Support:** Allow users to create and upload folders for better organization.
-   [x] **Grid & List View:** Add option to toggle between list and grid view.
-   [ ] **View File Information:** Allow detailed information about upload files to be viewed.
-   [ ] **Sort & Filter Files:** Implement sorting and filtering by various criteria.
-   [ ] **Upload/Download Indicators:** Display visual progress bars for file uploads and downloads.
-   [ ] **Bulk Actions:** Select multiple files to Download, Move, or Delete.
-   [ ] **Drag-and-Drop Uploads:** Provide an intuitive drag-and-drop area for easier file uploading.

## Installation

To setup the client side, follow the steps below:

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/prebuilt-installer)

### Setup

1. Clone the repository

```bash
  https://github.com/zhon12345/File-Management-System.git
```

2. Navigate to the `client` directory

```bash
  cd File-Management-System/client
```

3. Install dependencies:

```bash
  npm install
```

4. Start the development server:

```bash
  npm run dev
```

5. Open your browser and enter the url given by vite. The default should be `http://localhost:5173`

## Usage

-   **Upload Files:** Click on the "New" Button on the top right and select "File Upload" from the dropdown. It is possible to upload multiple files at once.

-   **Download Files:** Click the "more" button and select "Download" from the dropdown, the download will start automatically.

-   **Rename Files:** Click the "more" button, select "Rename" from the dropdown and enter the new name into the space provided.

-   **Delete Files:** Click the "more" button, select "Delete" from the dropdown and click on "Delete forever" to confirm the action.
