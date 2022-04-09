import React, { useState } from 'react'
import styled from 'styled-components'

import MaxWidthWrapper from './MaxWidthWrapper'

interface PostImagesProps {
  images: PostImage[]
}

const PostImages: React.FC<PostImagesProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <BackgroundColor>
      <MaxWidthWrapper>
        <OuterWrapper>
          <MainImageWrapper>
            <MainImage alt={mainImage?.caption} src={mainImage.image.publicURL} />
          </MainImageWrapper>

          <Gallery>
            {
            images.map((image) => {
              const { image: { publicURL, id }, caption } = image
              return (
                <ImageWrapper onClick={() => setMainImage(image)} key={id}>
                  <GalleryImage src={publicURL} alt={caption} />
                </ImageWrapper>
              )
            }
            )
        }
          </Gallery>
        </OuterWrapper>
      </MaxWidthWrapper>
    </BackgroundColor>
  )
}

const BackgroundColor = styled.div`
background: var(--color-gray-700);
`

const ImageWrapper = styled.div`
  // width: 300px;
  // height: 300px;
`

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`

const OuterWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-areas: 'main-image gallery';
  grid-template-columns: 4fr minmax(10rem, 1fr);
  grid-template-rows: max(400px, min(60rem, 80vh));
`

const MainImageWrapper = styled.div`
  grid-area: main-image;
  width: 100%;
  height: 100%;
`

const Gallery = styled.div`
  grid-area: gallery;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
`

export default PostImages
