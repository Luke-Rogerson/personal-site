import React from 'react'
import styled from 'styled-components'

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Bio = () => {
  return (
    <Info>
      <p>
        I am an entreprenerial and motivated full-stack software engineer. I spend most of
        my week working with TypeScript, React Native and GraphQL 📈
      </p>
      <p>
        In another life, I was a co-owner, teacher and manager of an educational startup
        in China 🇨🇳
      </p>
      <p>
        I am passionate about technology and education. I love always learning something
        new! 学
      </p>
    </Info>
  )
}

export default Bio
