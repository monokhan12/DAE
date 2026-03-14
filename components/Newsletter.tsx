import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
        setEmail('');
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
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="email" 
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-blue-200"
                >
                    {subscribed ? 'Subscribed!' : 'Subscribe Now'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Newsletter;
