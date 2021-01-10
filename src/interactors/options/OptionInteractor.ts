import OptionMapper, { Option } from './OptionMapper'
import { handleErrors } from 'src/utils/handleErrors'

type BodyProps = {
  data: {
    option?: Option
    options?: Option[]
  }
}

class OptionInteractor {
  readonly baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_ENDOPOINT
  }

  findAll = async (): Promise<Option[] | null> => {
    try {
      const res = await fetch(`${this.baseURL}/options`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const body: BodyProps = await res.json()
      return (body.data.options || []).map((option: Option) =>
        OptionMapper.bodyToOption(option)
      )
    } catch (e) {
      handleErrors(e)
      return null
    }
  }

  findOne = async (id: string): Promise<Option | null> => {
    const res = await fetch(`${this.baseURL}/options/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    try {
      const body: BodyProps = await res.json()
      return OptionMapper.bodyToOption(body.data.option)
    } catch (e) {
      console.log(e)
      return null
    }
  }

  post = async (params: Option): Promise<any | Error> => {
    await fetch(`${this.baseURL}/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .catch((e) => {
        throw Error(e)
      })
      .then(handleErrors)
      .then((res) => res)
  }

  update = async ({ id, ...params }: Option): Promise<any | Error> => {
    await fetch(`${this.baseURL}/options/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .catch((e) => {
        throw Error(e)
      })
      .then(handleErrors)
      .then((res) => res)
  }

  remove = async (id: string): Promise<any | Error> => {
    await fetch(`${this.baseURL}/options/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((e) => {
        throw Error(e)
      })
      .then(handleErrors)
      .then((res) => res)
  }
}

export default OptionInteractor
