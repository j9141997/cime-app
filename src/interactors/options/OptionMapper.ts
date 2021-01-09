export type Option = {
  id: string
  title: string
  options?: {
    name: string
    merits?: string[]
    demerits?: string[]
  }[]
  createdAt: number
  updatedAt: number
}

class OptionMapper {
  static bodyToOption = (result): Option => ({
    id: result.uuid,
    title: result.title,
    options: result.options || [],
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  })
}

export default OptionMapper
