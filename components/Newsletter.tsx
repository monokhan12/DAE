import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { subscribeToNewsletter } from '../services/firebaseService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);
    
    try {
      const success = await subscribeToNewsletter(email);
      if (success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Subscription failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto my-12 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>
        
        <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Don't miss the next WAPDA or AEC job!</h3>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                Get instant email alerts for new DAE job openings and admission deadlines delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <div className="relative flex-grow">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="email" 
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading || subscribed}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold placeholder:text-slate-400 disabled:opacity-50"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading || subscribed}
                    className={`flex items-center justify-center gap-2 font-black py-4 px-8 rounded-2xl transition-all shadow-xl uppercase text-[10px] tracking-widest ${
                      subscribed 
                        ? 'bg-emerald-500 text-white shadow-emerald-200' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                    } disabled:opacity-75`}
                >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : subscribed ? (
                      <><CheckCircle className="w-5 h-5" /> Subscribed!</>
                    ) : (
                      'Subscribe Now'
                    )}
                </button>
            </form>
            {error && (
              <p className="mt-4 text-rose-500 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                {error}
              </p>
            )}
        </div>
    </div>
  );
};

export default Newsletter;
