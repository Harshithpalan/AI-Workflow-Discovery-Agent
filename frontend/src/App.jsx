import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:5000/api';

function App() {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDiscoverModal, setShowDiscoverModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    steps: []
  });

  const [discoverConfig, setDiscoverConfig] = useState({
    source: '',
    context: ''
  });

  // Fetch workflows on component mount
  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/workflows`);
      setWorkflows(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workflows');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/workflows`, newWorkflow);
      setWorkflows([...workflows, response.data]);
      setShowCreateModal(false);
      setNewWorkflow({ name: '', description: '', steps: [] });
    } catch (err) {
      setError('Failed to create workflow');
      console.error(err);
    }
  };

  const handleDiscoverWorkflow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/workflows/discover`, discoverConfig);
      setWorkflows([...workflows, response.data]);
      setShowDiscoverModal(false);
      setDiscoverConfig({ source: '', context: '' });
    } catch (err) {
      setError('Failed to discover workflow');
      console.error(err);
    }
  };

  const handleDeleteWorkflow = async (id) => {
    try {
      await axios.delete(`${API_URL}/workflows/${id}`);
      setWorkflows(workflows.filter(w => w.id !== id));
      if (selectedWorkflow?.id === id) {
        setSelectedWorkflow(null);
      }
    } catch (err) {
      setError('Failed to delete workflow');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#f59e0b';
      case 'pending': return '#6b7280';
      case 'discovered': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>AI Workflow Discovery Agent</h1>
        <p>Discover, analyze, and manage your business workflows</p>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Workflows</h2>
            <div className="button-group">
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                + New
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDiscoverModal(true)}
              >
                Discover
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading workflows...</div>
          ) : (
            <div className="workflow-list">
              {workflows.map(workflow => (
                <div
                  key={workflow.id}
                  className={`workflow-item ${selectedWorkflow?.id === workflow.id ? 'active' : ''}`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="workflow-info">
                    <h3>{workflow.name}</h3>
                    <p>{workflow.description}</p>
                  </div>
                  <div className="workflow-meta">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(workflow.status) }}
                    >
                      {workflow.status}
                    </span>
                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkflow(workflow.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <main className="main-content">
          {selectedWorkflow ? (
            <div className="workflow-detail">
              <div className="detail-header">
                <h2>{selectedWorkflow.name}</h2>
                <span 
                  className="status-badge large"
                  style={{ backgroundColor: getStatusColor(selectedWorkflow.status) }}
                >
                  {selectedWorkflow.status}
                </span>
              </div>
              <p className="description">{selectedWorkflow.description}</p>
              
              <div className="steps-section">
                <h3>Workflow Steps</h3>
                <div className="steps-list">
                  {selectedWorkflow.steps.map((step, index) => (
                    <div key={step.id} className="step-item">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">
                        <h4>{step.name}</h4>
                        <span 
                          className="step-status"
                          style={{ color: getStatusColor(step.status) }}
                        >
                          {step.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedWorkflow.source && (
                <div className="source-info">
                  <h3>Discovery Source</h3>
                  <p><strong>Source:</strong> {selectedWorkflow.source}</p>
                  {selectedWorkflow.context && (
                    <p><strong>Context:</strong> {selectedWorkflow.context}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h2>Select a workflow to view details</h2>
              <p>Choose a workflow from the sidebar or create a new one</p>
            </div>
          )}
        </main>
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Workflow</h2>
              <button onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            <form onSubmit={handleCreateWorkflow}>
              <div className="form-group">
                <label>Workflow Name</label>
                <input
                  type="text"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discover Workflow Modal */}
      {showDiscoverModal && (
        <div className="modal-overlay" onClick={() => setShowDiscoverModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Discover Workflow</h2>
              <button onClick={() => setShowDiscoverModal(false)}>×</button>
            </div>
            <form onSubmit={handleDiscoverWorkflow}>
              <div className="form-group">
                <label>Data Source</label>
                <input
                  type="text"
                  placeholder="e.g., Database, API, File System"
                  value={discoverConfig.source}
                  onChange={(e) => setDiscoverConfig({...discoverConfig, source: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Context (optional)</label>
                <textarea
                  placeholder="Additional context for discovery"
                  value={discoverConfig.context}
                  onChange={(e) => setDiscoverConfig({...discoverConfig, context: e.target.value})}
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowDiscoverModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Discover</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
