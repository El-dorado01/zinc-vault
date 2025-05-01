import { createSupabaseServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

export default async function HeroPreview() {
  const supabase = await createSupabaseServerClient();
  const sessionToken = (await cookies()).get('sessionToken')?.value;

  if (!sessionToken) {
    return <p>Please log in to view hero content.</p>;
  }

  const user = await verifySessionToken(sessionToken);
  if (!user) {
    return <p>Invalid or expired session.</p>;
  }

  const { data: approvedUser, error: approvedError } = await supabase
    .from('approved_users')
    .select('email')
    .eq('email', user.email)
    .single();

  if (approvedError || !approvedUser) {
    return <p>Unauthorized.</p>;
  }

  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

    const imagePaths:string[] = data?.image_paths || [];

  if (error || !data) {
    return <p>No hero content found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Hero Preview</h1>
      <div>
        <h2>Main Hero Text</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.hero_texts.main.content[0].content[0].text,
          }}
        />
        <h2>Sub Hero Text</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.hero_texts.sub.content[0].content[0].text,
          }}
        />
        <h2>Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {imagePaths.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Hero Image ${index + 1}`}
              className="w-full h-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}