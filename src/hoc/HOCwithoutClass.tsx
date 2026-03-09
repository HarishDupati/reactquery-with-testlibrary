import { type ReactElement } from 'react';

interface WithContainerProps {
  [key: string]: unknown;
}

interface ComponentType {
  (props: WithContainerProps): ReactElement;
}

function withContainer(IncomingComponent: ComponentType) {
  return function (props: WithContainerProps): ReactElement {
    return (
      <div className="parent-wrapper">
        <IncomingComponent {...props} />
      </div>
    );
  };
}

const ComponentWithHeader = withContainer(SayHello);

function SayHello() {
  return <>Saying Hello!</>;
}

export default ComponentWithHeader;
