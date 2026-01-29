import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/contact', { id, status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Messages - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">← Dashboard</button>
            <h1 className="text-xl font-bold font-playfair">Messages</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Contact Messages ({messages.length})</h2>

        <div className="space-y-4" data-testid="messages-list">
          {messages.map((message) => (
            <div key={message._id} className="bg-white p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{message.name}</h3>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                  {message.phone && <p className="text-sm text-muted-foreground">{message.phone}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {message.status}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{message.message}</p>
              <div className="flex space-x-2">
                {message.status === 'new' && (
                  <button
                    onClick={() => updateStatus(message._id, 'read')}
                    className="text-sm text-primary hover:underline"
                  >
                    Mark as Read
                  </button>
                )}
                {message.status === 'read' && (
                  <button
                    onClick={() => updateStatus(message._id, 'replied')}
                    className="text-sm text-primary hover:underline"
                  >
                    Mark as Replied
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
