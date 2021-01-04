export type Option = {
  id: string
  title: string
  options?: {
    merits?: string[]
    demerits?: string[]
  }[]
}

class OptionMapper {
  static bodyToOption = (result): Option => ({
    id: result.uuid,
    title: result.title,
  })
}

export default OptionMapper
