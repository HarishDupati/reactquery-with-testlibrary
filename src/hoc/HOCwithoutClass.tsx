function withContainer(IncomingComponent) {
  return function (props) {
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
