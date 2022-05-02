import React from 'react'
import styled from 'styled-components'

const MarkdownContent: React.FC<{html: string}> = ({ html }) => {
  return (
    <Wrapper dangerouslySetInnerHTML={{ __html: html }} />
  )
}

const Wrapper = styled.div`
  & h1 {
    font-size: 3rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: 1rem;
  }

  & h2 {
    font-size: 2.25rem;
    font-weight: var(--font-weight-medium);
    margin-bottom: 1rem;
  }

  & h3 {
    font-size: 1.5rem;
    font-weight: var(--font-weight-medium);
    margin-bottom: 1rem;
  }

  & h4 {
    font-size: 1.25rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: 1rem;
  }

  & h5 {
    font-size: 1.125rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: 1rem;
  }

  & h6 {
    font-size: 1rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: 1rem;
  }

  & p {
    margin-bottom: 1rem;
  }

  & p + ol, p + ul {
    margin-top: -0.5rem;
  }

  & ul,ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  & ul {
    list-style-type: '- ';
  }


  & ol {
    list-style-type: decimal;
  }
`

export default MarkdownContent
