// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vzxqtudrgebwiaqlpzkc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6eHF0dWRyZ2Vid2lhcWxwemtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDYwOTgsImV4cCI6MjA2NTEyMjA5OH0.ksBosd0N0RHmZshotyHiZBW_yn-udtZFQonk17UnAOM'

export const supabase = createClient(supabaseUrl, supabaseKey)
