import 'dotenv/config'
import fsp from 'node:fs/promises'
import { ofetch } from 'ofetch'
import { consola } from 'consola'
import type { Comment, Response } from './types'

const textParser = /@(?<association>[\w.]+).*@(?<company>[\w.]+)/

const baseURL = process.env.BASE_URL
const mediaID = process.env.MEDIA_ID
const accessToken = process.env.ACCESS_TOKEN

async function main() {
  consola.info('Fetching comments...')

  const data: Comment[] = []

  let afterToken: string | null = null

  do {
    // Fetch the Facebook API
    const response: Response = await ofetch<Response>(`/${mediaID}/comments?fields=id,timestamp,username,text&access_token=${accessToken}&limit=50${afterToken ? `&after=${afterToken}` : ''}`, { baseURL })

    // Parse the response
    for (const comment of response.data) {
      const match = comment.text.replaceAll('\n', '').trim().match(textParser)
      if (match) {
        data.push({
          username: comment.username,
          association: match.groups?.association ?? '',
          company: match.groups?.company ?? '',
        })
      }
      else {
        consola.warn(`Could not parse comment: ${comment.text}`)
      }
    }

    // Get the next page
    afterToken = response.paging?.cursors?.after ?? null
  } while (afterToken)

  // Write the data to a file
  await fsp.writeFile('.data/comments.json', JSON.stringify({ data }, null, 2))

  // Log the number of comments
  consola.info(`Fetched ${data.length} comments`)
}

main().then(() => consola.success('Done')).catch(consola.error)
