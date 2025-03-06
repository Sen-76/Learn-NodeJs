import useCountStore from '@/store/countStore';
import { useShallow } from 'zustand/react/shallow';

const Zustand = () => {
  const { count, increment, decrement } = useCountStore();
  const { nuts, honey } = useCountStore(useShallow((state) => ({ nuts: state.nuts, honey: state.honey })));

  return (
    <>
      <h1>{count} around here ...</h1>
      <button onClick={() => increment(1)}>one up</button>
      <button onClick={() => decrement(1)}>one down</button>
      <p>Nuts: {nuts}</p>
      <p>Honey: {honey}</p>
    </>
  );
};

export default Zustand;
