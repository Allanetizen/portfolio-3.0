
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
    console.log('🔍 [SERVER] Starting to fetch portfolio data...');
    
    // Import the portfolio data directly from the JSON file
    const fs = await import('fs');
    const path = await import('path');
    
    const dataFile = path.join(process.cwd(), 'portfolio-data.json');
    console.log('📁 [SERVER] Data file path:', dataFile);
    
    if (fs.existsSync(dataFile)) {
      console.log('✅ [SERVER] Data file exists, reading...');
      const data = fs.readFileSync(dataFile, 'utf8');
      const parsedData = JSON.parse(data);
      console.log('📊 [SERVER] Loaded data:', {
        projects: parsedData.projects?.length || 0,
        experiences: parsedData.experiences?.length || 0,
        heroName: parsedData.heroName,
        aboutText: parsedData.aboutText?.substring(0, 50) + '...'
      });
      return parsedData;
    }
    
    console.log('⚠️ [SERVER] Data file not found, using default data');
    return defaultData;
  } catch (error) {
    console.error('❌ [SERVER] Error reading portfolio data:', error);
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