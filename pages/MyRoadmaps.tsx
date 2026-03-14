
import React, { useEffect, useState } from 'react';
import { auth, getUserRoadmaps, updateRoadmap, deleteRoadmap, MockUser } from '../services/firebaseService';
import { FileText, Calendar, Loader2, Target, Download, Edit2, Trash2, X, Check, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyRoadmaps: React.FC = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    return auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const data = await getUserRoadmaps(u.uid);
        setRoadmaps(data);
      }
      setLoading(false);
    });
  }, []);

  const handleEdit = (rm: any) => {
    setEditingId(rm.id);
    setEditTitle(rm.title || `Roadmap for ${rm.suggestedJobs?.[0]?.title || 'Professional'}`);
    setEditCategory(rm.category || 'General');
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateRoadmap(id, {
        title: editTitle,
        category: editCategory
      });
      setRoadmaps(prev => prev.map(r => r.id === id ? { ...r, title: editTitle, category: editCategory } : r));
      setEditingId(null);
    } catch (error) {
      alert("Error updating roadmap");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this roadmap?")) return;
    try {
      await deleteRoadmap(id);
      setRoadmaps(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      alert("Error deleting roadmap");
    }
  };

  const handleExportPDF = (rm: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = `
      <html>
        <head>
          <title>${rm.title || 'Career Roadmap'}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            h2 { color: #334155; margin-top: 30px; }
            .section { margin-bottom: 25px; }
            .badge { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 12px; margin-right: 5px; font-weight: bold; }
            .item { background: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 15px; }
            .item h3 { margin: 0 0 5px 0; color: #0f172a; }
          </style>
        </head>
        <body>
          <h1>Career Roadmap: ${rm.title || 'Untitled'}</h1>
          <p><strong>Category:</strong> ${rm.category || 'General'}</p>
          <p><strong>Generated on:</strong> ${rm.createdAt.toLocaleDateString()}</p>
          <div class="section"><h2>Summary</h2><p>${rm.summary}</p></div>
          <div class="section"><h2>Skills</h2><p>${rm.extractedSkills.join(', ')}</p></div>
          <div class="section"><h2>Suggested Paths</h2>${rm.suggestedJobs.map((j: any) => `<div class="item"><h3>${j.title}</h3><p>${j.reason}</p></div>`).join('')}</div>
          <script>window.print();</script>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
           <X className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Access Restricted</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Please login to access your personalized career workstation and saved roadmaps.</p>
        <button onClick={() => auth.signInWithGoogle()} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Login with Google</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">My Roadmaps</h1>
          <p className="text-slate-500 font-medium">Manage and export your AI-generated career projections.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <Filter className="w-4 h-4 text-slate-400 ml-1" />
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none pr-4"
          >
            <option value="All">All Categories</option>
            {Array.from(new Set(roadmaps.map(r => r.category || 'General'))).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {roadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmaps
            .filter(r => filterCategory === 'All' || (r.category || 'General') === filterCategory)
            .map((rm) => (
            <div key={rm.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
                  {rm.category || 'General'}
                </span>
              </div>

              {editingId === rm.id ? (
                <div className="space-y-4 mb-6 animate-in fade-in duration-300">
                  <input 
                    className="w-full p-4 rounded-xl border border-blue-100 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Roadmap Title"
                  />
                  <input 
                    className="w-full p-4 rounded-xl border border-blue-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category (e.g. Europe, Oil & Gas)"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleSaveEdit(rm.id)} className="flex-grow p-3 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-blue-100"><Check className="w-4 h-4" /> Save</button>
                    <button onClick={() => setEditingId(null)} className="p-3 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center text-xs font-bold hover:bg-slate-200"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 line-clamp-2 leading-tight">
                    {rm.title || (rm.suggestedJobs?.[0]?.title ? `Path to ${rm.suggestedJobs[0].title}` : 'Career Path')}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow leading-relaxed">{rm.summary}</p>
                  <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">
                     <Calendar className="w-3.5 h-3.5 mr-2" />
                     Generated {rm.createdAt.toLocaleDateString()}
                  </div>
                </>
              )}
              
              <div className="flex gap-2 pt-6 border-t border-slate-50">
                <button 
                  onClick={() => handleExportPDF(rm)}
                  className="flex-grow py-3 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-100"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
                <button 
                  onClick={() => handleEdit(rm)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(rm.id)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 py-32 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Target className="w-10 h-10 text-slate-200" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">No Projections Found</h3>
          <p className="text-slate-400 mb-10 max-w-sm mx-auto font-medium">Use the AI Career Analyzer to generate your first roadmap and save it here.</p>
          <Link to="/dreamer" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 transition-all uppercase tracking-widest text-xs">Start AI Analysis</Link>
        </div>
      )}
    </div>
  );
};

export default MyRoadmaps;
