import OptionMapper, { Option } from './OptionMapper'

type BodyProps = {
  options?: Option[]
}

class OptionInteractor {
  readonly baseURL: string

  constructor() {
    this.baseURL = process.env.API_BASE_ENDPOINT
  }

  findAll = async (): Promise<Option[] | null> => {
    const res = await fetch(`${this.baseURL}/options`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    try {
      const body: BodyProps = await res.json()
      return (body.options || []).map((option: Option) =>
        OptionMapper.bodyToOption(option)
      )
    } catch (e) {
      console.log(e)
      return null
    }
  }

  post = async (params: any): Promise<any | null> => {
    const res = await fetch(`${this.baseURL}/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    try {
      console.log(res)
      return res
    } catch (e) {
      console.error(e)
      return e
    }
  }
}

export default OptionInteractor
