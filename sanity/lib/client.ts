import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, token } from '../env'

 const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
  perspective: 'published',
})
export default client