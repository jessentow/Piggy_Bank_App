// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qspvdintzflanvufivum.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHZkaW50emZsYW52dWZpdnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4Mjg1MjgsImV4cCI6MjA1MTQwNDUyOH0.h10jZA_Wc5TvPTruelhJGcfyMHWBJRdk3OY18bz6FB4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);