import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Return default data for demo
  const defaultData = {
    projects: [
      {
        id: 1,
        title: 'Project 1',
        description: 'Innovative app design with focus on user experience.',
        tags: ['#UX', '#Mobile'],
        stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
        imageUrl: '',
        challenge: 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
        solution: 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
        chartImageUrl: '',
        sections: []
      },
      // Add more default projects as needed
    ],
    experiences: [
      {
        id: 1,
        title: 'Senior Product Manager',
        company: 'Company Name',
        period: '2020 - Present',
        description: 'Led product strategy and design for key features, resulting in 40% user growth.'
      },
      // Add more default experiences
    ],
    heroName: 'YOUR NAME',
    heroDescription: 'Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.',
    aboutText: 'Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.',
    contactEmail: 'mailto:your.email@example.com',
    contactLinkedIn: 'https://linkedin.com/in/yourprofile',
    contactInstagram: 'https://instagram.com/yourprofile',
    contactMedium: 'https://medium.com/@yourprofile',
    contactGitHub: 'https://github.com/yourprofile',
    profileImageUrl: ''
  };
  return NextResponse.json(defaultData);
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    console.log('New data keys:', Object.keys(newData));
    // For demo purposes, simulate save success without persistence
    // In production, integrate with a proper database like Vercel KV, Supabase, or MongoDB
    console.log('Data received, simulating save success');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}