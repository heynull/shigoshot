import {defineField, defineType} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Photo',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Portrait', value: 'portrait'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Landscape', value: 'landscape'},
          {title: 'Urban', value: 'urban'},
          {title: 'Fine Art', value: 'fineArt'},
          {title: 'Documentary', value: 'documentary'},
          {title: 'Fashion', value: 'fashion'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{type: 'series'}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this photo in the main grid',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Manual sorting order',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare({title, media, category}) {
      return {
        title,
        media,
        subtitle: category,
      }
    },
  },
})
