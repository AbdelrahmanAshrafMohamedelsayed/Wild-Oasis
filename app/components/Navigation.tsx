import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
      <ul>
        <li>
         <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
      
      </ul>
  )
}

export default Navigation