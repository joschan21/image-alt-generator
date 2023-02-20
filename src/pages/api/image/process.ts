import { NextApiRequest, NextApiResponse } from 'next'
import { ImageResponseData } from '@/src/types/api/image'

import { withMethods } from '@/lib/api-middlewares/with-methods'

type PartialReplicateResponse = {
  urls: {
    get: string
    cancel: string
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageResponseData>
) {
  if (!req.body)
    return res
      .status(400)
      .json({ success: false, alt: '', message: 'No image data' })
  const imageBase64 = req.body

  try {
    const startResponse = await fetch(
      'https://api.replicate.com/v1/predictions',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Pinned to a specific version of Stable Diffusion
          // See https://replicate.com/stability-ai/stable-diffussion/versions
          version:
            '9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8',

          input: {
            model: 'conceptual-captions',
            use_beam_search: false,
            image: imageBase64,
          },
        }),
      }
    )

    let jsonStartResponse =
      (await startResponse.json()) as PartialReplicateResponse
    let endpointUrl = jsonStartResponse.urls.get

    // GET request to get the status of alt text generation process & return the result when it's ready
    let altText: string | null = null
    while (!altText) {
      // Poll in 1s intervals until the alt text is ready

      let finalResponse = await fetch(endpointUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
        },
      })
      let jsonFinalResponse = await finalResponse.json()

      if (jsonFinalResponse.status === 'succeeded') {
        altText = jsonFinalResponse.output as string

        res.status(200).json({
          success: true,
          alt: altText,
          message: 'Alt text generated successfully',
        })

        break
      } else if (jsonFinalResponse.status === 'failed') {
        res.status(503).json({
          success: false,
          alt: '',
          message: 'Image could not be processed',
        })
        break
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, alt: '', message: 'Internal server error' })
  }
}

export default withMethods(['POST'], handler)
