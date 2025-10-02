import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .eq('id', 1)
      .single();

    if (error || !data) {
      // No data found or error, return default data
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
        ],
        experiences: [
          {
            id: 1,
            title: 'Senior Product Manager',
            company: 'Company Name',
            period: '2020 - Present',
            description: 'Led product strategy and design for key features, resulting in 40% user growth.'
          },
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

      // Try to insert default data, but don't fail if it doesn't work
      try {
        const { error: insertError } = await supabase
          .from('portfolio_data')
          .insert({ id: 1, data: defaultData });

        if (insertError) {
          console.error('Error inserting default data:', insertError);
        }
      } catch (insertError) {
        console.error('Error inserting default data:', insertError);
      }

      return NextResponse.json(defaultData);
    }

    if (error) {
      console.error('Error fetching data:', error);
      // Return default data instead of error
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
        ],
        experiences: [
          {
            id: 1,
            title: 'Senior Product Manager',
            company: 'Company Name',
            period: '2020 - Present',
            description: 'Led product strategy and design for key features, resulting in 40% user growth.'
          },
        ],
        heroName: 'YOUR NAME',
        heroDescription: 'Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.',
        aboutText: 'Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.',
        contactEmail: 'mailto:your.email@example.com',
        contactLinkedIn: 'https://linkedin.com/in/yourprofile',
        contactInstagram: 'https://instagram.com/yourprofile',
        contactMedium: 'https://medium.com/@yourprofile',
        contactGitHub: 'https://github.com/yourprofile',
        profileImageUrl: '',
        layout: 'regular'
      };
      return NextResponse.json(defaultData);
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error in GET:', error);
    // Return default data instead of error
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
      ],
      experiences: [
        {
          id: 1,
          title: 'Senior Product Manager',
          company: 'Company Name',
          period: '2020 - Present',
          description: 'Led product strategy and design for key features, resulting in 40% user growth.'
        },
      ],
      heroName: 'YOUR NAME',
      heroDescription: 'Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.',
      aboutText: 'Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.',
      contactEmail: 'mailto:your.email@example.com',
      contactLinkedIn: 'https://linkedin.com/in/yourprofile',
      contactInstagram: 'https://instagram.com/yourprofile',
      contactMedium: 'https://medium.com/@yourprofile',
      contactGitHub: 'https://github.com/yourprofile',
      profileImageUrl: '',
      layout: 'regular'
    };
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    console.log('New data keys:', Object.keys(newData));

    const { error } = await supabase
      .from('portfolio_data')
      .upsert({ id: 1, data: newData });

    if (error) {
      console.error('Error saving data:', error);
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}