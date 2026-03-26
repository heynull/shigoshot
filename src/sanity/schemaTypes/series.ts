import {defineField, defineType} from 'sanity'

export const series = defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Series Number',
      type: 'number',
      description: 'Display order (01, 02, 03, etc)',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'photoCount',
      title: 'Photo Count',
      type: 'number',
      description: 'Number of photos in this series',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      number: 'number',
    },
    prepare({title, media, number}) {
      return {
        title,
        media,
        subtitle: number ? `Series ${number}` : 'Series',
      }
    },
  },
})
