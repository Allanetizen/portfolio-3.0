import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

// Local storage fallback
const DATA_FILE = path.join(process.cwd(), 'portfolio-data.json');

function readLocalData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading local data:', error);
  }
  return null;
}

function writeLocalData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing local data:', error);
    return false;
  }
}

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
    {
      id: 2,
      title: 'Project 2',
      description: 'E-commerce platform with seamless checkout and personalized recommendations.',
      tags: ['#E-commerce', '#Web'],
      stats: { users: '+10k users', rating: '⭐ 4.9 rating', growth: '📈 60% growth' },
      imageUrl: '',
      challenge: 'Optimizing the checkout flow to reduce cart abandonment rates and increase conversion.',
      solution: 'Streamlined the checkout process, integrated one-click payment options, and introduced AI-driven product recommendations, leading to a 25% increase in conversions.',
      chartImageUrl: '',
      sections: []
    }
  ],
  experiences: [
    {
      id: 1,
      title: 'Senior Product Manager',
      company: 'Company Name',
      period: '2020 - Present',
      description: 'Led product strategy and design for key features, resulting in 40% user growth.'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Creative Agency',
      period: '2018 - 2020',
      description: 'Designed intuitive user interfaces and engaging user experiences for various web and mobile applications.'
    }
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

export async function GET() {
  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .eq('id', 1)
      .single();

    if (!error && data) {
      return NextResponse.json(data.data);
    }

    // Supabase failed, try local storage
    const localData = readLocalData();
    if (localData) {
      return NextResponse.json(localData);
    }

    // No data found anywhere, return default data
    // Try to save default data locally
    writeLocalData(defaultData);
    
    // Try to insert default data to Supabase, but don't fail if it doesn't work
    try {
      const { error: insertError } = await supabase
        .from('portfolio_data')
        .insert({ id: 1, data: defaultData });

      if (insertError) {
        console.error('Error inserting default data to Supabase:', insertError);
      }
    } catch (insertError) {
      console.error('Error inserting default data to Supabase:', insertError);
    }

    return NextResponse.json(defaultData);
  } catch (error) {
    console.error('Error in GET:', error);
    
    // Try local storage as fallback
    const localData = readLocalData();
    if (localData) {
      return NextResponse.json(localData);
    }
    
    // Return default data instead of error
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    console.log('New data keys:', Object.keys(newData));

    // Try Supabase first
    const { error } = await supabase
      .from('portfolio_data')
      .upsert({ id: 1, data: newData });

    if (error) {
      console.error('Error saving data to Supabase:', error);
      // Fallback to local storage
      const localSaved = writeLocalData(newData);
      if (localSaved) {
        console.log('Data saved to local storage as fallback');
        return NextResponse.json({ success: true, message: 'Saved locally (Supabase unavailable)' });
      } else {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
      }
    }

    // Also save to local storage as backup
    writeLocalData(newData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing portfolio data:', error);
    
    // Try to save to local storage as last resort
    try {
      const newData = await request.json();
      const localSaved = writeLocalData(newData);
      if (localSaved) {
        return NextResponse.json({ success: true, message: 'Saved locally (API error)' });
      }
    } catch (localError) {
      console.error('Error saving to local storage:', localError);
    }
    
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}