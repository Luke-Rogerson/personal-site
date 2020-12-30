import React from 'react'
import styled from 'styled-components'

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Bio: React.FC = () => {
  return (
    <Info>
      <p>
        I am an entrepreneurial and motivated full-stack software engineer, with a wealth
        of experience in the JavaScript ecosystem - particularly in React Native, GraphQL
        and Node.js. 📈
      </p>
      <p>
        I love working with strongly-typed languages, especially TypeScript and more
        recently Go. I have worked with Swift and Java, and I also enjoy DevOps-type work,
        including AWS and creating mobile CI/CD pipelines. 🧱
      </p>
      <p>
        My previous background is in education, where I was a co-owner, teacher and
        manager of an educational startup in China. I love sharing my knowledge with
        others, and have this year been teaching refugees and other under-represented
        people in tech how to code. 🖥
      </p>
      <p>
        I enjoy exercising and the outdoors, discussing things like football, tech and
        politics (mainly UK and US), improving my Chinese and always learning something
        new! 🚀
      </p>
    </Info>
  )
}

export default Bio
