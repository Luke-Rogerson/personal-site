import React from 'react'
import styled from 'styled-components'

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Bio: React.FC = () => {
  return (
    <Info>
      <h2>Full-stack software engineer ☁️ </h2>
      <p>
        Serverless | TypeScript | AWS | GraphQL | Python | React Native ...amongst others!
      </p>
      <p>
        <b>#StaticallyTypeAllTheThings</b>
      </p>
    </Info>
  )
}

export default Bio
