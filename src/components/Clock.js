import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';

function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <ClockWrapper className="clock">
      {format(time, 'hh:mm a')}
    </ClockWrapper>
  );
}

export default Clock;

const ClockWrapper = styled.p`
  font-size: 3rem;
`;