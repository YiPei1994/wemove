import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tvhloactoyhrcxrdmeie.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aGxvYWN0b3locmN4cmRtZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMjA3MzksImV4cCI6MjAyMTY5NjczOX0.-63GsB3UMnrSiRsVT1X49rVnO95cB95Xnr-Ju40JCHc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
