// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vwphftvkdmflctxwipcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cGhmdHZrZG1mbGN0eHdpcGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTM1NjYsImV4cCI6MjA2NTI4OTU2Nn0.nhofkEqnbpGYCqyLk2-ajzOumt1wBReM6lCMH5XqYCQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
