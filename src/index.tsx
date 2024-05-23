import React from 'react';
import App from './app/app';

class EntryPoint extends React.Component {
  constructor(props: any) {
    super(props);
  }
  componentDidMount(): void {
    // something code here
  }

  componentWillUnmount(): void {
    // something code here
  }

  render(): React.ReactNode {
    return <App />;
  }
}
export default EntryPoint;
