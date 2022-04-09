import React, { useState } from 'react'
import styled from 'styled-components'

import { QUERIES } from '../constants'

const activeImageStyles = {
  border: '2px solid white'
}

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
                  <GalleryImage src={publicURL} alt={caption} style={image === mainImage ? activeImageStyles : {}} />
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

const MaxWidthWrapper = styled.div`
  max-width: 85rem;
  margin: 0 auto;
  background: var(--background-color);
`

const BackgroundColor = styled.div`
  background: var(--color-gray-800);
`

const ImageWrapper = styled.div``

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  transition: opacity 500ms;

  &:hover {
    opacity: .8;
    transition: opacity 250ms;
  }
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`

const OuterWrapper = styled.div`
  width: 100%;
  height: max(400px, min(60rem, 85vh));
  padding: 1rem var(--gutter);
  display: grid;
  gap: 1rem;
  grid-template-areas: 'main-image' 'gallery';
  grid-template-rows: 5fr minmax(10rem, 1fr);

  @media ${QUERIES.laptopAndUp} {
    grid-template-areas: 'main-image gallery';
    grid-template-columns: 5fr minmax(10rem, 1fr);
    grid-template-rows: 1fr;
  }
`

const MainImageWrapper = styled.div`
  grid-area: main-image;
  min-height: 0;
  width: 100%;
  height: 100%;
  background: var(--color-gray-900);
`

const Gallery = styled.div`
  grid-area: gallery;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  overflow: auto;

  @media ${QUERIES.laptopAndUp} {
    flex-direction: column;
  }
`

export default PostImages
