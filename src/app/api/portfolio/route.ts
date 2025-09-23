import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

const KEY = 'portfolio_data';

export async function GET() {
  try {
    const data = await kv.get(KEY);
    if (!data) {
      // Return default data
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
      await kv.set(KEY, JSON.stringify(defaultData));
      return NextResponse.json(defaultData);
    }
    return NextResponse.json(JSON.parse(data as string));
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    const existingData = await kv.get(KEY);
    const currentData = existingData ? JSON.parse(existingData as string) : {};
    const updatedData = { ...currentData, ...newData };
    await kv.set(KEY, JSON.stringify(updatedData));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}