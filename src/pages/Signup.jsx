import { useState } from 'react'
import { supabase } from '../components/SupabaseClient'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName
        }
      }
    })

    if (error) {
      alert('Signup error: ' + error.message)
    } else {
      console.log('Signup successful:', data)
      alert('Check your email for confirmation link!')
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Create an Account</h2>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' }
          ].map((input, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700 mb-1">{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={form[input.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          ))}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Sign Up
          </button>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage