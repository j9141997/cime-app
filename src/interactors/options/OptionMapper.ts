export type Option = {
  id: string
  title: string
  category?: string
  options?: {
    name: string
    merits?: string[]
    demerits?: string[]
  }[]
  createdAt: number
  updatedAt: number
}

class OptionMapper {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static bodyToOption = (result): Option => ({
    id: result.uuid,
    title: result.title,
    category: result.category || '',
    options: result.options || [],
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  })

  static get CATEGORY_OPTIONS(): { name: string; value: string }[] {
    return [
      {
        name: 'ビジネス',
        value: 'bi',
      },
      {
        name: 'その他',
        value: 'others',
      },
    ]
  }
}

export default OptionMapper
