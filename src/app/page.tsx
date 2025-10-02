
import PortfolioClient from '../components/PortfolioClient';

// Default data to ensure content is always available
const defaultData = {
  projects: [
    {
      id: 1,
      title: "Project 1",
      description: "Innovative app design with focus on user experience.",
      tags: ["#UX", "#Mobile"],
      stats: {
        users: "+5k users",
        rating: "⭐ 4.8 rating",
        growth: "📈 40% growth"
      },
      imageUrl: "",
      challenge: "The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.",
      solution: "Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.",
      chartImageUrl: "",
      sections: []
    }
  ],
  experiences: [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "Company Name",
      period: "2020 - Present",
      description: "Led product strategy and design for key features, resulting in 40% user growth."
    }
  ],
  heroName: "YOUR NAME",
  heroDescription: "Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.",
  aboutText: "Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.",
  contactEmail: "mailto:your.email@example.com",
  contactLinkedIn: "https://linkedin.com/in/yourprofile",
  contactInstagram: "https://instagram.com/yourprofile",
  contactMedium: "https://medium.com/@yourprofile",
  contactGitHub: "https://github.com/yourprofile",
  profileImageUrl: "",
  layout: "regular"
};

async function getPortfolioData() {
  try {
    const response = await fetch('http://localhost:3000/api/portfolio', {
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