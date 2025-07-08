import { Download, Edit2, Eye, FileText, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import { mockResources } from '../../../../constants'; // <-- Add this import

// Define a type for resource
type Resource = {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  status: 'active' | 'inactive';
  downloadCount: number;
  fileUrl?: string; // Add fileUrl for preview
};

const MarketingResourcesUpload = () => {
  // Use local state for resources, initialized with mock data
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [newResource, setNewResource] = useState<{
    title: string;
    description: string;
    file: File | null;
    status: 'active' | 'inactive';
    fileUrl?: string;
  }>({
    title: '',
    description: '',
    file: null,
    status: 'active',
    fileUrl: undefined
  });

  // Add ref for file input to reset after upload
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(resources.length / itemsPerPage);
  const paginatedResources = resources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      let fileUrl: string | undefined = undefined;
      if (file.type === "application/pdf") {
        fileUrl = URL.createObjectURL(file);
      }
      setNewResource({ ...newResource, file, fileUrl });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      let fileUrl: string | undefined = undefined;
      if (file.type === "application/pdf") {
        fileUrl = URL.createObjectURL(file);
      }
      setNewResource({ ...newResource, file, fileUrl });
    }
  };

  const handleUpload = async () => {
    if (!newResource.title || !newResource.description || !newResource.file) {
      alert('Please fill in all fields and select a file');
      return;
    }

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      const resource: Resource = {
        id: resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1,
        title: newResource.title,
        description: newResource.description,
        fileName: newResource.file!.name,
        fileType: newResource.file!.name.split('.').pop()?.toUpperCase() || '',
        uploadDate: new Date().toISOString().split('T')[0],
        status: newResource.status,
        downloadCount: 0,
        fileUrl: newResource.fileUrl
      };

      setResources([...resources, resource]);
      setNewResource({ title: '', description: '', file: null, status: 'active', fileUrl: undefined });
      setShowUploadModal(false);
      setIsUploading(false);
      // Reset file input value
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleStatusToggle = (id: number) => {
    setResources(resources.map(r =>
      r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
    ));
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource({ ...resource });
  };

  const handleSaveEdit = () => {
    if (!editingResource) return;
    setResources(resources.map(r =>
      r.id === editingResource.id ? editingResource : r
    ));
    setEditingResource(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing Resources Management</h1>
              <p className="text-gray-600 mt-2">Upload and manage marketing resources for B2B and Partners</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Upload New Resource</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900">{resources.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Resources</p>
                <p className="text-2xl font-bold text-green-600">{resources.filter(r => r.status === 'active').length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-purple-600">{resources.reduce((acc, r) => acc + r.downloadCount, 0)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Download className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Downloads</p>
                <p className="text-2xl font-bold text-orange-600">
                  {resources.length > 0
                    ? Math.round(resources.reduce((acc, r) => acc + r.downloadCount, 0) / resources.length)
                    : 0}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Upload className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Resources Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Current Resources</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                        <div className="text-sm text-gray-500">{resource.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{resource.fileName}</div>
                      <div className="text-sm text-gray-500">{resource.fileType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resource.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resource.downloadCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusToggle(resource.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          resource.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {resource.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* PDF/Doc Preview */}
                      {resource.fileUrl && resource.fileType === "PDF" && (
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          View PDF
                        </a>
                      )}
                      {resource.fileUrl && resource.fileType !== "PDF" && (
                        <span className="text-gray-400">No Preview</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedResources.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-4 mb-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                maxWidth: 400,
                width: '100%',
                margin: '0 1rem',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <h3
                  style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}
                >
                  Upload New Resource
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={newResource.title}
                      onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                      placeholder="Enter resource title"
                    />
                  </div>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}
                    >
                      Description
                    </label>
                    <textarea
                      value={newResource.description}
                      onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                      rows={3}
                      placeholder="Enter resource description"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}
                    >
                      File (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX)
                    </label>
                    <div
                      style={{
                        border: `2px dashed ${dragActive ? '#a78bfa' : '#d1d5db'}`,
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        textAlign: 'center',
                        background: dragActive ? '#f5f3ff' : '#fff'
                      }}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload style={{ display: 'block', margin: '0 auto', height: 48, width: 48, color: '#9ca3af' }} />
                      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        {newResource.file ? newResource.file.name : 'Drag and drop a file or click to browse'}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                        id="file-upload"
                        ref={fileInputRef}
                      />
                      <label
                        htmlFor="file-upload"
                        style={{
                          marginTop: '0.5rem',
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          background: '#a78bfa',
                          color: '#fff',
                          borderRadius: '0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        Browse Files
                      </label>
                      {/* PDF Preview */}
                      {newResource.file && newResource.file.type === "application/pdf" && newResource.fileUrl && (
                        <div style={{ marginTop: 16 }}>
                          <iframe
                            src={newResource.fileUrl}
                            title="PDF Preview"
                            width="100%"
                            height="200"
                            style={{ border: "1px solid #eee", borderRadius: 8 }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.75rem',
                  padding: '1.5rem',
                  borderTop: '1px solid #e5e7eb'
                }}
              >
                <button
                  onClick={() => setShowUploadModal(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    color: '#4b5563',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  style={{
                    padding: '0.5rem 1.5rem',
                    background: '#a78bfa',
                    color: '#fff',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    opacity: isUploading ? 0.5 : 1
                  }}
                >
                  {isUploading ? 'Uploading...' : 'Upload Resource'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingResource && (
          <div
            // className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50
            }}
          >
            <div
              // className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
              style={{
                background: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                maxWidth: 400,
                width: '100%',
                margin: '0 1rem',
                overflow: 'hidden'
              }}
            >
              <div
                // className="flex items-center justify-between p-6 border-b border-gray-200"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <h3
                  // className="text-lg font-semibold text-gray-900"
                  style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}
                >
                  Edit Resource
                </h3>
                <button
                  onClick={() => setEditingResource(null)}
                  // className="text-gray-400 hover:text-gray-600"
                  style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>
              <div
                // className="p-6"
                style={{ padding: '1.5rem' }}
              >
                <div
                  // className="space-y-4"
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div>
                    <label
                      // className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingResource.title}
                      onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                      // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label
                      // className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}
                    >
                      Description
                    </label>
                    <textarea
                      value={editingResource.description}
                      onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                      // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                // className="flex justify-end space-x-3 p-6 border-t border-gray-200"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.75rem',
                  padding: '1.5rem',
                  borderTop: '1px solid #e5e7eb'
                }}
              >
                <button
                  onClick={() => setEditingResource(null)}
                  // className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  style={{
                    padding: '0.5rem 1rem',
                    color: '#4b5563',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  // className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                  style={{
                    padding: '0.5rem 1.5rem',
                    background: '#a78bfa',
                    color: '#fff',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingResourcesUpload;