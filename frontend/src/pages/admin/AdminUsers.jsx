import React, { useState, useEffect, useCallback } from 'react';
import { Users, Search, Edit3, Save, X, UserPlus, Trash2 } from 'lucide-react';
import { adminAPI } from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUsers({ page: currentPage, limit: 10 });
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.pages);
      console.log('Fetched users:', response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Demo data for development
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', created_at: '2024-01-15', is_recent: true },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', created_at: '2024-01-10', is_recent: true },
        { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'customer', created_at: '2024-01-05', is_recent: false }
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('All fields are required');
      return;
    }

    try {
      setCreating(true);
      await adminAPI.createUser(newUser);
      setShowCreateModal(false);
      setNewUser({ name: '', email: '', password: '' });
      fetchUsers(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create user');
      console.error('Error creating user:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    try {
      await adminAPI.deleteUser(userId);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUserName = async (userId, newName) => {
    try {
      await adminAPI.updateUserName(userId, newName);
      alert('Customer name updated successfully!');
      fetchUsers(); // Refresh the list
      setEditingUser(null);
      setEditName('');
    } catch (error) {
      console.error('Error updating user name:', error);
      alert('Network error. Please try again.');
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setEditName(user.name);
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditName('');
  };

  const saveEdit = (userId) => {
    if (editName.trim().length === 0) {
      alert('Name cannot be empty');
      return;
    }
    updateUserName(userId, editName.trim());
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B0DB9C] mx-auto mb-4"></div>
          <p className="text-[#0A400C] font-semibold">Loading Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#B0DB9C] p-3 rounded-full">
                <Users className="h-8 w-8 text-[#0A400C]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Customer Management</h1>
                <p className="text-[#B0DB9C]">Manage customer accounts and information</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-green-200 text-green-900 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-colors flex items-center space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B0DB9C]/20 mb-8">
            <div className="flex justify-between items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent"
                />
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredUsers.length}</span> customers found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Users Table */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#B0DB9C]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-[#ECFAE5]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#B0DB9C] p-2 rounded-full">
                            <Users className="h-5 w-5 text-[#0A400C]" />
                          </div>
                          <div>
                            {editingUser === user.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="font-semibold text-[#0A400C] border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(user.id)}
                                  autoFocus
                                />
                                <button
                                  onClick={() => saveEdit(user.id)}
                                  className="text-green-600 hover:text-green-800"
                                  title="Save"
                                >
                                  <Save className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="text-red-600 hover:text-red-800"
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold text-[#0A400C]">{user.name}</p>
                                <button
                                  onClick={() => startEditing(user)}
                                  className="text-gray-400 hover:text-[#B0DB9C] opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Edit name"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            {user.is_recent && (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                New Customer
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-green-50 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-green-200 hover:text-green-900 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-green-200 hover:text-green-900 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">Add New Customer</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewUser({ name: '', email: '', password: '' });
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewUser({ name: '', email: '', password: '' });
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
