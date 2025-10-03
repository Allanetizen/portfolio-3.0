
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
    console.log('🔍 [SERVER] Starting to fetch portfolio data from API...');
    
    // Fetch data from API endpoint
    const baseUrl = process.env.VERCEL_URL 
      ? `https://allankibet.vercel.app` 
      : 'http://localhost:3000';
    
    console.log('🌐 [SERVER] Base URL:', baseUrl);
    
    const response = await fetch(`${baseUrl}/api/portfolio`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'User-Agent': 'Portfolio-Server/1.0'
      }
    });
    
    console.log('📡 [SERVER] API Response status:', response.status, response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ [SERVER] Successfully fetched data from API:', {
        projects: data.projects?.length || 0,
        experiences: data.experiences?.length || 0,
        heroName: data.heroName,
        aboutText: data.aboutText?.substring(0, 50) + '...'
      });
      return data;
    } else {
      console.log('⚠️ [SERVER] API request failed, falling back to local file');
      
      // Fallback to local file
      const fs = await import('fs');
      const path = await import('path');
      
      const dataFile = path.join(process.cwd(), 'portfolio-data.json');
      
      if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        const parsedData = JSON.parse(data);
        console.log('📊 [SERVER] Loaded data from local file:', {
          projects: parsedData.projects?.length || 0,
          experiences: parsedData.experiences?.length || 0,
          heroName: parsedData.heroName
        });
        return parsedData;
      }
      
      console.log('⚠️ [SERVER] No local file found, using default data');
      return defaultData;
    }
  } catch (error) {
    console.error('❌ [SERVER] Error fetching portfolio data:', error);
    
    // Final fallback to local file
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const dataFile = path.join(process.cwd(), 'portfolio-data.json');
      
      if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        const parsedData = JSON.parse(data);
        console.log('📊 [SERVER] Fallback: Loaded data from local file');
        return parsedData;
      }
    } catch (fallbackError) {
      console.error('❌ [SERVER] Fallback also failed:', fallbackError);
    }
    
    return defaultData;
  }
}

export default async function Home() {
  // Fetch data on the server
  const portfolioData = await getPortfolioData();
  console.log('🚀 [SERVER] Final portfolio data being passed to client:', {
    projects: portfolioData.projects?.length || 0,
    experiences: portfolioData.experiences?.length || 0,
    heroName: portfolioData.heroName
  });
  
  return <PortfolioClient data={portfolioData} />;
}