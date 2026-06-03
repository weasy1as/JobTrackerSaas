export type AppUser = {
  id: string;
  email: string | null;

  created_at: string;
  updated_at: string;

  last_sign_in_at: string | null;

  user_metadata: {
    email?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    sub?: string;
    full_name?: string;
    avatar_url?: string;
  };

  app_metadata: {
    provider?: string;
    providers?: string[];
  };
};
