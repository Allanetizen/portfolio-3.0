
import PortfolioClient from '../components/PortfolioClient';

// Default data to ensure content is always available
const defaultData = {
  projects: [
    {
      id: 1,
      title: "Test Project",
      description: "Test description",
      tags: ["#Test"],
      stats: {
        users: "+1k users",
        rating: "⭐ 5.0 rating",
        growth: "📈 100% growth"
      },
      imageUrl: "",
      challenge: "Test challenge",
      solution: "Test solution",
      chartImageUrl: "",
      sections: []
    }
  ],
  experiences: [
    {
      id: 1,
      title: "Test Role",
      company: "Test Company",
      period: "2024 - Present",
      description: "Test experience"
    }
  ],
  heroName: "Test Name",
  heroDescription: "Test description",
  aboutText: "Test about",
  contactEmail: "mailto:test@example.com",
  contactLinkedIn: "https://linkedin.com/in/test",
  contactInstagram: "https://instagram.com/test",
  contactMedium: "https://medium.com/@test",
  contactGitHub: "https://github.com/test",
  profileImageUrl: "",
  layout: "regular"
};

async function getPortfolioData() {
  try {
    // Use relative URL that works in both development and production
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/portfolio`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return defaultData;
  }
}

export default async function Home() {
  // Fetch data on the server
  const portfolioData = await getPortfolioData();
  
  return <PortfolioClient data={portfolioData} />;
}