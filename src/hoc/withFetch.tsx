import { Component } from 'react'
import type { ReactNode, ComponentType } from 'react'

interface FetchState {
  data: unknown;
  error: boolean;
  isLoading: boolean;
}

interface WithDataProps {
  data: unknown;
}

function withFetch<P extends object>(InnerComponent: ComponentType<P & WithDataProps>) {
  return class WithFetchComponent extends Component<P, FetchState> {

    constructor(props: P) {
      super(props)
      this.state = {
        data: null,
        error: false,
        isLoading: true
      }
    }

    componentDidMount(): void {
      fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then((result) => {
        this.setState((prevState) => ({...prevState, data: result, isLoading: false}))
      })
      .catch((error) => {
        this.setState((prevState) => ({...prevState, data: null, error, isLoading: false}))
      })
    }

    render(): ReactNode {
      const {data, isLoading, error} = this.state;

      if(isLoading) return <>loading..</>
      if(error) return <>error occurred while fetching</>
      return <InnerComponent {...this.props} data={data} />
    }

  }
}

function Userss({data}: WithDataProps) {
  console.log('data: inside user component', data);
  

  return <>Userssdf</>
}

const Users = withFetch(Userss);
export default Users;