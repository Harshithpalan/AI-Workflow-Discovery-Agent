# AI Workflow Discovery Agent

A web application for discovering, analyzing, and managing business workflows with AI-powered automation capabilities.

## Features

- **Workflow Discovery**: Automatically discover workflows from various data sources
- **Workflow Management**: Create, view, update, and delete workflows
- **Visual Workflow Display**: View workflow steps with status indicators
- **Responsive Design**: Modern, clean UI that works on desktop and mobile
- **RESTful API**: Node.js/Express backend with full CRUD operations

## Tech Stack

### Frontend
- React (with Vite)
- Axios for API calls
- CSS3 with modern styling

### Backend
- Node.js
- Express.js
- CORS enabled
- Environment variable configuration

## Project Structure

```
AI Workflow Discovery Agent/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── App.css        # Component styles
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open in Browser**
   Navigate to `http://localhost:5173` to use the application

## API Endpoints

### Workflows

- `GET /api/workflows` - Get all workflows
- `GET /api/workflows/:id` - Get a specific workflow by ID
- `POST /api/workflows` - Create a new workflow
- `PUT /api/workflows/:id` - Update a workflow
- `DELETE /api/workflows/:id` - Delete a workflow
- `POST /api/workflows/discover` - Discover a workflow from a data source

### Example Request Bodies

**Create Workflow:**
```json
{
  "name": "Customer Onboarding",
  "description": "Process for onboarding new customers",
  "steps": []
}
```

**Discover Workflow:**
```json
{
  "source": "Database",
  "context": "Customer data table"
}
```

## Usage

1. **View Workflows**: The sidebar displays all available workflows
2. **Create Workflow**: Click the "+ New" button to create a manual workflow
3. **Discover Workflow**: Click the "Discover" button to use AI-powered discovery
4. **View Details**: Click on any workflow to see its steps and details
5. **Delete Workflow**: Click the "×" button on a workflow to delete it

## Development

### Backend Development
- Server file: `backend/server.js`
- Port configured in `backend/.env`
- Uses in-memory data storage (can be extended to use a database)

### Frontend Development
- Main component: `frontend/src/App.jsx`
- Styles: `frontend/src/App.css`
- API URL configured in `App.jsx` (currently `http://localhost:5000/api`)

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL)
- Implement real AI workflow discovery using ML models
- Add user authentication and authorization
- Export workflows to various formats (JSON, XML, BPMN)
- Add workflow execution and monitoring
- Implement workflow versioning
- Add collaborative features for team workflow management

## License

ISC
