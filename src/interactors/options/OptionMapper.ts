export type Option = {
  id: string
  title: string
}

class OptionMapper {
  static bodyToOption = (result): Option => ({
    id: result.uuid,
    title: result.title,
  })
}

export default OptionMapper
