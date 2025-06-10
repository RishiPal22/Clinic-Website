import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../components/SupabaseClient'

const Signin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (error) {
      alert('Signin error: ' + error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Sign In</h2>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit}>
          {[
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

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div>
             <p className="mt-4 text-center">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={() => navigate('/signup')}
            >
              Signup
            </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin