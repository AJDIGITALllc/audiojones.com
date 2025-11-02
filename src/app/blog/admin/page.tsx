'use client';

import { useState, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';

// --- FAKE ADMIN AUTH HOOK ---
const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAdmin(true);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { isAdmin, loading };
};

// --- ADMIN-ONLY WRAPPER COMPONENT ---
const AdminOnly = ({ children }: { children: ReactElement }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white"><p>Verifying permissions...</p></div>;
  }
  if (!isAdmin) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white"><p className="text-red-500">Access Denied.</p></div>;
  }
  return children;
};

type Draft = {
  id: string;
  title: string;
  pillar: string;
  source: string;
  status: string;
  createdAt: string;
  markdown?: string; // For detail view
};

// --- API ACTION HANDLERS ---
const handleAction = async (action: string, draftId: string, data?: any) => {
  const endpointMap: { [key: string]: string } = {
    Approve: `/api/blog/approve`,
    Schedule: `/api/blog/schedule`,
    Publish: `/api/blog/publish`,
  };

  const endpoint = endpointMap[action];
  if (!endpoint) {
    alert(`Unknown action: ${action}`);
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId, ...data }),
    });
    if (!response.ok) throw new Error(`Failed to ${action.toLowerCase()} draft.`);
    alert(`Successfully ${action.toLowerCase()}d draft ${draftId}.`);
  } catch (error) {
    console.error(`Error performing action ${action}:`, error);
    alert(`Error: Could not ${action.toLowerCase()} draft.`);
  }
};

// --- MODAL COMPONENT ---
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-lg w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">&times;</button>
        {children}
      </div>
    </div>
  );
};


// --- BLOG ADMIN PAGE ---
export default function BlogAdminPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ pillar: '', source: '', status: '' });
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [publishDate, setPublishDate] = useState('');

  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true);
      // MOCK DATA
      const DUMMY_DRAFTS: Draft[] = [
        { id: '1', title: 'AI in Music Production', pillar: 'AI', source: 'perplexity', status: 'needs_review', createdAt: '2025-11-02T12:00:00.000Z', markdown: '# AI in Music\n\n...' },
        { id: '2', title: 'Marketing for Indie Artists', pillar: 'Marketing', source: 'internal', status: 'draft', createdAt: '2025-11-01T10:30:00.000Z', markdown: '# Marketing Guide\n\n...' },
      ];
      setDrafts(DUMMY_DRAFTS);
      setLoading(false);
    };
    fetchDrafts();
  }, []);

  const filteredDrafts = useMemo(() => drafts.filter(draft =>
    (filters.pillar ? draft.pillar === filters.pillar : true) &&
    (filters.source ? draft.source === filters.source : true) &&
    (filters.status ? draft.status === filters.status : true)
  ), [drafts, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [name]: e.target.value }));
  };

  const openScheduleModal = (draft: Draft) => {
    setSelectedDraft(draft);
    setScheduleModalOpen(true);
  };

  const handleScheduleSubmit = () => {
    if (selectedDraft && publishDate) {
      handleAction('Schedule', selectedDraft.id, { publishAt: publishDate });
      setScheduleModalOpen(false);
    }
  };

  if (selectedDraft && !isScheduleModalOpen) {
    return (
      <AdminOnly>
        <main className="min-h-screen bg-gray-900 text-white p-8">
          <button onClick={() => setSelectedDraft(null)} className="mb-4 bg-gray-700 px-4 py-2 rounded">← Back to List</button>
          <h1 className="text-3xl font-bold">{selectedDraft.title}</h1>
          <div className="mt-4 p-4 bg-gray-800 rounded prose prose-invert">{selectedDraft.markdown}</div>
        </main>
      </AdminOnly>
    );
  }

  return (
    <AdminOnly>
      <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Blog Automation — Audio Jones</h1>
          <p className="text-sm text-gray-400">Content Management for AJ DIGITAL LLC</p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row flex-wrap gap-4">
          {/* Filters */}
        </div>

        <div className="overflow-x-auto rounded-lg bg-gray-800/50">
          <table className="min-w-full text-left">
            {/* Table Head */}
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center p-8">Loading drafts...</td></tr>
              ) : (
                filteredDrafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="p-4 font-medium">{draft.title}</td>
                    {/* other tds */}
                    <td className="p-4 flex flex-wrap gap-2">
                      <button onClick={() => setSelectedDraft(draft)} className="text-sm bg-gray-600 hover:bg-gray-500 rounded px-3 py-1">View</button>
                      <button onClick={() => handleAction('Approve', draft.id)} className="text-sm bg-green-600 hover:bg-green-500 rounded px-3 py-1">Approve</button>
                      <button onClick={() => openScheduleModal(draft)} className="text-sm bg-blue-600 hover:bg-blue-500 rounded px-3 py-1">Schedule</button>
                      <button onClick={() => handleAction('Publish', draft.id)} className="text-sm bg-orange-600 hover:bg-orange-500 rounded px-3 py-1">Publish</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isScheduleModalOpen} onClose={() => setScheduleModalOpen(false)}>
          <h2 className="text-2xl mb-4">Schedule Post</h2>
          <p>Scheduling: {selectedDraft?.title}</p>
          <input type="datetime-local" value={publishDate} onChange={e => setPublishDate(e.target.value)} className="mt-4 w-full bg-gray-700 p-2 rounded" />
          <button onClick={handleScheduleSubmit} className="mt-6 bg-blue-600 px-4 py-2 rounded w-full">Confirm Schedule</button>
        </Modal>
      </main>
    </AdminOnly>
  );
}
