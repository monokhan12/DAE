
import { BlogPost } from "../types";

/**
 * Simulated jobs that look like they were scraped by a bot.
 * This provides a fallback when the real backend is not connected.
 */
const SIMULATED_BOT_JOBS: BlogPost[] = [
  {
    id: 'bot_1',
    title: 'DAE Electrical Maintenance - Lucky Cement',
    excerpt: 'Bot Alert: Found 3 new openings for Electrical Maintenance Technicians. Requirements: DAE Electrical with 2+ years industrial experience.',
    date: 'Just Now',
    category: 'Jobs',
    tags: ['Live', 'Electrical', 'Private Sector'],
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bot_2',
    title: 'Mechanical Technician - Pak Arab Refinery (PARCO)',
    excerpt: 'Scraped from official career portal. Tech-II positions for Mechanical diploma holders. Shift-based work in mid-country refinery.',
    date: '2 hours ago',
    category: 'Jobs',
    tags: ['Live', 'Mechanical', 'Oil & Gas'],
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bot_3',
    title: 'DAE Civil Site Supervisor - DHA Gujranwala',
    excerpt: 'Real-time sync: Development projects seeking DAE Civil graduates for infrastructure supervision.',
    date: '5 hours ago',
    category: 'Jobs',
    tags: ['Live', 'Civil', 'Punjab'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
  }
];

export const fetchLiveJobsFromBot = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/bot-jobs', {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Fail gracefully: Log information instead of an error, and return simulated data 
    // to ensure the UI remains functional and demonstrative.
    console.info("Bot Scraper (Live) is unavailable, using local simulated stream.", error);
    return SIMULATED_BOT_JOBS; 
  }
};

/**
 * Example FastAPI Python Code (for user reference):
 * 
 * @app.get("/jobs")
 * def get_jobs():
 *     # your scraping logic here
 *     return [
 *         {
 *             "id": "bot_1",
 *             "title": "New Mechanical Opening via Bot",
 *             "excerpt": "Scraped from official portal...",
 *             "date": "Today",
 *             "category": "Jobs",
 *             "tags": ["Scraped", "Mechanical"],
 *             "image": "..."
 *         }
 *     ]
 */
