import React from 'react'
import styled from 'styled-components'

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Bio = () => {
  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <Info>
        <p>
          I am an entreprenerial and motivated full-stack software engineer. I spend most
          of my week working with React Native, TypeScript and GraphQL 🏗
        </p>
        <p>
          In another life, I was a co-owner, teacher and manager of an educational startup
          in China 🇨🇳
        </p>
        <p>
          I am passionate about technology and education, and love always learning
          something new! 学
        </p>
      </Info>
    </div>
  )
}

export default Bio
