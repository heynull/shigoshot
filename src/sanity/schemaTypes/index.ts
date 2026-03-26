import { type SchemaTypeDefinition } from 'sanity'
import { photo } from './photo'
import { series } from './series'
import { testimonial } from './testimonial'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, series, testimonial, siteSettings],
}
