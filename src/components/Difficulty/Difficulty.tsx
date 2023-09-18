import { useEffect, useRef, useState } from 'react';
import './Sorting.scss';

export const Sorting: React.FC = () => {
  const [droped, setDroped] = useState(false);

  const sortingRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: EventListener = (event) => {
    const targetNode = event.target as Node;

    if (sortingRef.current && !sortingRef.current.contains(targetNode)) {
      setDroped(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    if (droped) {
      setDroped(false);

      return;
    }

    setDroped(true);
  };

  const handleOptionClick = (option: string) => {
    // setCurrentPage(1);
    setDroped(false);
  };

  return (
    <div
      className='sorting'
      ref={sortingRef}
    >
    </div>
  );
};
