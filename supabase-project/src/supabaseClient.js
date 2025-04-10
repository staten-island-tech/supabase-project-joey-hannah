import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://apmxcwvtfsozwvhqdlpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbXhjd3Z0ZnNvend2aHFkbHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDE0OTEsImV4cCI6MjA1OTI3NzQ5MX0.J6s8woR1FqFj9CMyUXHZQOvBGceSmCeJ5VLQRhw2sx8',
)
