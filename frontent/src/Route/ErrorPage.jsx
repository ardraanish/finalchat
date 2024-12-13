import React from 'react'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <div>
        <h1>  Page is not found </h1>
        <p>  Page is not found </p>
        <Link to='/'>
        <button>
          go back
        </button>
        </Link>
    </div>
  )
}

export default ErrorPage