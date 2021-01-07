export type Option = {
  id: string
  title: string
  options?: {
    name: string
    merits?: string[]
    demerits?: string[]
  }[]
}

class OptionMapper {
  static bodyToOption = (result): Option => ({
    id: result.uuid,
    title: result.title,
    options: result.options || [],
  })
}

export default OptionMapper
