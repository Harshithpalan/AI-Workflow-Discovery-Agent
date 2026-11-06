const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample workflow data
let workflows = [
  {
    id: 1,
    name: 'Customer Onboarding',
    description: 'Process for onboarding new customers',
    steps: [
      { id: 1, name: 'Receive application', status: 'completed' },
      { id: 2, name: 'Verify documents', status: 'in_progress' },
      { id: 3, name: 'Create account', status: 'pending' },
      { id: 4, name: 'Send welcome email', status: 'pending' }
    ],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Invoice Processing',
    description: 'Automated invoice processing workflow',
    steps: [
      { id: 1, name: 'Receive invoice', status: 'completed' },
      { id: 2, name: 'Validate invoice', status: 'completed' },
      { id: 3, name: 'Approve payment', status: 'pending' },
      { id: 4, name: 'Process payment', status: 'pending' }
    ],
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

// GET all workflows
app.get('/api/workflows', (req, res) => {
  res.json(workflows);
});

// GET single workflow by ID
app.get('/api/workflows/:id', (req, res) => {
  const workflow = workflows.find(w => w.id === parseInt(req.params.id));
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  res.json(workflow);
});

// POST create new workflow
app.post('/api/workflows', (req, res) => {
  const { name, description, steps } = req.body;
  const newWorkflow = {
    id: workflows.length + 1,
    name,
    description,
    steps: steps || [],
    status: 'active',
    createdAt: new Date().toISOString()
  };
  workflows.push(newWorkflow);
  res.status(201).json(newWorkflow);
});

// PUT update workflow
app.put('/api/workflows/:id', (req, res) => {
  const workflowIndex = workflows.findIndex(w => w.id === parseInt(req.params.id));
  if (workflowIndex === -1) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  workflows[workflowIndex] = {
    ...workflows[workflowIndex],
    ...req.body,
    id: workflows[workflowIndex].id
  };
  res.json(workflows[workflowIndex]);
});

// DELETE workflow
app.delete('/api/workflows/:id', (req, res) => {
  const workflowIndex = workflows.findIndex(w => w.id === parseInt(req.params.id));
  if (workflowIndex === -1) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  workflows.splice(workflowIndex, 1);
  res.status(204).send();
});

// Discover workflows endpoint (AI-powered simulation)
app.post('/api/workflows/discover', (req, res) => {
  const { source, context } = req.body;
  
  // Simulated AI discovery response
  const discoveredWorkflow = {
    id: workflows.length + 1,
    name: `Discovered Workflow from ${source || 'Unknown'}`,
    description: 'Automatically discovered workflow',
    steps: [
      { id: 1, name: 'Analyze source data', status: 'pending' },
      { id: 2, name: 'Identify process steps', status: 'pending' },
      { id: 3, name: 'Map dependencies', status: 'pending' },
      { id: 4, name: 'Generate workflow model', status: 'pending' }
    ],
    status: 'discovered',
    source,
    context,
    createdAt: new Date().toISOString()
  };
  
  workflows.push(discoveredWorkflow);
  res.status(201).json(discoveredWorkflow);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
