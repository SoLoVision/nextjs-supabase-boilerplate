"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
	useSessionContext,
	useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignIn = () => {
	const supabaseClient = useSupabaseClient();
	const { session, isLoading, error: sessionError } = useSessionContext();

	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/");
		}
	}, [session, router]);

	useEffect(() => {
		if (sessionError) {
			console.error("Session error:", sessionError);
		}
	}, [sessionError]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid grid-cols-2 items-center min-h-screen">
			<div className="w-full h-full bg-slate-900"></div>
			<div className="flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<h1 className="text-3xl font-bold">Welcome back</h1>
					<p className="text-gray-500">Sign in to your account to continue</p>
					<div className="w-[350px]">
						<Auth
							supabaseClient={supabaseClient}
							providers={["google"]}
							magicLink={true}
							appearance={{
								theme: ThemeSupa,
								variables: {
									default: {
										colors: {
											brand: "#0D121F",
											brandAccent: "#8057f0",
										},
									},
								},
							}}
							theme="light"
							redirectTo={`${window.location.origin}/`}
							onlyThirdPartyProviders={false}
							view="sign_in"
							showLinks={true}
							localization={{
								variables: {
									sign_up: {
										email_label: "Email address",
										password_label: "Create a Password",
										button_label: "Sign up",
										loading_button_label: "Creating account...",
										social_provider_text: "Sign up with {{provider}}",
										link_text: "Don't have an account? Sign up",
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
