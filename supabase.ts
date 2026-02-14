
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xurcgyufaehtvbetymdj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cmNneXVmYWVodHZiZXR5bWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDgyNDcsImV4cCI6MjA4NjU4NDI0N30.c0IZGudyOyw32phKDwvYfRjzb-3RyjIUYDrqCsso7fA';

export const supabase = createClient(supabaseUrl, supabaseKey);
