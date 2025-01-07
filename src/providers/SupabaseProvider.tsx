"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../../types_db";

interface SupabaseProviderProps {
	children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
	const [supabaseClient] = useState(() => {
		const client = createClientComponentClient<Database>();
		// Log the initialization but not the actual values
		console.log('Supabase client initialized with URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
		console.log('Anon key present:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
		return client;
	});

	return (
		<SessionContextProvider 
			supabaseClient={supabaseClient}
			initialSession={null}>
			{children}
		</SessionContextProvider>
	);
};

export default SupabaseProvider;
